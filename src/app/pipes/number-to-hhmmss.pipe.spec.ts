import { NumberToHhmmssPipe } from './number-to-hhmmss.pipe';

describe('NumberToHhmmssPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberToHhmmssPipe();
    expect(pipe).toBeTruthy();
  });
});
