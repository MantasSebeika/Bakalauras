import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrisijungimasComponent } from './prisijungimas.component';

describe('PrisijungimasComponent', () => {
  let component: PrisijungimasComponent;
  let fixture: ComponentFixture<PrisijungimasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrisijungimasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrisijungimasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
