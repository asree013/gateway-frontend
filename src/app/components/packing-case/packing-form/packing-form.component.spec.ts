import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingFormComponent } from './packing-form.component';

describe('PackingFormComponent', () => {
  let component: PackingFormComponent;
  let fixture: ComponentFixture<PackingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
