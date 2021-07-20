import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketCardComponent } from './bucket-card.component';

describe('BucketCardComponent', () => {
  let component: BucketCardComponent;
  let fixture: ComponentFixture<BucketCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BucketCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
