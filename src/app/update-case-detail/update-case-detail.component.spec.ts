import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCaseDetailComponent } from './update-case-detail.component';

describe('UpdateCaseDetailComponent', () => {
  let component: UpdateCaseDetailComponent;
  let fixture: ComponentFixture<UpdateCaseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCaseDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
