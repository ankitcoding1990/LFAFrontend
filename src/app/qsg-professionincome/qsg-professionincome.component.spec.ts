import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QsgProfessionincomeComponent } from './qsg-professionincome.component';

describe('QsgProfessionincomeComponent', () => {
  let component: QsgProfessionincomeComponent;
  let fixture: ComponentFixture<QsgProfessionincomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QsgProfessionincomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QsgProfessionincomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
