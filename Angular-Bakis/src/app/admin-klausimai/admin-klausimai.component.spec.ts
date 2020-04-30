import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKlausimaiComponent } from './admin-klausimai.component';

describe('AdminKlausimaiComponent', () => {
  let component: AdminKlausimaiComponent;
  let fixture: ComponentFixture<AdminKlausimaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminKlausimaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKlausimaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
