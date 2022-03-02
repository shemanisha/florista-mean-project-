import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSubscription!: Subscription;
  public userIsAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.authListenerSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((userIsAuthenticated) => {
        this.userIsAuthenticated = userIsAuthenticated;
      });
  }
  onLogOut() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.authListenerSubscription.unsubscribe();
  }
}
