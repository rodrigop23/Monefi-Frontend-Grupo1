import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.css'],
})
export class DefaultButtonComponent {
  @Input() text: string = '';
  @Input() defaultButton: boolean = true;
  @Output() onClick = new EventEmitter<void>();

  onPress() {
    this.onClick.emit();
  }
}
