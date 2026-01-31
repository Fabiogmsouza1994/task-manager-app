export interface SharedDateFieldConfig {
  keepInvalid: boolean;
  fieldName: string;
  id?: string;
  dateFormat?: 'mm/dd/yy' | 'mm-dd-yy' | 'mm-dd-y';
  label?: string;
  placeholder?: string;
  showTime?: boolean;
  minDate?: Date | null;
  maxDate?: Date | null;
}
