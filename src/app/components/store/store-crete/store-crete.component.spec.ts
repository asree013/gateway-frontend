import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCreteComponent } from './store-crete.component';

describe('StoreCreteComponent', () => {
  let component: StoreCreteComponent;
  let fixture: ComponentFixture<StoreCreteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCreteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
