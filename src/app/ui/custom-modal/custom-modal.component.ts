import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss'],
})
export class CustomModalComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      let modal =
        elementRef.nativeElement.getElementsByClassName('flex--center');
      if (e.target === modal[0]) this.close.emit(false);
    });
  }
  ngOnInit(): void {}
}
