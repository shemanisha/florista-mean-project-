import { Component, OnInit } from '@angular/core';
import { FlowersService } from '../_services/flowers.service';

@Component({
  selector: 'app-flowers',
  templateUrl: './flowers.component.html',
  styleUrls: ['./flowers.component.css'],
})
export class FlowersComponent implements OnInit {
  constructor(private flowerService: FlowersService) {}

  ngOnInit(): void {}
}
