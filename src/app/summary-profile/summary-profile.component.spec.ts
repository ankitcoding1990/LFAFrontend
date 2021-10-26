import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryProfileComponent } from './summary-profile.component';

describe('SummaryProfileComponent', () => {
  let component: SummaryProfileComponent;
  let fixture: ComponentFixture<SummaryProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
