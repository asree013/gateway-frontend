import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaddingComponent } from './loadding.component';

describe('LoaddingComponent', () => {
  let component: LoaddingComponent;
  let fixture: ComponentFixture<LoaddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaddingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
