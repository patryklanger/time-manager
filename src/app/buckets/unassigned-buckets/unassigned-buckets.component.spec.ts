import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignedBucketsComponent } from './unassigned-buckets.component';

describe('UnassignedBucketsComponent', () => {
  let component: UnassignedBucketsComponent;
  let fixture: ComponentFixture<UnassignedBucketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnassignedBucketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignedBucketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
