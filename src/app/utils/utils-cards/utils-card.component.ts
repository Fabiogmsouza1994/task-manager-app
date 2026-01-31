import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'utils-card',
  imports: [],
  templateUrl: './utils-card.component.html',
  styleUrl: './utils-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilsCardComponent { 
  @Input() label!: string;  
  @Input() colorValue!: string;
}
