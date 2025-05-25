import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageBottomSheetComponent } from './language-bottom-sheet.component';

describe('LanguageBottomSheetComponent', () => {
    let component: LanguageBottomSheetComponent
    let fixture: ComponentFixture<LanguageBottomSheetComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LanguageBottomSheetComponent]
        })
        .compileComponents()

        fixture = TestBed.createComponent(LanguageBottomSheetComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('Deve criar o componente', () => {
        expect(component).toBeTruthy()
    })
})
