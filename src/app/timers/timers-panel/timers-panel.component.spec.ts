import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimersPanelComponent } from './timers-panel.component';

describe('TimersPanelComponent', () => {
  let component: TimersPanelComponent;
  let fixture: ComponentFixture<TimersPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimersPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
