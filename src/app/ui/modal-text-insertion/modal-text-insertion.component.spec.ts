import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTextInsertionComponent } from './modal-text-insertion.component';

describe('ModalTextInsertionComponent', () => {
  let component: ModalTextInsertionComponent;
  let fixture: ComponentFixture<ModalTextInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTextInsertionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTextInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
