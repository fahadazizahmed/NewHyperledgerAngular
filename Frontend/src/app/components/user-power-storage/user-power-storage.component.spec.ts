import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPowerStorageComponent } from './user-power-storage.component';

describe('UserPowerStorageComponent', () => {
  let component: UserPowerStorageComponent;
  let fixture: ComponentFixture<UserPowerStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPowerStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPowerStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
