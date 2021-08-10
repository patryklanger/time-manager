import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimersForAdminComponent } from './timers-for-admin.component';

describe('TimersForAdminComponent', () => {
  let component: TimersForAdminComponent;
  let fixture: ComponentFixture<TimersForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimersForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimersForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
