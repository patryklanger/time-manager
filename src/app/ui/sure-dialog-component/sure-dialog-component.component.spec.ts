import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SureDialogComponentComponent } from './sure-dialog-component.component';

describe('SureDialogComponentComponent', () => {
  let component: SureDialogComponentComponent;
  let fixture: ComponentFixture<SureDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SureDialogComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SureDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
