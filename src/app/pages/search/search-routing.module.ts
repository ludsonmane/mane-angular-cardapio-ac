import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchHomeComponent } from './pages/search-home/search-home.component';
import { CategoryProductsComponent } from './pages/category-products/category-products.component';

const routes: Routes = [
    { path: '', component: SearchHomeComponent },
    { path: 'categoria/:id', component: CategoryProductsComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SearchRoutingModule { }
