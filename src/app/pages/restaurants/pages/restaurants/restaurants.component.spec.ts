import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantsComponent } from './restaurants.component';

describe('RestaurantsComponent', () => {
    let component: RestaurantsComponent
    let fixture: ComponentFixture<RestaurantsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RestaurantsComponent]
        })
        .compileComponents()

        fixture = TestBed.createComponent(RestaurantsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('Deve criar o componente', () => {
        expect(component).toBeTruthy()
    })
})
