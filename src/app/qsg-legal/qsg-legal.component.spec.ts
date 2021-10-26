import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QsgLegalComponent } from './qsg-legal.component';

describe('QsgLegalComponent', () => {
  let component: QsgLegalComponent;
  let fixture: ComponentFixture<QsgLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QsgLegalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QsgLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
