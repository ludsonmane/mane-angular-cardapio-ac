import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutRestaurantBottomSheetComponent } from './about-restaurant-bottom-sheet.component';

describe('AboutRestaurantBottomSheetComponent', () => {
    let component: AboutRestaurantBottomSheetComponent
    let fixture: ComponentFixture<AboutRestaurantBottomSheetComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AboutRestaurantBottomSheetComponent]
        })
        .compileComponents()

        fixture = TestBed.createComponent(AboutRestaurantBottomSheetComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('Deve criar o componente', () => {
        expect(component).toBeTruthy()
    })
})
