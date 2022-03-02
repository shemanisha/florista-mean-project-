import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDPageComponent } from './pdpage.component';

describe('PDPageComponent', () => {
  let component: PDPageComponent;
  let fixture: ComponentFixture<PDPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PDPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PDPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
