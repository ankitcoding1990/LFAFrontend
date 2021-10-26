import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerifyLaterComponent } from './email-verify-later.component';

describe('EmailVerifyLaterComponent', () => {
  let component: EmailVerifyLaterComponent;
  let fixture: ComponentFixture<EmailVerifyLaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailVerifyLaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailVerifyLaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
