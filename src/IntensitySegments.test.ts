import { expect } from 'earl'
import { IntensitySegments } from './IntensitySegments'
// import { add } from './IntensitySegments'

// describe(add.name, () => {
//   it('adds two numbers', () => {
//     expect(add(1, 2)).toEqual(3)
//   })
// })

describe('IntensitySegments', () => {
  it('case 1', () => {
    const segments = new IntensitySegments();
    segments.add(10, 30, 1);
    segments.toString(); // Should be: "[[10,1],[30,0]]"
    expect(segments.toString()).toEqual("[[10,1],[30,0]]");
    segments.add(20, 40, 1);
    segments.toString(); // Should be: "[[10,1],[20,2],[30,1],[40,0]]"
    segments.add(10, 40, -2);
    segments.toString(); // Should be: "[[10,-1],[20,0],[30,-1],[40,0]]"
  })
})