import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCreateByidComponent } from './stock-create-byid.component';

describe('StockCreateByidComponent', () => {
  let component: StockCreateByidComponent;
  let fixture: ComponentFixture<StockCreateByidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockCreateByidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockCreateByidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
