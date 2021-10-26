import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QsgPetComponent } from './qsg-pet.component';

describe('QsgPetComponent', () => {
  let component: QsgPetComponent;
  let fixture: ComponentFixture<QsgPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QsgPetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QsgPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
