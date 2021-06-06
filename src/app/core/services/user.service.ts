import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { map, distinctUntilChanged, windowTime } from 'rxjs/operators';
import { User } from '../models/user.model';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/users')
        .subscribe(
          data => this.setAuth(data.user),
          err => this.purgeAuth()
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);

    // Set current user data into observable
    this.currentUserSubject.next(user);

    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();

    // Set current user to an empty object
    this.currentUserSubject.next({} as User);

    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type: string | String, body: User) {
    const route = (type === 'login') ? '/authenticate' : '';

    return this.apiService.post('/users' + route, body).pipe(map(res => {
      this.setAuth(res);
      return res;
    }));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user: User): Observable<any> {
    return this.apiService
      .put('/users/' + this.getCurrentUser().id, user).pipe(map(data => {this.currentUserSubject.next(data.user);
      }));
  }
}
