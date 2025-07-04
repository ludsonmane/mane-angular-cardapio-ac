import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { placeGuard } from './place.guard';

describe('placeGuard', () => {
    const executeGuard: CanActivateFn = (...guardParameters) =>
        TestBed.runInInjectionContext(() => placeGuard(...guardParameters))

    beforeEach(() => {
        TestBed.configureTestingModule({})
    })

    it('Deve criar o componente', () => {
        expect(executeGuard).toBeTruthy()
    })
})
