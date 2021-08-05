import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUserByEmailComponent } from './select-user-by-email.component';

describe('SelectUserByEmailComponent', () => {
  let component: SelectUserByEmailComponent;
  let fixture: ComponentFixture<SelectUserByEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectUserByEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectUserByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
