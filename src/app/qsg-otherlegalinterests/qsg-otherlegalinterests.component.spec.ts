import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QsgOtherlegalinterestsComponent } from './qsg-otherlegalinterests.component';

describe('QsgOtherlegalinterestsComponent', () => {
  let component: QsgOtherlegalinterestsComponent;
  let fixture: ComponentFixture<QsgOtherlegalinterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QsgOtherlegalinterestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QsgOtherlegalinterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
