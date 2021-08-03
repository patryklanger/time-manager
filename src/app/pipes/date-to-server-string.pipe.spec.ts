import { DateToServerStringPipe } from './date-to-server-string.pipe';

describe('DateToServerStringPipe', () => {
  it('create an instance', () => {
    const pipe = new DateToServerStringPipe();
    expect(pipe).toBeTruthy();
  });
});
