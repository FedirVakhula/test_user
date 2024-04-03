import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ButtonState } from './button-state.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() public buttonText = '';
  @Input() public disabled = false;
  @Input() public state!: keyof typeof ButtonState;
  @Output() public onClick: EventEmitter<MouseEvent> =
    new EventEmitter<MouseEvent>();

  public get color(): string | null {
    switch (this.state) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'accent';
      default:
        return null;
    }
  }
}
