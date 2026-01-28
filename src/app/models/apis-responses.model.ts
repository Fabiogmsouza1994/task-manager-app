export interface ApiResponsesModel<T> {
  success: boolean;
  data?: T;
  error?: string;
}
