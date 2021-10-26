import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalVaultComponent } from './legal-vault.component';

describe('LegalVaultComponent', () => {
  let component: LegalVaultComponent;
  let fixture: ComponentFixture<LegalVaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalVaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalVaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
