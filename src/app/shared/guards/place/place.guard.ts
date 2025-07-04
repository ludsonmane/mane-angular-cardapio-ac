import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const placeGuard: CanActivateFn = (route, state) => {
    const router = inject(Router)
    const placeId = localStorage.getItem('place_id');

    if (placeId && placeId != null) return true
    else return router.parseUrl('unidade')
}
