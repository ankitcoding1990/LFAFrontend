import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickstartquideComponent } from './quickstartquide.component';

describe('QuickstartquideComponent', () => {
  let component: QuickstartquideComponent;
  let fixture: ComponentFixture<QuickstartquideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickstartquideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickstartquideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
