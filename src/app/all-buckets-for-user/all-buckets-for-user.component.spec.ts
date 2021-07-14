import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBucketsForUserComponent } from './all-buckets-for-user.component';

describe('AllBucketsForUserComponent', () => {
  let component: AllBucketsForUserComponent;
  let fixture: ComponentFixture<AllBucketsForUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBucketsForUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBucketsForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
