import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Flower } from '../flowers/flower.model';
import { FlowersService } from './flowers.service';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(
    private HttpClient: HttpClient,
    private flowerService: FlowersService
  ) {}

  getFlowers(pagesize: number, currentpage: number) {
    return this.HttpClient.get<{
      message: string;
      flowers: Flower[];
      count: number;
    }>(
      'http://localhost:3000/api/flowers/getFlowers?pagesize=' +
        pagesize +
        '&currentpage=' +
        currentpage
    );
  }

  getByType(type: string, pagesize: number, currentpage: number) {
    console.log(type);
    return this.HttpClient.get<{
      message: string;
      flowers: Flower[];
      count: number;
    }>('http://localhost:3000/api/collection/getByType', {
      params: {
        type: type,
        pagesize: String(pagesize),
        currentpage: String(currentpage),
      },
    });
  }
  getByOccassion(occassion: string, pagesize: number, currentpage: number) {
    return this.HttpClient.get<{
      message: string;
      flowers: Flower[];
      count: number;
    }>('http://localhost:3000/api/collection/getByOccassion', {
      params: {
        occassion: occassion,
        pagesize: String(pagesize),
        currentpage: String(currentpage),
      },
    });
  }
  getByColor(color: string) {
    this.HttpClient.get<{ message: string; Flower: Flower }>(
      'http://localhost:3000/api/collection/getByColor' + color
    ).subscribe((color) => {
      console.log(color);
    });
  }
  getById(id: number) {
    console.log(id);
    return this.HttpClient.get<{ message: string; flowers: Flower }>(
      'http://localhost:3000/api/collection/getById',
      {
        params: {
          id: String(id),
        },
      }
    );
  }

  getByName(name: string) {
    return this.HttpClient.get<{ message: string; flower: Flower }>(
      'http://localhost:3000/api/collection/' + name
    );
  }
}
