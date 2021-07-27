import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxMessageComponent } from './dialog-box-message.component';

describe('DialogBoxMessageComponent', () => {
  let component: DialogBoxMessageComponent;
  let fixture: ComponentFixture<DialogBoxMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoxMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
