import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToHhmmss',
})
export class NumberToHhmmssPipe implements PipeTransform {
  transform(value: number): string {
    let totalTime = value;
    let hours = Math.floor(value / 3600);
    totalTime -= hours * 3600;
    let minutes = Math.floor(totalTime / 60);
    totalTime -= minutes * 60;
    let seconds = totalTime;

    return (
      (hours < 10 ? '0' + hours : '' + hours) +
      (minutes < 10 ? ':0' + minutes : ':' + minutes) +
      (seconds < 10 ? ':0' + seconds : ':' + seconds)
    );
  }
}
