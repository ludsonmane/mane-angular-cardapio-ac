import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuItemSectionComponent } from './menu-item-section.component';

describe('MenuItemSectionComponent', () => {
    let component: MenuItemSectionComponent
    let fixture: ComponentFixture<MenuItemSectionComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MenuItemSectionComponent]
        })
        .compileComponents()

        fixture = TestBed.createComponent(MenuItemSectionComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('Deve criar o componente', () => {
        expect(component).toBeTruthy()
    })
})
