import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccoutCreateComponent } from './accout-create.component';

describe('AccoutCreateComponent', () => {
  let component: AccoutCreateComponent;
  let fixture: ComponentFixture<AccoutCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccoutCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccoutCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
