import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewLegalResourcesComponent } from './review-legal-resources.component';

describe('ReviewLegalResourcesComponent', () => {
  let component: ReviewLegalResourcesComponent;
  let fixture: ComponentFixture<ReviewLegalResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewLegalResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewLegalResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
