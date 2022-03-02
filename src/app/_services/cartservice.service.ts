import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flower } from '../flowers/flower.model';
import { CartItem } from '../cart/cartItem.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CartserviceService {
  constructor(public httpCilent: HttpClient) {}

  AddToCart(Flower: Flower, userid, cartid) {
    let cartItems = [
      {
        id: 1,
        flowername: 12,
      },
    ];
    let cartDetails = { Flower, userid, cartid, cartItems };
    console.log(cartDetails);
    return this.httpCilent.post<{ message: string }>(
      'http://localhost:3000/api/cart/addToCart',
      cartDetails
    );
  }
  getCartItems() {
    return this.httpCilent
      .get<CartItem[]>('http://localhost:3000/api/cart/getCartItems')
      .pipe(
        map((result: any[]) => {
          // console.log(result);
          let cartItems: CartItem[] = [];
          console.log(result);
          for (let i in result) {
            // let productExists = false;
            console.log(i);
            console.log(result[i]);
            // for(let i in cartItems){
            //   if(cartItems[i].productid===item)
            // }
          }
        })
      );
  }
  deleteCartItems(cartid: number) {
    return this.httpCilent.delete<{ message: string }>(
      'http://localhost:3000/api/getCartItems' + cartid
    );
  }
  updateQuantity(quantity: number) {
    return this.httpCilent.put<{ message: string }>(
      'http://localhost:3000/api/updateCart',
      quantity
    );
  }
}
