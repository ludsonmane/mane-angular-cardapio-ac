import { TestBed } from '@angular/core/testing';
import { RestaurantService } from './restaurant.service';

describe('RestaurantService', () => {
    let service: RestaurantService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(RestaurantService)
    })

    it('Deve criar o serviço', () => {
        expect(service).toBeTruthy()
    })
})
