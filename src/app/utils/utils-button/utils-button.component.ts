import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'utils-button',
  imports: [CommonModule, MatIconModule],
  templateUrl: './utils-button.component.html',
  styleUrl: './utils-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilsButtonComponent { 
  @Input() type: 'clear' | 'add' | 'delete' | 'update' | 'save' | 'default' = 'default'; 
  @Input() textButton: string = "";
  @Input() icon: string = "";
  @Input()
 disabled: boolean | null = true;
}
