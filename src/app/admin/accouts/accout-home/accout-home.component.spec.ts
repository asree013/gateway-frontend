import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccoutHomeComponent } from './accout-home.component';

describe('AccoutHomeComponent', () => {
  let component: AccoutHomeComponent;
  let fixture: ComponentFixture<AccoutHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccoutHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccoutHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
