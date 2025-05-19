import { TestBed } from '@angular/core/testing';
import { HomeDataService } from './home-data.service';

describe('HomeDataService', () => {
    let service: HomeDataService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(HomeDataService)
    })

    it('Deve criar o serviço', () => {
        expect(service).toBeTruthy()
    })
})
