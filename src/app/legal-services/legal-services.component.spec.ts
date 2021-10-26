import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalServicesComponent } from './legal-services.component';

describe('LegalServicesComponent', () => {
  let component: LegalServicesComponent;
  let fixture: ComponentFixture<LegalServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
