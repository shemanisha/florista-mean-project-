import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { CartserviceService } from 'src/app/_services/cartservice.service';
import { CollectionService } from 'src/app/_services/collection.service';
import { FlowersService } from 'src/app/_services/flowers.service';
import { Flower } from '../flower.model';
import { MessengerService } from 'src/app/_services/messenger.service';

@Component({
  selector: 'app-pdpage',
  templateUrl: './pdpage.component.html',
  styleUrls: ['./pdpage.component.css'],
})
export class PDPageComponent implements OnInit {
  flower: Flower;
  userIsAuthenticated = false;
  constructor(
    private flowerService: FlowersService,
    private route: ActivatedRoute,
    private router: Router,
    private collectionService: CollectionService,
    private authService: AuthService,
    private cartService: CartserviceService,
    private msgService: MessengerService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((param) => {
      console.log(param.get('id'));
      if (param.get('id')) {
        this.collectionService
          .getById(parseInt(param.get('id')))
          .subscribe((result) => {
            console.log(result);
            this.flower = result.flowers;
            console.log(this.flower);
          });
      }
    });
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.authService
      .getAuthStatusListener()
      .subscribe((userIsAuthenticated) => {
        this.userIsAuthenticated = userIsAuthenticated;
      });
  }

  deleteFlower(flowerid: number) {
    this.flowerService.deleteFlower(flowerid);
  }

  updateFlower(flowerid: number) {
    console.log(flowerid);
    this.router.navigate(['/createFlower'], { queryParams: { id: flowerid } });
  }

  addToCart() {
    this.router.navigate(['/login']);
    console.log(this.flower);
    const userid = localStorage.getItem('userid');
    const cartid = localStorage.getItem('cartid');
    console.log(userid);
    console.log(cartid);
    this.cartService
      .AddToCart(this.flower, userid, cartid)
      .subscribe((message) => {
        this.msgService.sendMsg(this.flower);
      });
    // this.cartService.getCartItems();
  }
}
