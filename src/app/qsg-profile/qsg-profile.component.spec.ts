import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QsgProfileComponent } from './qsg-profile.component';

describe('QsgProfileComponent', () => {
  let component: QsgProfileComponent;
  let fixture: ComponentFixture<QsgProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QsgProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QsgProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
