import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlausimynasComponent } from './klausimynas.component';

describe('KlausimynasComponent', () => {
  let component: KlausimynasComponent;
  let fixture: ComponentFixture<KlausimynasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlausimynasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlausimynasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
