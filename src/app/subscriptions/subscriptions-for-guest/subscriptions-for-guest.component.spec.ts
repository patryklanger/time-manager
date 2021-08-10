import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsForGuestComponent } from './subscriptions-for-guest.component';

describe('SubscriptionsForGuestComponent', () => {
  let component: SubscriptionsForGuestComponent;
  let fixture: ComponentFixture<SubscriptionsForGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionsForGuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionsForGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
