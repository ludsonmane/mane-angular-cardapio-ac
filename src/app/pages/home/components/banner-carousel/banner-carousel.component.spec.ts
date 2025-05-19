import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerCarouselComponent } from './banner-carousel.component';

describe('BannerCarouselComponent', () => {
    let component: BannerCarouselComponent
    let fixture: ComponentFixture<BannerCarouselComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BannerCarouselComponent]
        })
        .compileComponents()

        fixture = TestBed.createComponent(BannerCarouselComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('Deve criar o componente', () => {
        expect(component).toBeTruthy()
    })
})
