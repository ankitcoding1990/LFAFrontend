import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalPlanComponent } from './legal-plan.component';

describe('LegalPlanComponent', () => {
  let component: LegalPlanComponent;
  let fixture: ComponentFixture<LegalPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
