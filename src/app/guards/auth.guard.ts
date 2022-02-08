import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
* Class is responsible to handle the logic is a user is not set to storage. Or just happened to log out.
*/
export class AuthGuard implements CanActivate {

  /**
   * Constructor with dependency injected components.
   * Router is a dependency to redirect user back to login-page if client is no longer set to storage.
   * @return {void} returns void
   */
  constructor(private router: Router) { }

  /**
 * Function will check if user is no longer set in storage. If not the canActivate function will redirect the user.
 * The components who are guarded are specified in the app-routing.module.ts file.
 * @return {Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree} returns different objects depending on action.
 */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let current_user = localStorage.getItem('current-user')
    if (current_user !== null) {
      return true;
    }
    else {
      this.router.navigateByUrl('/login')
      return false;
    }
  }

}
