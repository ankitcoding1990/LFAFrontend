import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QsgProfilesummaryComponent } from './qsg-profilesummary.component';

describe('QsgProfilesummaryComponent', () => {
  let component: QsgProfilesummaryComponent;
  let fixture: ComponentFixture<QsgProfilesummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QsgProfilesummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QsgProfilesummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
