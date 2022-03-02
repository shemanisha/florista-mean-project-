import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string;
  private isAuthenticated = false;
  private tokentimer!: any;
  private authStatusListener = new Subject<boolean>();
  constructor(private httpClient: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }
  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  createUser(
    firstname: string,
    lastname: string,
    email1: string,
    password1: string
  ) {
    let user = {
      name: firstname + '' + lastname,
      email: email1,
      password: password1,
    };
    console.log(user);
    return this.httpClient.post<{ message: string }>(
      'http://localhost:3000/api/users/signup',
      user
    );
  }

  loginUser(email: string, password: string) {
    let loggedinUser = { email: email, password: password };
    this.httpClient
      .post<{
        token: string;
        expiresIn: number;
        userid: string;
        cartid: string;
      }>('http://localhost:3000/api/users/login', loggedinUser)
      .subscribe((result) => {
        this.token = result.token;
        console.log(result);
        console.log(this.token);
        console.log(result.userid);
        if (this.token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const expiresInDuration = result.expiresIn;
          console.log(expiresInDuration);
          this.setAuthTimer(expiresInDuration * 1000);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(
            this.token,
            expirationDate,
            result.cartid,
            result.userid
          );
          this.router.navigate(['/']);
        }
      });
  }
  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokentimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }
  private saveAuthData(
    token: string,
    expirationDate: Date,
    cartid: string,
    userid: string
  ) {
    localStorage.setItem('cartid', cartid);
    localStorage.setItem('userid', userid);
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('cartid');
    localStorage.removeItem('userid');
  }

  private setAuthTimer(duration: number) {
    this.tokentimer = setTimeout(() => {
      this.logout();
    }, duration);
  }
  autoAuthUser() {
    const authInformation = this.getAuthData();

    if (authInformation) {
      const now = new Date();
      const expiresIn = authInformation.expiration.getTime() - now.getTime();
      if (expiresIn > 0) {
        this.token = authInformation.token;
        this.isAuthenticated = true;
        this.setAuthTimer(expiresIn / 1000);
        this.authStatusListener.next(true);
      }
    } else {
      return;
    }
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return null;
    }
    return {
      token: token,
      expiration: new Date(expirationDate),
    };
  }
}
