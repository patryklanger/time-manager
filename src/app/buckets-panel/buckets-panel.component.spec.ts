import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketsPanelComponent } from './buckets-panel.component';

describe('BucketsPanelComponent', () => {
  let component: BucketsPanelComponent;
  let fixture: ComponentFixture<BucketsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BucketsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
