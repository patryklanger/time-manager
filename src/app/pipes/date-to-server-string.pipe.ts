import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToServerString',
})
export class DateToServerStringPipe implements PipeTransform {
  transform(inDate: Date): string {
    console.log('XD');
    let date = [inDate.getFullYear()];
    date.push(inDate.getMonth() + 1);
    date.push(inDate.getDate());
    date.push(inDate.getHours());
    date.push(inDate.getMinutes());
    date.push(inDate.getSeconds());
    let timeString: string;
    timeString = '' + date[0];
    if (date[1] < 10) timeString += '-0' + date[1];
    else timeString += '-' + date[1].toString();
    if (date[2] < 10) timeString += '-0' + date[2] + 'T';
    else timeString += '-' + date[2].toString() + 'T';
    if (date[3] < 10) timeString += '0' + date[3];
    else timeString += date[3].toString();
    if (date[4] < 10) timeString += ':0' + date[4];
    else timeString += ':' + date[4];
    if (date[5] < 10) timeString += ':0' + date[5];
    else timeString += ':' + date[5];
    console.log(timeString);
    return timeString;
  }
}
