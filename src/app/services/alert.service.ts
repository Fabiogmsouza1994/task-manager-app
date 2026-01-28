import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { asyncScheduler, observeOn } from 'rxjs';
import { AlertPosition } from '../models/enums/alert-position.enum';

@Injectable({
    providedIn: 'root',
  })
export class AlertService {
  constructor(private readonly _toastrService: ToastrService) {}

  info(
    msg: string,
    title: string = '',
    position?: { positionClass: AlertPosition }
  ): void {
    this._toastrService
      .info(title, msg, position)
      .onShown.pipe(observeOn(asyncScheduler))
      .subscribe();
  }

  success(
    msg: string,
    title: string = '',
    position?: { positionClass: AlertPosition }
  ): void {
    this._toastrService
      .success(title, msg, position)
      .onShown.pipe(observeOn(asyncScheduler))
      .subscribe();
  }

  warning(
    msg: string,
    title: string = '',
    position?: { positionClass: AlertPosition }
  ): void {
    this._toastrService
      .warning(title, msg, position)
      .onShown.pipe(observeOn(asyncScheduler))
      .subscribe();
  }

  error(
    msg: string,
    title: string = '',
    position?: { positionClass: AlertPosition }
  ): void {
    this._toastrService
      .success(title, msg, position)
      .onShown.pipe(observeOn(asyncScheduler))
      .subscribe();
  }
}
