import { TestBed } from '@angular/core/testing';
import { IconService } from './icon.service';

describe('IconService', () => {
    let service: IconService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(IconService)
    })

    it('Deveria ser criado', () => {
        expect(service).toBeTruthy()
    })
})
