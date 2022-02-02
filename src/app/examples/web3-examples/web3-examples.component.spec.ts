import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Web3ExamplesComponent } from './web3-examples.component';

describe('Web3ExamplesComponent', () => {
  let component: Web3ExamplesComponent;
  let fixture: ComponentFixture<Web3ExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Web3ExamplesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Web3ExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
