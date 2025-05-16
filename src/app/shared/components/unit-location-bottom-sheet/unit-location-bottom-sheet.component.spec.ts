import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnitLocationBottomSheetComponent } from './unit-location-bottom-sheet.component';

describe('UnitLocationBottomSheetComponent', () => {
    let component: UnitLocationBottomSheetComponent
    let fixture: ComponentFixture<UnitLocationBottomSheetComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UnitLocationBottomSheetComponent]
        })
        .compileComponents()

        fixture = TestBed.createComponent(UnitLocationBottomSheetComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('Deve criar o componente', () => {
        expect(component).toBeTruthy()
    })
})
