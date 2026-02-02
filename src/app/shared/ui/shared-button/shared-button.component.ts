import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'shared-button',
  imports: [CommonModule, MatIconModule],
  templateUrl: './shared-button.component.html',
  styleUrl: './shared-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedButtonComponent {
  @Input() type: 'submit' | null = null;
  @Input() style: 'clear' | 'add' | 'delete' | 'update' | 'save' | 'default' = 'default';
  @Input() textButton: string = '';
  @Input() icon: string = '';
  @Input() disabled: boolean | null = false;
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
