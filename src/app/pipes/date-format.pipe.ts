import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatingDate' })
export class FormatingDatePipe implements PipeTransform {
  transform(value: string | Date): string {
    let iso: string;
    let date: Date = new Date();
    if(typeof value === 'string') {
     iso = value.replace(' ', 'T').replace('.', '');
      date = new Date(iso);
    }

    if (isNaN(date.getTime())) return '';

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day   = String(date.getDate()).padStart(2, '0');
    const year  = date.getFullYear();

    return `${month}/${day}/${year}`;
  }
}
