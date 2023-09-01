import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'globalDate', standalone: true })
export class GlobalDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value: number | string | Date): string {
    const format = 'dd/MM/yyyy';
    return this.datePipe.transform(new Date(value), format, '+0000') as string;
  }
}
