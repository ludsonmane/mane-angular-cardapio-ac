import { TestBed } from '@angular/core/testing';
import { UnitLocationService } from './unit-location.service';

describe('UnitLocationService', () => {
    let service: UnitLocationService;

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(UnitLocationService)
    })

    it('Deve criar o serviço', () => {
        expect(service).toBeTruthy()
    })
})
