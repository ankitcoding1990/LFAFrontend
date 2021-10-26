import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideChildSupportComponent } from './guide-child-support.component';

describe('GuideChildSupportComponent', () => {
  let component: GuideChildSupportComponent;
  let fixture: ComponentFixture<GuideChildSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuideChildSupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideChildSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
