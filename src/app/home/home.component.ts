import { Component, OnInit } from '@angular/core';
import { Flower } from '../flowers/flower.model';
import { CollectionService } from '../_services/collection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  maxPrice: number = 1500;
  price: number;
  flowers: Flower[];
  constructor(private collectionService: CollectionService) {}

  ngOnInit(): void {
    // this.collectionService.getFlowers().subscribe((result) => {
    //   this.flowers = result.flowers;
    //   console.log(result.flowers);
    //   console.log(this.flowers);
    // });
  }
}
