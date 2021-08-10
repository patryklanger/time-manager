import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimersForTaskComponent } from './timers-for-task.component';

describe('TimersForTaskComponent', () => {
  let component: TimersForTaskComponent;
  let fixture: ComponentFixture<TimersForTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimersForTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimersForTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
