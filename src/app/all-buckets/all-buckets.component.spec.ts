import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBucketsComponent } from './all-buckets.component';

describe('AllBucketsComponent', () => {
  let component: AllBucketsComponent;
  let fixture: ComponentFixture<AllBucketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBucketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBucketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
