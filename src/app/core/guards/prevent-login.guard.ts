import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class PreventLoggedInAccess {
  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> | boolean {
    return !this.authService.isLoggedIn();
  }
}
