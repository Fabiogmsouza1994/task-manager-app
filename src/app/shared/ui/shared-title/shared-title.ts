import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'shared-title',
  imports: [MatIconModule, CommonModule],
  template: `@if (isSubtitle) {
      <h2 class="h2 shared-title text-wrap py-2">{{ title }}</h2>
    } @else {
      <span class="d-flex align-items-baseline gap-2">
        @if (icon) {
          <mat-icon class="fs-3" [fontIcon]="icon"></mat-icon>
        }
        <h1 class="fs-3 fw-bold shared-title text-wrap py-3">{{ title }}</h1>
      </span>
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedTitleComponent {
  @Input() title!: string;
  @Input() isSubtitle!: boolean;
  @Input() icon!: string;
}
