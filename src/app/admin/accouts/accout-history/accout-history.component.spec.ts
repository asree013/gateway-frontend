import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccoutHistoryComponent } from './accout-history.component';

describe('AccoutHistoryComponent', () => {
  let component: AccoutHistoryComponent;
  let fixture: ComponentFixture<AccoutHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccoutHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccoutHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
