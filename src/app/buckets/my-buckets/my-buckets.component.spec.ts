import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBucketsComponent } from './my-buckets.component';

describe('MyBucketsComponent', () => {
  let component: MyBucketsComponent;
  let fixture: ComponentFixture<MyBucketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBucketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBucketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
