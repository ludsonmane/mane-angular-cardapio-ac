import { TestBed } from '@angular/core/testing';
import { SearchDataService } from './search-data.service';

describe('SearchDataService', () => {
    let service: SearchDataService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(SearchDataService)
    })

    it('Deve criar o serviço', () => {
        expect(service).toBeTruthy()
    })
})
