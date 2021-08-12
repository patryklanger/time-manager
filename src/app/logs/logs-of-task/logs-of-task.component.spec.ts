import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsOfTaskComponent } from './logs-of-task.component';

describe('LogsOfTaskComponent', () => {
  let component: LogsOfTaskComponent;
  let fixture: ComponentFixture<LogsOfTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsOfTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsOfTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
