import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinitorComponent } from './minitor.component';

describe('MinitorComponent', () => {
  let component: MinitorComponent;
  let fixture: ComponentFixture<MinitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
