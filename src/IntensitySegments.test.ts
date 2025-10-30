import { expect } from 'earl'
import { IntensitySegments } from './IntensitySegments'
// import { add } from './IntensitySegments'

// describe(add.name, () => {
//   it('adds two numbers', () => {
//     expect(add(1, 2)).toEqual(3)
//   })
// })

describe('IntensitySegments.add()', () => {
  it('add() case 1: 修改区间from在中间、to在中间', () => {
    const segments = new IntensitySegments();
    segments.add(10, 30, 1);
    expect(segments.toString()).toEqual("[[10,1],[30,0]]");
    segments.add(20, 40, 1);
    expect(segments.toString()).toEqual("[[10,1],[20,2],[30,1],[40,0]]");
    segments.add(10, 40, -2);
    expect(segments.toString()).toEqual("[[10,-1],[20,0],[30,-1],[40,0]]");

    // from不相等、to不相等
    segments.add(25, 35, 3);
    expect(segments.toString()).toEqual("[[10,-1],[20,0],[25,3],[30,2],[35,-1],[40,0]]");

    // from不相等、to相等
    segments.add(28, 35, 4);
    expect(segments.toString()).toEqual("[[10,-1],[20,0],[25,3],[28,7],[30,6],[35,-1],[40,0]]");

    // from相等、to不相等
    segments.add(20, 38, -4);
    expect(segments.toString()).toEqual("[[10,-1],[20,-4],[25,-1],[28,3],[30,2],[35,-5],[38,-1],[40,0]]");

    // from相等、to相等
    segments.add(25, 40, 10);
    expect(segments.toString()).toEqual("[[10,-1],[20,-4],[25,9],[28,13],[30,12],[35,5],[38,9],[40,0]]");
  });


  it('add() case 2: 修改区间from在左侧、to在中间', () => {
    const segments = new IntensitySegments();
    segments.add(10, 30, 1);
    expect(segments.toString()).toEqual("[[10,1],[30,0]]");
    segments.add(20, 40, 1);
    expect(segments.toString()).toEqual("[[10,1],[20,2],[30,1],[40,0]]");
    segments.add(10, 40, -2);
    expect(segments.toString()).toEqual("[[10,-1],[20,0],[30,-1],[40,0]]");

    // from不相等、to不相等
    segments.add(-10, 25, 9);
    expect(segments.toString()).toEqual("[[-10,9],[10,8],[20,9],[25,0],[30,-1],[40,0]]");

    // from不相等、to相等
    segments.add(-20, 30, -4);
    expect(segments.toString()).toEqual("[[-20,-4],[-10,5],[10,4],[20,5],[25,-4],[30,-1],[40,0]]");

    // from相等、to不相等
    segments.add(-20, 35, 10);
    expect(segments.toString()).toEqual("[[-20,6],[-10,15],[10,14],[20,15],[25,6],[30,9],[35,-1],[40,0]]");

    // from相等、to相等
    segments.add(-20, 25, 2);
    expect(segments.toString()).toEqual("[[-20,8],[-10,17],[10,16],[20,17],[25,6],[30,9],[35,-1],[40,0]]");
  });

  it('add() case 3: 修改区间from在左侧、to在右侧', () => {
    const segments = new IntensitySegments();
    segments.add(10, 30, 1);
    expect(segments.toString()).toEqual("[[10,1],[30,0]]");
    segments.add(20, 40, 1);
    expect(segments.toString()).toEqual("[[10,1],[20,2],[30,1],[40,0]]");
    segments.add(10, 40, -2);
    expect(segments.toString()).toEqual("[[10,-1],[20,0],[30,-1],[40,0]]");

    // from不相等、to不相等
    segments.add(-10, 60, 7);
    expect(segments.toString()).toEqual("[[-10,7],[10,6],[20,7],[30,6],[40,7],[60,0]]");

    // from不相等、to相等
    segments.add(-20, 60, -4);
    expect(segments.toString()).toEqual("[[-20,-4],[-10,3],[10,2],[20,3],[30,2],[40,3],[60,0]]");

    // from相等、to不相等
    segments.add(-20, 70, 10);
    expect(segments.toString()).toEqual("[[-20,6],[-10,13],[10,12],[20,13],[30,12],[40,13],[60,10],[70,0]]");

    // from相等、to相等
    segments.add(-20, 70, 2);
    expect(segments.toString()).toEqual("[[-20,8],[-10,15],[10,14],[20,15],[30,14],[40,15],[60,12],[70,0]]");
  });


  it('add() case 4: 修改区间from在左侧、to在左侧', () => {
    const segments = new IntensitySegments();
    segments.add(10, 30, 1);
    expect(segments.toString()).toEqual("[[10,1],[30,0]]");
    segments.add(20, 40, 1);
    expect(segments.toString()).toEqual("[[10,1],[20,2],[30,1],[40,0]]");
    segments.add(10, 40, -2);
    expect(segments.toString()).toEqual("[[10,-1],[20,0],[30,-1],[40,0]]");

    // from不相等、to不相等
    segments.add(-20, -10, 7);
    expect(segments.toString()).toEqual("[[-20,7],[-10,0],[10,-1],[20,0],[30,-1],[40,0]]");

    // from不相等、to相等
    segments.add(-40, -20, -4);
    expect(segments.toString()).toEqual("[[-40,-4],[-20,7],[-10,0],[10,-1],[20,0],[30,-1],[40,0]]");
  });


  it('add() case 5: 修改区间from在右侧、to在右侧', () => {
    const segments = new IntensitySegments();
    segments.add(10, 30, 1);
    expect(segments.toString()).toEqual("[[10,1],[30,0]]");
    segments.add(20, 40, 1);
    expect(segments.toString()).toEqual("[[10,1],[20,2],[30,1],[40,0]]");
    segments.add(10, 40, -2);
    expect(segments.toString()).toEqual("[[10,-1],[20,0],[30,-1],[40,0]]");

    // from不相等、to不相等
    segments.add(50, 60, 7);
    expect(segments.toString()).toEqual("[[10,-1],[20,0],[30,-1],[40,0],[50,7],[60,0]]");

    // from相等、to不相等
    segments.add(60, 80, 11);
    expect(segments.toString()).toEqual("[[10,-1],[20,0],[30,-1],[40,0],[50,7],[60,11],[80,0]]");

  });
})

describe('IntensitySegments.set()', () => {
  it('set() case 1: 修改区间from在中间、to在中间', () => {
    const segments = new IntensitySegments();
    segments.add(10, 30, 1);
    expect(segments.toString()).toEqual("[[10,1],[30,0]]");
    segments.add(20, 40, 1);
    expect(segments.toString()).toEqual("[[10,1],[20,2],[30,1],[40,0]]");
    segments.add(10, 40, -2);
    expect(segments.toString()).toEqual("[[10,-1],[20,0],[30,-1],[40,0]]");

    // from不相等、to不相等
    segments.set(25, 28, 3);
    expect(segments.toString()).toEqual("[[10,-1],[20,0],[25,3],[28,0],[30,-1],[40,0]]");

    // from不相等、to相等
    segments.set(15, 25, 4);
    expect(segments.toString()).toEqual("[[10,-1],[15,4],[25,3],[28,0],[30,-1],[40,0]]");

    // from相等、to不相等
    segments.set(25, 35, -4);
    expect(segments.toString()).toEqual("[[10,-1],[15,4],[25,-4],[35,-1],[40,0]]");

    // from相等、to相等
    segments.set(15, 35, 10);
    expect(segments.toString()).toEqual("[[10,-1],[15,10],[35,-1],[40,0]]");
  });


  it('set() case 2: 修改区间from在左侧、to在中间', () => {
    const segments = new IntensitySegments();
    segments.add(10, 30, 1);
    expect(segments.toString()).toEqual("[[10,1],[30,0]]");
    segments.add(20, 40, 1);
    expect(segments.toString()).toEqual("[[10,1],[20,2],[30,1],[40,0]]");
    segments.add(10, 40, -2);
    expect(segments.toString()).toEqual("[[10,-1],[20,0],[30,-1],[40,0]]");

    // from不相等、to不相等
    segments.set(-25, 15, 3);
    expect(segments.toString()).toEqual("[[-25,3],[15,-1],[20,0],[30,-1],[40,0]]");

    // from不相等、to相等
    segments.set(-35, 15, 4);
    expect(segments.toString()).toEqual("[[-35,4],[15,-1],[20,0],[30,-1],[40,0]]");

    // from相等、to不相等
    segments.set(-35, 17, -4);
    expect(segments.toString()).toEqual("[[-35,-4],[17,-1],[20,0],[30,-1],[40,0]]");

    // from相等、to相等
    segments.set(-35, 20, 10);
    expect(segments.toString()).toEqual("[[-35,10],[20,0],[30,-1],[40,0]]");
  });

  it('set() case 3.1: 修改区间from在左侧、to在右侧', () => {
    const segments = new IntensitySegments();
    segments.add(10, 30, 1);
    expect(segments.toString()).toEqual("[[10,1],[30,0]]");
    segments.add(20, 40, 1);
    expect(segments.toString()).toEqual("[[10,1],[20,2],[30,1],[40,0]]");
    segments.add(10, 40, -2);
    expect(segments.toString()).toEqual("[[10,-1],[20,0],[30,-1],[40,0]]");

    // from不相等、to不相等
    segments.set(-10, 50, 3);
    expect(segments.toString()).toEqual("[[-10,3],[50,0]]");

    // // from不相等、to相等
    // segments.set(15, 25, 4);
    // expect(segments.toString()).toEqual("[[10,-1],[15,4],[25,3],[28,0],[30,-1],[40,0]]");

    // // from相等、to不相等
    // segments.set(25, 35, -4);
    // expect(segments.toString()).toEqual("[[10,-1],[15,4],[25,-4],[35,-1],[40,0]]");

    // // from相等、to相等
    // segments.set(15, 35, 10);
    // expect(segments.toString()).toEqual("[[10,-1],[15,10],[35,-1],[40,0]]");
  });

  it('set() case 3.2: 修改区间from在左侧、to在右侧', () => {
    const segments = new IntensitySegments();
    segments.add(10, 30, 1);
    expect(segments.toString()).toEqual("[[10,1],[30,0]]");
    segments.add(20, 40, 1);
    expect(segments.toString()).toEqual("[[10,1],[20,2],[30,1],[40,0]]");
    segments.add(10, 40, -2);
    expect(segments.toString()).toEqual("[[10,-1],[20,0],[30,-1],[40,0]]");

    // from不相等、to相等
    segments.set(-10, 40, 4);
    expect(segments.toString()).toEqual("[[-10,4],[40,0]]");

    // // from相等、to不相等
    // segments.set(25, 35, -4);
    // expect(segments.toString()).toEqual("[[10,-1],[15,4],[25,-4],[35,-1],[40,0]]");

    // // from相等、to相等
    // segments.set(15, 35, 10);
    // expect(segments.toString()).toEqual("[[10,-1],[15,10],[35,-1],[40,0]]");
  });

  it('set() case 3.3: 修改区间from在左侧、to在右侧', () => {
    const segments = new IntensitySegments();
    segments.add(10, 30, 1);
    expect(segments.toString()).toEqual("[[10,1],[30,0]]");
    segments.add(20, 40, 1);
    expect(segments.toString()).toEqual("[[10,1],[20,2],[30,1],[40,0]]");
    segments.add(10, 40, -2);
    expect(segments.toString()).toEqual("[[10,-1],[20,0],[30,-1],[40,0]]");

    // from相等、to不相等
    segments.set(10, 50, -4);
    expect(segments.toString()).toEqual("[[10,-4],[50,0]]");

    // // from相等、to相等
    // segments.set(15, 35, 10);
    // expect(segments.toString()).toEqual("[[10,-1],[15,10],[35,-1],[40,0]]");
  });

  it('set() case 3.4: 修改区间from在左侧、to在右侧', () => {
    const segments = new IntensitySegments();
    segments.add(10, 30, 1);
    expect(segments.toString()).toEqual("[[10,1],[30,0]]");
    segments.add(20, 40, 1);
    expect(segments.toString()).toEqual("[[10,1],[20,2],[30,1],[40,0]]");
    segments.add(10, 40, -2);
    expect(segments.toString()).toEqual("[[10,-1],[20,0],[30,-1],[40,0]]");

    // from相等、to相等
    segments.set(10, 40, 10);
    expect(segments.toString()).toEqual("[[10,10],[40,0]]");
  });

  it('set() case 4: 修改区间from在左侧、to在左侧', () => {
    const segments = new IntensitySegments();
    segments.add(10, 30, 1);
    expect(segments.toString()).toEqual("[[10,1],[30,0]]");
    segments.add(20, 40, 1);
    expect(segments.toString()).toEqual("[[10,1],[20,2],[30,1],[40,0]]");
    segments.add(10, 40, -2);
    expect(segments.toString()).toEqual("[[10,-1],[20,0],[30,-1],[40,0]]");

    // from不相等、to不相等
    segments.set(-20, -10, 3);
    expect(segments.toString()).toEqual("[[-20,3],[-10,0],[10,-1],[20,0],[30,-1],[40,0]]");

    // from不相等、to相等
    segments.set(-30, -20, 4);
    expect(segments.toString()).toEqual("[[-30,4],[-20,3],[-10,0],[10,-1],[20,0],[30,-1],[40,0]]");
  });

  it('set() case 5: 修改区间from在右侧、to在右侧', () => {
    const segments = new IntensitySegments();
    segments.add(10, 30, 1);
    expect(segments.toString()).toEqual("[[10,1],[30,0]]");
    segments.add(20, 40, 1);
    expect(segments.toString()).toEqual("[[10,1],[20,2],[30,1],[40,0]]");
    segments.add(10, 40, -2);
    expect(segments.toString()).toEqual("[[10,-1],[20,0],[30,-1],[40,0]]");

    // from不相等、to不相等
    segments.set(50, 60, 3);
    expect(segments.toString()).toEqual("[[10,-1],[20,0],[30,-1],[40,0],[50,3],[60,0]]");

    // from相等、to不相等
    segments.set(60, 70, 4);
    expect(segments.toString()).toEqual("[[10,-1],[20,0],[30,-1],[40,0],[50,3],[60,4],[70,0]]");
  });
})