import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'features-user-auth',
  imports: [RegisterComponent],
  templateUrl: 'user-auth.component.html',
  styleUrl: './user-auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAuthComponent { }
