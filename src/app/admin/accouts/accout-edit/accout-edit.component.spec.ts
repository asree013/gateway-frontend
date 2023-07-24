import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccoutEditComponent } from './accout-edit.component';

describe('AccoutEditComponent', () => {
  let component: AccoutEditComponent;
  let fixture: ComponentFixture<AccoutEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccoutEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccoutEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
