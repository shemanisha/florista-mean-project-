import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flower } from '../flowers/flower.model';
import { CartserviceService } from '../_services/cartservice.service';
import { MessengerService } from '../_services/messenger.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  CartItems = [];
  constructor(
    private messengerService: MessengerService,
    private cartService: CartserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.handleSubscription();
    this.LoadCartItems();
  }
  handleSubscription() {
    this.messengerService.getMsg().subscribe((Flower: Flower) => {
      this.LoadCartItems();
      console.log(Flower);
    });
  }

  LoadCartItems() {
    this.cartService.getCartItems().subscribe((item) => {
      console.log(item);
    });
  }
}
