import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrisijungimasAdminComponent } from './prisijungimas-admin.component';

describe('PrisijungimasAdminComponent', () => {
  let component: PrisijungimasAdminComponent;
  let fixture: ComponentFixture<PrisijungimasAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrisijungimasAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrisijungimasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
