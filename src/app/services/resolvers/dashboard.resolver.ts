
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponsesModel } from '../../models/apis-responses.model';
import { DashboardService } from '../../features/dashboard/services/dashboard.service';

@Injectable({ providedIn: 'root' })
export class TaskManagerResolver {
  constructor(private readonly _dashboardService: DashboardService) {}

  resolve(): Observable<ApiResponsesModel<DashboardInterface[]>> {
    return this._dashboardService.getAllData();
  }
}
