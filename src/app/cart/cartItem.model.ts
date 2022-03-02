import { Flower } from '../flowers/flower.model';

export class CartItem {
  cartid: number;
  productid: number;
  producttitle: string;
  qty: number;
  price: number;
  productimage: string;

  constructor(cartId: number, flower: Flower, qty = 0) {
    this.cartid = cartId;
    this.productid = flower.flowerid;
    this.productimage = flower.image;
    this.qty = qty;
    this.producttitle = flower.name;
  }
}
