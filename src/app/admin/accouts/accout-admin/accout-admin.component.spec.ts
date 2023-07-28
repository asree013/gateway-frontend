import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccoutAdminComponent } from './accout-admin.component';

describe('AccoutAdminComponent', () => {
  let component: AccoutAdminComponent;
  let fixture: ComponentFixture<AccoutAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccoutAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccoutAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
