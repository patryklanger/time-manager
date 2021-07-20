import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelMainComponent } from './user-panel-main.component';

describe('UserPanelMainComponent', () => {
  let component: UserPanelMainComponent;
  let fixture: ComponentFixture<UserPanelMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPanelMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPanelMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
