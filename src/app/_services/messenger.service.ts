import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessengerService {
  subject = new Subject();
  constructor() {}

  sendMsg(flower) {
    this.subject.next(flower); // Triggering an event
  }
  getMsg() {
    return this.subject.asObservable();
  }
}
