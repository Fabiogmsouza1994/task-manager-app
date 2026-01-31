import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseErrorHandlerService } from '../../../services/response-error-handler.service';
import { ApiResponsesModel } from '../../../models/apis-responses.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  readonly url: string = 'https://localhost:7065/api/TaskManager';

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _handleErrorService: ResponseErrorHandlerService
  ) {}

  getDataById(id: string | number): Observable<ApiResponsesModel<DashboardInterface>> {
    return this._httpClient
      .get<DashboardInterface>(`${this.url}/${id}`)
      .pipe(this._handleErrorService.handleRequest<DashboardInterface>);
  }

  getAllData(): Observable<ApiResponsesModel<DashboardInterface[]>> {
    return this._httpClient
      .get<DashboardInterface[]>(this.url)
      .pipe(this._handleErrorService.handleRequest<DashboardInterface[]>);
  }

  addData(data: DashboardInterface): Observable<ApiResponsesModel<DashboardInterface>> {
    return this._httpClient
      .post<DashboardInterface>(this.url, data)
      .pipe(this._handleErrorService.handleRequest<DashboardInterface>);
  }

  updateData(
    id: number,
    data: DashboardInterface
  ): Observable<ApiResponsesModel<DashboardInterface>> {
    return this._httpClient
      .patch<DashboardInterface>(`${this.url}/${id}`, data)
      .pipe(this._handleErrorService.handleRequest<DashboardInterface>);
  }

  removeData(id: number): Observable<ApiResponsesModel<DashboardInterface>> {
    return this._httpClient
      .delete<DashboardInterface>(`${this.url}/${id}`)
      .pipe(this._handleErrorService.handleRequest<DashboardInterface>);
  }
}
