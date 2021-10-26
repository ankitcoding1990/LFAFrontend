import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfHelpGuideComponent } from './self-help-guide.component';

describe('SelfHelpGuideComponent', () => {
  let component: SelfHelpGuideComponent;
  let fixture: ComponentFixture<SelfHelpGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfHelpGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfHelpGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
