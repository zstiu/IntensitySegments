export class IntensitySegments {
    // 存储有强度变化的所有节点(从小到大严格排序)
    private numberNodelist: number[][] = [];

    private checkParams(from: number, to: number, amount: number): boolean {
        let isRightParams = true;

        if (from >= to) {
            isRightParams = false;
        }

        return isRightParams;
    }

    /**
     * 找到要改变强度范围的起止点在当前强度节点列表中的位置
     * 并标明是否有重叠节点
     * @param from 
     * @param to 
     * @returns 
     */
    private findIndexInNode(from: number, to: number): {
        fromIndex: number,
        toIndex: number,
        fromIsSameNumber: boolean,
        toIsSameNumber: boolean,
    } {
        const result: {
            fromIndex: number,
            toIndex: number,
            fromIsSameNumber: boolean,
            toIsSameNumber: boolean,
        } = {
            fromIndex: 0,
            toIndex: this.numberNodelist.length,
            fromIsSameNumber: false,
            toIsSameNumber: false,
        }

        // 用于标明from的节点位置已经找到，下次loop可以跳过
        let fromBreaked = false;

        for (let index = 0; index < this.numberNodelist.length; index++) {
            const numberNode = this.numberNodelist[index];

            if(!fromBreaked) {
                if(from <= numberNode[0]) {
                    result.fromIndex = index;

                    if(from === numberNode[0]) {
                        result.fromIsSameNumber = true;
                    }

                    fromBreaked = true;
                } else if(index === this.numberNodelist.length - 1) {
                    // 处理from比最大值更大的边界情况
                    result.fromIndex = index + 1;
                }
            }

            if(to <= numberNode[0]) {
                result.toIndex = index;
                result.toIsSameNumber = to === numberNode[0];

                break;
            }
        }

        return result
    }

    add(from: number, to: number, amount: number): void {

        if(!this.checkParams(from, to, amount)) {
            return;
        }

        let {
            fromIndex,
            toIndex,
            fromIsSameNumber,
            toIsSameNumber,
        } = this.findIndexInNode(from, to);

        // 找到起止节点位置之后，将位置之内的节点都增加强度
        // 左侧要用原强度+强度amount，右侧要保留原强度
        // 左侧节点位置重叠时，要用重叠节点的强度值为原强度值
        // 右侧节点位置重叠时，直接保留原节点
        this.numberNodelist = [
            ...this.numberNodelist.slice(
                0,
                fromIndex
            ),
            [from, (this.numberNodelist[fromIsSameNumber ? fromIndex : fromIndex - 1]?.[1] || 0) + amount],
            ...(this.numberNodelist.slice(fromIndex, toIndex).map(numberNode => {
                return [numberNode[0], numberNode[1] + amount]
            })),
            ...(toIsSameNumber ? [] : [[to, (this.numberNodelist[toIndex - 1]?.[1] || 0)]]),
            ...this.numberNodelist.slice(
                toIndex, this.numberNodelist.length
            )
        ];

    }

    set(from: number, to: number, amount: number): void {

        if(!this.checkParams(from, to, amount)) {
            return;
        }

        let {
            fromIndex,
            toIndex,
            fromIsSameNumber,
            toIsSameNumber
        } = this.findIndexInNode(from, to);

        // 找到起止节点位置之后，将位置之内的节点都设置成新强度
        // 左侧直接改成新强度amount，右侧要保留原强度
        // 左侧节点位置重叠时，直接舍弃掉原节点
        // 右侧节点位置重叠时，直接保留原节点
        this.numberNodelist = [
            ...this.numberNodelist.slice(
                0,
                fromIndex
            ),
            [from, amount],
            ...(
                toIsSameNumber ? 
                [] :
                [
                    [to, this.numberNodelist[toIndex - 1]?.[1] || 0]
                ]),
            ...this.numberNodelist.slice(toIndex, this.numberNodelist.length)
        ];
    }

    toString(): string {
        let preArr: number[] = [];
        const nodeListString = this.numberNodelist.reduce((pre, cur, curIndex) => {
            // 这里处理相邻节点的强度值一样的情况，这种直接舍弃掉后面的节点
            if(cur[1] === preArr[1]) {
                return pre;
            }

            // 这里处理边界最小节点强度为0的情况，直接舍弃掉
            if(!pre && cur[1] === 0) {
                return pre;
            }
            preArr = cur;
            return pre + `${curIndex === 0 ? '' : ' '}[${cur.toString()}]`;
        }, '')
        return `[${nodeListString.trim().replace(/\s/g, ',')}]`;
    }
}