import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultStorageComponent } from './vault-storage.component';

describe('VaultStorageComponent', () => {
  let component: VaultStorageComponent;
  let fixture: ComponentFixture<VaultStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaultStorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaultStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
