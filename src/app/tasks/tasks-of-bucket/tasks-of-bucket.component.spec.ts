import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksOfBucketComponent } from './tasks-of-bucket.component';

describe('TasksOfBucketComponent', () => {
  let component: TasksOfBucketComponent;
  let fixture: ComponentFixture<TasksOfBucketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksOfBucketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksOfBucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
