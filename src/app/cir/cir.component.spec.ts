import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirComponent } from './cir.component';

describe('CirComponent', () => {
  let component: CirComponent;
  let fixture: ComponentFixture<CirComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

