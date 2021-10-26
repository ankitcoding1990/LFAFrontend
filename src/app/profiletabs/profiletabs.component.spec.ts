import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiletabsComponent } from './profiletabs.component';

describe('ProfiletabsComponent', () => {
  let component: ProfiletabsComponent;
  let fixture: ComponentFixture<ProfiletabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfiletabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfiletabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
