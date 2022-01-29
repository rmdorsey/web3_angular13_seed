import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPaintComponent } from './first-paint.component';

describe('FirstPaintComponent', () => {
  let component: FirstPaintComponent;
  let fixture: ComponentFixture<FirstPaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstPaintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstPaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
