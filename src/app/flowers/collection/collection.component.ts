import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Page } from 'ngx-pagination/dist/pagination-controls.directive';
import { Subscription } from 'rxjs';
import { CollectionService } from 'src/app/_services/collection.service';
import { FlowersService } from 'src/app/_services/flowers.service';
import { Flower } from '../flower.model';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
  itemsPerPage: number;
  currentPage: number;
  p: number = 1;
  totalItems: number;
  flowers: Flower[] = [];

  param: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private collectionService: CollectionService,
    private FlowersService: FlowersService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((paramMap) => {
      if (
        !paramMap.has('type') &&
        !paramMap.has('occassion') &&
        !paramMap.has('id')
      ) {
        this.itemsPerPage = +paramMap.get('pagesize');
        this.currentPage = +paramMap.get('currentPage');
        console.log(this.itemsPerPage);
        this.collectionService
          .getFlowers(this.itemsPerPage, this.currentPage)
          .subscribe((result) => {
            this.flowers = result.flowers;
            console.log(this.flowers);
            console.log(result.message);
            console.log(result.count);
            this.totalItems = result.count;
          });
      } else if (paramMap.has('type')) {
        this.param = paramMap.get('type');
        this.itemsPerPage = +paramMap.get('pagesize');
        this.currentPage = +paramMap.get('currentPage');
        this.collectionService
          .getByType(this.param, this.itemsPerPage, this.currentPage)
          .subscribe((result) => {
            this.flowers = result.flowers;
            console.log(this.flowers);
            this.totalItems = result.count;
            console.log(this.totalItems);
          });
      } else {
        this.itemsPerPage = +paramMap.get('pagesize');
        this.currentPage = +paramMap.get('currentPage');
        this.param = paramMap.get('occassion');
        this.collectionService
          .getByOccassion(this.param, this.itemsPerPage, this.currentPage)
          .subscribe((result) => {
            this.flowers = result.flowers;
            console.log(this.flowers);
            this.totalItems = result.count;
            console.log(this.totalItems);
          });
      }
    });
  }
  onPageChange(currentpage: number) {
    this.p = currentpage;

    this.activatedRoute.queryParamMap.subscribe((paramMap) => {
      if (paramMap.has('type')) {
        this.collectionService
          .getByType(paramMap.get('type'), this.itemsPerPage, this.p)
          .subscribe((result) => {
            this.flowers = result.flowers;
            console.log(this.flowers);
          });
      } else if (paramMap.has('occassion')) {
        this.collectionService
          .getByOccassion(paramMap.get('occassion'), this.itemsPerPage, this.p)
          .subscribe((result) => {
            this.flowers = result.flowers;
            console.log(this.flowers);
          });
      } else {
        this.collectionService
          .getFlowers(this.itemsPerPage, this.p)
          .subscribe((result) => {
            this.flowers = result.flowers;
            console.log(result.message);
            console.log(result.count);
            console.log(this.flowers);
          });
      }
    });

    // this.itemsPerPage = 6;
    console.log(this.p, this.itemsPerPage);
  }
}
