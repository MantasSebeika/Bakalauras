import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PradziaComponent } from './pradzia.component';

describe('PradziaComponent', () => {
  let component: PradziaComponent;
  let fixture: ComponentFixture<PradziaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PradziaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PradziaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
