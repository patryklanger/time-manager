import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToTimeString',
})
export class DateToTimeStringPipe implements PipeTransform {
  transform(time: Date): string {
    let hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    let minutes =
      time.getMinutes() < 10
        ? ':0' + time.getMinutes()
        : ':' + time.getMinutes();
    let day =
      time.getDate() < 10 ? ', 0' + time.getDate() : ', ' + time.getDate();
    let month =
      time.getMonth() < 10 ? '.0' + time.getMonth() : '.' + time.getMonth();
    return hours + minutes + day + month + '.' + time.getFullYear();
  }
}
