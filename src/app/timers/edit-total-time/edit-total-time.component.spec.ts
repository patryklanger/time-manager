import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTotalTimeComponent } from './edit-total-time.component';

describe('EditTotalTimeComponent', () => {
  let component: EditTotalTimeComponent;
  let fixture: ComponentFixture<EditTotalTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTotalTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTotalTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
