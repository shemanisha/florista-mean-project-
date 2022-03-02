import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Flower } from '../flowers/flower.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FlowersService {
  private flower: Flower[] = [];
  private oneFlower;
  private flowerUpdated = new Subject<Flower[]>();
  getPostUpdateListener() {
    return this.flowerUpdated.asObservable();
  }
  constructor(
    private httpClient: HttpClient,
    private AuthService: AuthService,
    private router: Router
  ) {}

  createFlowers(
    name: string,
    image: File,
    description: string,
    price: string,
    type: string,
    occassion: string,
    color: string
  ) {
    const flowerData = new FormData();
    flowerData.append('name', name);
    flowerData.append('description', description);
    flowerData.append('price', price);
    flowerData.append('type', type);
    flowerData.append('occassion', occassion);
    flowerData.append('color', color);
    flowerData.append('image', image, name);
    let token = this.AuthService.getToken();
    this.httpClient
      .post<{ message: string; flower: Flower }>(
        'http://localhost:3000/api/flowers/createFlower',
        flowerData
      )
      .subscribe((result) => {
        console.log(result);
        const flower: Flower = {
          flowerid: result.flower[0].flowerid,
          name: result.flower[0].name,
          image: result.flower[0].image,
          description: result.flower[0].description,
          price: result.flower[0].price,
          occassion: result.flower[0].occassion,
          type: result.flower[0].type,
          color: result.flower[0].colorid,
        };

        this.flower.push(flower);
        this.flowerUpdated.next([...this.flower]);
        this.router.navigate(['/collections']);
      });
  }

  deleteFlower(flowerid: number) {
    this.httpClient
      .delete<{ message: string }>(
        'http://localhost:3000/api/flowers/' + flowerid
      )
      .subscribe((result) => {
        console.log(result);
        console.log(this.flower[0].flowerid);
        console.log(flowerid);

        // const updatedFlowers = this.flower.filter(
        //   (flower) => flower.flowerid !== flowerid
        // );
        // console.log(updatedFlowers);
        // this.flower = updatedFlowers;
        // console.log(this.flower);
        // this.flowerUpdated.next([...this.flower]);
        this.router.navigate(['/collections']);
      });
  }

  updateFlower(
    id: number,
    image: string | File,
    name: string,
    description: string,
    price: number,
    type: string,
    occassion: string,
    color: number
  ) {
    let flowerData1;

    if (typeof image === 'object') {
      flowerData1 = new FormData();
      flowerData1.append('name', name);
      flowerData1.append('description', description);
      flowerData1.append('price', price);
      flowerData1.append('type', type);
      flowerData1.append('occassion', occassion);
      flowerData1.append('color', color);
      flowerData1.append('image', image, name);
    } else {
      flowerData1 = {
        flowerid: id,
        name: name,
        description: description,
        price: price,
        type: type,
        occassion: occassion,
        color: color,
        image: image,
      };

      this.httpClient
        .put<{ message: string }>(
          'http://localhost:3000/api/flowers/' + id,
          flowerData1
        )
        .subscribe((result) => {
          console.log(result.message);
          this.router.navigate(['/collections']);
        });
      console.log(this.httpClient);
    }
  }
}
