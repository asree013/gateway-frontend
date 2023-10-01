import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditStockComponent } from './modal-edit-stock.component';

describe('ModalEditStockComponent', () => {
  let component: ModalEditStockComponent;
  let fixture: ComponentFixture<ModalEditStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
