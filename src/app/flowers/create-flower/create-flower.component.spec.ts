import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFlowerComponent } from './create-flower.component';

describe('CreateFlowerComponent', () => {
  let component: CreateFlowerComponent;
  let fixture: ComponentFixture<CreateFlowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFlowerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFlowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
