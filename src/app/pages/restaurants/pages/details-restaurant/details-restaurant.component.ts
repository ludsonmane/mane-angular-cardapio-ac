import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../../../shared/services/restaurant/restaurant.service';
import { DOCUMENT } from '@angular/common';
import { ProductService } from '../../../../shared/services/product/product.service';
import { BarCategoryService } from '../../../../shared/services/bar-category/bar-category.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; // 👈 novo
import { marked } from 'marked'; // 👈 novo

@Component({
  selector: 'app-details-restaurant',
  standalone: false,
  templateUrl: './details-restaurant.component.html',
  styleUrl: './details-restaurant.component.css',
})
export class DetailsRestaurantComponent implements OnInit, OnDestroy {
  restaurant!: any;
  /** ID interno do bar no Strapi (data[0].id) */
  barStrapiId: string = '';

  search: string = '';
  selectedCategory: string = '';

  listChefTips: any[] = [];
  /** categorias que aparecem na tela (já na ordem final) */
  listCategories: string[] = [];
  /** categorias base calculadas a partir dos produtos */
  baseCategories: string[] = [];

  listProducts: any[] = [];
  filteredProducts: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService,
    @Inject(DOCUMENT) private document: Document,
    private productService: ProductService,
    private barCategoryService: BarCategoryService,
    private sanitizer: DomSanitizer,              // 👈 novo
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const externalId = params['id']; // id que já vinha na rota
      if (externalId) {
        // 1) carrega bar (tema + id interno)
        this.loadDetailsRestaurand(externalId);
        // 2) dicas do chef
        this.loadChefTips();
        // produtos só serão carregados quando o restaurante chegar
      }
    });
  }

  ngOnDestroy(): void {
    this.clearInlineTheme();
  }

  /**
   * Converte descrição (Markdown vindo do Strapi) em HTML seguro
   * para ser usado com [innerHTML] no template.
   */
  formatDescription(description: string | null | undefined): SafeHtml {
    if (!description) return '';

    // marked.parse pode ser tipado como string | Promise<string>,
    // então forçamos para string (ele é síncrono no nosso uso)
    const html = marked.parse(description) as string;
    // se ainda reclamar, pode usar: const html = (marked as any).parse(description) as string;

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }


  /**
   * Carrega restaurante usando o id da rota (zig/external)
   * e guarda o id interno do Strapi (barStrapiId).
   * Quando terminar, carrega os produtos.
   */
  loadDetailsRestaurand(externalId: string): void {
    this.restaurantService.getRestaurantById(externalId).subscribe((response) => {
      if (response && response.data && response.data[0]) {
        this.restaurant = response.data[0];

        // ID interno do bar no Strapi
        this.barStrapiId = String(this.restaurant.id);

        const theme = this.restaurant.theme;
        this.document.documentElement.style.setProperty(
          '--header-bg',
          theme.headerBg
        );
        this.document.documentElement.style.setProperty(
          '--color-text',
          theme.colorText
        );
        this.document.documentElement.style.setProperty(
          '--button-bg',
          theme.buttonBg
        );

        // agora que sabemos o barStrapiId, buscamos os produtos
        this.loadAllProducts(externalId);
      }
    });
  }

  cancelSearch(): void {
    this.search = '';
    this.filterProducts();
  }

  loadChefTips(): void {
    this.productService
      .getChefTips()
      .subscribe((response) => (this.listChefTips = response));
  }

  /**
   * Ordena produtos:
   *  - primeiro quem tem `order` definido (asc)
   *  - depois quem tem `order = null`
   *  - empate resolve por createdAt (mais antigo primeiro)
   */
  private sortProductsByOrder(): void {
    if (!this.listProducts || this.listProducts.length === 0) return;

    this.listProducts.sort((a: any, b: any) => {
      const ao = a?.order;
      const bo = b?.order;

      const hasAO = ao !== null && ao !== undefined;
      const hasBO = bo !== null && bo !== undefined;

      // quem tem order definido vem ANTES de quem é null
      if (hasAO && !hasBO) return -1;
      if (!hasAO && hasBO) return 1;

      // se os dois têm order, ordena pelo número
      if (hasAO && hasBO) {
        if (ao < bo) return -1;
        if (ao > bo) return 1;
      }

      // fallback: se os dois são null ou têm o mesmo order,
      // ordena por createdAt (mais antigo primeiro)
      const aDate = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bDate = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
      return aDate - bDate;
    });
  }

  /**
   * Calcula categorias únicas a partir dos produtos e guarda em baseCategories.
   * NÃO mexe em listCategories nem em selectedCategory (pra evitar flicker).
   */
  private buildCategoriesFromProducts(): void {
    const collected: string[] = [];

    const categoriesArrays: any[][] = this.listProducts.map(
      (p: any) => (p?.categories ?? []) as any[]
    );

    for (const catArr of categoriesArrays) {
      for (const cat of catArr) {
        const name: string | undefined = cat?.name;
        if (name) {
          collected.push(name);
        }
      }
    }

    // categorias únicas mantendo ordem de aparição
    this.baseCategories = Array.from(new Set(collected));
  }

  /**
   * Define categoria inicial com base em listCategories (já na ordem final)
   * e aplica o filtro.
   */
  private finalizeCategories(): void {
    if (this.listCategories.length > 0) {
      this.selectedCategory = this.listCategories[0];
    } else {
      this.selectedCategory = '';
    }
    this.filterProducts();
  }

  /**
   * Carrega TODOS os produtos (1ª e 2ª página se existir)
   * e, depois, prepara categorias + ordem.
   */
  loadAllProducts(externalBarId: string): void {
    this.productService
      .getProductByRestaurant(externalBarId)
      .subscribe((response: any) => {
        const page1 = response.data || [];
        const pageCount = response?.meta?.pagination?.pageCount || 1;

        const finish = () => {
          // 1) ordena produtos (order definido em cima, null embaixo)
          this.sortProductsByOrder();

          // 2) calcula categorias baseadas nos produtos
          this.buildCategoriesFromProducts();

          // 3) aplica ordem de categorias do admin (se existir), senão mantém padrão
          this.prepareCategoriesOrder();
        };

        if (pageCount > 1) {
          this.productService
            .getProductByRestaurant(externalBarId, 2)
            .subscribe((response2: any) => {
              const page2 = response2.data || [];
              this.listProducts = [...page1, ...page2];
              finish();
            });
        } else {
          this.listProducts = page1;
          finish();
        }
      });
  }

  /**
   * Usa Bar Category pra ordenar as categorias; se não houver configuração,
   * usa baseCategories como estão.
   */
  private prepareCategoriesOrder(): void {
    // se por algum motivo ainda não temos o id interno, faz fallback pro padrão
    if (!this.barStrapiId) {
      this.listCategories = [...this.baseCategories];
      this.finalizeCategories();
      return;
    }

    this.barCategoryService.getByBarId(this.barStrapiId).subscribe(
      (response: any) => {
        const items: any[] = response?.data || [];

        if (items.length) {
          const orderedNamesFromApi: string[] = items
            .map(
              (bc: any) =>
                (bc?.category?.name as string | undefined)
            )
            .filter(
              (name: string | undefined): name is string => !!name
            );

          const uniqueOrderedNames: string[] = Array.from(
            new Set(orderedNamesFromApi)
          );

          const current: string[] = [...this.baseCategories];

          // categorias que existem e têm ordem configurada
          const orderedExisting: string[] = uniqueOrderedNames.filter(
            (name: string) => current.includes(name)
          );

          // categorias que existem nos produtos mas não têm order configurado
          const leftovers: string[] = current.filter(
            (name: string) => !uniqueOrderedNames.includes(name)
          );

          this.listCategories = [...orderedExisting, ...leftovers];
        } else {
          // sem config no admin: usa baseCategories direto
          this.listCategories = [...this.baseCategories];
        }

        this.finalizeCategories();
      },
      // em caso de erro na API de bar-categories, segue com ordem padrão
      () => {
        this.listCategories = [...this.baseCategories];
        this.finalizeCategories();
      }
    );
  }

  /** Clique nos chips: se clicar na ativa, vira "Tudo"; senão, seleciona a clicada */
  setCategory(category: string): void {
    this.selectedCategory =
      this.selectedCategory === category ? 'Tudo' : category;
    this.filterProducts();
  }

  /** Filtra por categoria e busca (respeitando a ordem de listProducts) */
  filterProducts(): void {
    this.filteredProducts = this.listProducts.filter((product: any) => {
      const productCategories: string[] = (product?.categories ?? [])
        .map((c: any) => c?.name as string | undefined)
        .filter(
          (name: string | undefined): name is string => !!name
        );

      const matchesCategory =
        this.selectedCategory === 'Tudo' || !this.selectedCategory
          ? true
          : productCategories.includes(this.selectedCategory);

      const matchesSearch = this.search
        ? ((product?.name || '') as string)
          .toLowerCase()
          .includes(this.search.toLowerCase())
        : true;

      return matchesCategory && matchesSearch;
    });

    // não mexe na ordem aqui: segue a ordem já calculada em listProducts
  }

  clearInlineTheme(): void {
    this.document.documentElement.style.removeProperty('--header-bg');
    this.document.documentElement.style.removeProperty('--color-text');
    this.document.documentElement.style.removeProperty('--button-bg');
  }
}
