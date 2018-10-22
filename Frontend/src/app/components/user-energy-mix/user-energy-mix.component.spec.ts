import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEnergyMixComponent } from './user-energy-mix.component';

describe('UserEnergyMixComponent', () => {
  let component: UserEnergyMixComponent;
  let fixture: ComponentFixture<UserEnergyMixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEnergyMixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEnergyMixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
