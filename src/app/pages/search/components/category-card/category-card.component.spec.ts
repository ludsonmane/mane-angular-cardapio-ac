import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryCardComponent } from './category-card.component';

describe('CategoryCardComponent', () => {
    let component: CategoryCardComponent
    let fixture: ComponentFixture<CategoryCardComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CategoryCardComponent]
        })
        .compileComponents()

        fixture = TestBed.createComponent(CategoryCardComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('Deve criar o componente', () => {
        expect(component).toBeTruthy()
    })
})
