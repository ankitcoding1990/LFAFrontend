import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QsgInterestsComponent } from './qsg-interests.component';

describe('QsgInterestsComponent', () => {
  let component: QsgInterestsComponent;
  let fixture: ComponentFixture<QsgInterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QsgInterestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QsgInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
