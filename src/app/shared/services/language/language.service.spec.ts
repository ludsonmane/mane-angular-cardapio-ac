import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
    let service: LanguageService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(LanguageService)
    })

    it('Deve criar o serviço', () => {
        expect(service).toBeTruthy()
    })
})
