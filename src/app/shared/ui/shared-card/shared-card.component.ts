import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'shared-card',
  imports: [],
  templateUrl: './shared-card.component.html',
  styleUrl: './shared-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedCardComponent { 
  @Input() label!: string;  
  @Input() colorValue!: string;
}
