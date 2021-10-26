import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QsgFamilyComponent } from './qsg-family.component';

describe('QsgFamilyComponent', () => {
  let component: QsgFamilyComponent;
  let fixture: ComponentFixture<QsgFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QsgFamilyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QsgFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
