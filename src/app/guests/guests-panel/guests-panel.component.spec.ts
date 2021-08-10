import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestsPanelComponent } from './guests-panel.component';

describe('GuestsPanelComponent', () => {
  let component: GuestsPanelComponent;
  let fixture: ComponentFixture<GuestsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
