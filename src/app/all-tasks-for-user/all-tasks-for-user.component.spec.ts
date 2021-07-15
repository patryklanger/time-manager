import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTasksForUserComponent } from './all-tasks-for-user.component';

describe('AllTasksForUserComponent', () => {
  let component: AllTasksForUserComponent;
  let fixture: ComponentFixture<AllTasksForUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTasksForUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTasksForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
