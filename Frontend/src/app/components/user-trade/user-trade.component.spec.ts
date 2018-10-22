import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTradeComponent } from './user-trade.component';

describe('UserTradeComponent', () => {
  let component: UserTradeComponent;
  let fixture: ComponentFixture<UserTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
