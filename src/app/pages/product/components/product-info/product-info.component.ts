import { Component, Input, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
    selector: 'app-product-info',
    standalone: false,
    templateUrl: './product-info.component.html',
    styleUrl: './product-info.component.css'
})
export class ProductInfoComponent implements OnInit {
    @Input() title!: string
    @Input() description!: string
    @Input() price!: number
    @Input() tags: any

     constructor(
        @Inject(DOCUMENT) private document: Document,
    ) {}

    ngOnInit(): void {
        //this.document.documentElement.style.setProperty('--button-bg', theme.buttonBg)
    }
}
