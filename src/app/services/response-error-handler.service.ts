import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ApiResponsesModel } from '../models/apis-responses.model';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class ResponseErrorHandlerService {
  constructor(private _alertService: AlertService) {}

  private _getErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400:
        return 'Ops! Operação não concluída devido a erro no sistema.';
      case 401:
        return 'Ops! Você não está autorizado a realizar essa operação...';
      case 404:
        return 'Ops! Operação não concluída, nada encontrado...';
      case 500:
        return 'Ops! Operação não concluída devido a erro de servidor.';
      default:
        return 'Ops! Um erro foi encontrado.';
    }
  }

  private _handleError(error: HttpErrorResponse): Observable<string> {
    const errorMsg: string = this._getErrorMessage(error);
    return of(errorMsg);
  }

  handleRequest<T>(
    observable: Observable<T>
  ): Observable<ApiResponsesModel<T>> {
    return observable.pipe(
      map((data: T) => ({
        success: true,
        data,
      })),
      catchError((error: HttpErrorResponse) =>
        this._handleError(error).pipe(
          map((errorMsg: string) => {
            this._alertService.error(errorMsg);
            return { success: false, error: errorMsg };
          })
        )
      )
    );
  }
}
