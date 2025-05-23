import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantInfoComponent } from './restaurant-info.component';

describe('RestaurantInfoComponent', () => {
    let component: RestaurantInfoComponent
    let fixture: ComponentFixture<RestaurantInfoComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RestaurantInfoComponent]
        })
        .compileComponents()

        fixture = TestBed.createComponent(RestaurantInfoComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('Deve criar o componente', () => {
        expect(component).toBeTruthy()
    })
})
