import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteConsultComponent } from './complete-consult.component';

describe('CompleteConsultComponent', () => {
  let component: CompleteConsultComponent;
  let fixture: ComponentFixture<CompleteConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteConsultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
