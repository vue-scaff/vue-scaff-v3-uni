/*
stepData[index] = {
          number: toothNumber, //牙齿编号
          index: index,
          lost: false, //是否缺失
          move: 0, //是否移动及移动类型：0=未移动，1=正常移动， 2=过矫治移动
          attachOn: 0, //是否上附件及附件类型：0=未上附件 1=楔形附件，2=椭圆形附件
          attachOff: 0, //是否下附件
          slice: 0, //是否片切以及片切值,片切数据是放在牙的index偏小的牙
        };

*/
class StepData {
  private _steps: any;
  private _tooths: any;
  private _stepCount = 40;

  //steps[步骤号][牙齿序号] =toothdData
  get steps() {
    return this._steps;
  }

  //tooths[牙齿序号][步骤号]=toothData
  get tooths() {
    return this._tooths;
  }

  get stepCount() {
    return this._stepCount;
  }

  loadData(json: any) {
    if (!json || !json.Step) {
      return this._loadMockStepData();
    }

    const attaches = json.Attach;
    const slices = json.SliceCut;
    const steps = json.Step;
    const autoSteps = steps.AutoStep;
    const tooths = json.Tooth;

    this._stepCount = autoSteps.StepNumber;

    this._steps = {};
    this._tooths = {};

    for (let stepIndex = 1; stepIndex <= this._stepCount; stepIndex++) {
      let stepData = {} as any;
      this._steps[stepIndex] = stepData;

      for (let toothIndex = 1; toothIndex <= 32; toothIndex++) {
        const lost = tooths[toothIndex].Status == 0;
        let move = 0;
        if (autoSteps[toothIndex] && autoSteps[toothIndex][stepIndex - 1])
          move = autoSteps[toothIndex][stepIndex - 1].Move;
        let slice = 0;
        if (slices && slices[toothIndex]) {
          let sliceStep = slices[toothIndex].StepS;
          if (sliceStep == 0) sliceStep = 1;
          if (sliceStep == stepIndex) slice = slices[toothIndex].CutValue;
        }
        let attachOn = 0,
          attachOff = 0;
        let attach =
          attaches && attaches[toothIndex] ? attaches[toothIndex] : null;
        if (attach && attach.length > 0) {
          attach.forEach((att) => {
            let startStep = att.StepS;
            if (startStep <= 1) startStep = 1;
            let endStep = att.StepE;
            // if (endStep >= this._stepCount) endStep = this._stepCount;
            attachOn = attachOn || startStep == stepIndex ? 1 : 0;
            attachOff = attachOff || endStep == stepIndex ? 1 : 0;
          });
        }

        let toothNumber: string = StepData.toothIndexToNumber(toothIndex);
        stepData[toothIndex] = {
          number: toothNumber, //牙齿编号
          index: toothIndex,
          lost, //是否缺失
          move, //是否移动及移动类型：0=未移动，1=正常移动， 2=过矫治移动
          attachOn, //是否上附件及附件类型：0=未上附件 1=楔形附件，2=椭圆形附件
          attachOff, //是否下附件
          slice, //是否片切以及片切值,片切数据是放在牙的index偏小的牙
        };
      }
    }

    this._generateTooths();
    //this._loadMockStepData();
  }

  isToothLost(index: number) {
    return this._steps[1][index].lost;
  }

  private _loadMockStepData() {
    this._steps = {};
    this._tooths = {};
    for (let i = 1; i <= this._stepCount; i++) {
      let stepData = {} as any;
      this._steps[i] = stepData;

      for (let index = 1; index <= 32; index++) {
        let toothNumber: string = StepData.toothIndexToNumber(index);
        stepData[index] = {
          number: toothNumber, //牙齿编号
          index: index,
          lost: false, //是否缺失
          move: 0, //是否移动及移动类型：0=未移动，1=正常移动， 2=过矫治移动
          attachOn: 0, //是否上附件及附件类型：0=未上附件 1=楔形附件，2=椭圆形附件
          attachOff: 0, //是否下附件
          slice: 0, //是否片切以及片切值,片切数据是放在牙的index偏小的牙
        };
      }
    }

    //设置丢失牙齿
    this._setToothLost("1.8");
    this._setToothLost("2.8");
    this._setToothLost("3.8");
    this._setToothLost("3.7");
    this._setToothLost("4.8");

    //设置普通移动
    for (let index = 4; index <= 13; index++) {
      this._setToothMove(index, 1, 18, 1);
    }

    for (let index = 20; index <= 29; index++) {
      this._setToothMove(index, 1, 18, 1);
    }

    //设置过矫治移动
    for (let index = 6; index <= 11; index++) {
      this._setToothMove(index, 19, 21, 2);
    }
    for (let index = 22; index <= 27; index++) {
      this._setToothMove(index, 19, 21, 2);
    }

    //设置上下附件
    this._attachOnTooth("1.5", 4, 1);
    this._attachOnTooth("1.4", 4, 1);
    this._attachOnTooth("1.3", 4, 1);
    this._attachOnTooth("1.1", 4, 1);
    this._attachOnTooth("2.1", 4, 1);
    this._attachOnTooth("2.4", 4, 1);
    this._attachOffTooth("1.5", 21);
    this._attachOffTooth("1.4", 21);
    this._attachOffTooth("1.3", 21);
    this._attachOffTooth("1.1", 21);
    this._attachOffTooth("2.1", 21);
    this._attachOffTooth("2.4", 21);

    //添加片切
    this._addSlice(4, "1.4", 0.2);
    this._addSlice(4, "1.3", 0.2);
    this._addSlice(4, "1.2", 0.2);

    this._addSlice(4, "2.1", 0.2);
    this._addSlice(4, "2.2", 0.2);
    this._addSlice(4, "2.3", 0.2);

    this._addSlice(4, "3.4", 0.5);
    this._addSlice(4, "3.3", 0.5);
    this._addSlice(4, "3.2", 0.5);

    this._addSlice(4, "4.1", 0.5);
    this._addSlice(4, "4.2", 0.5);
    this._addSlice(4, "4.3", 0.5);
    this._addSlice(4, "4.4", 0.3);
    this._addSlice(4, "4.5", 0.2);

    this._addSlice(16, "1.1", 0.2);
    this._addSlice(10, "3.1", 0.5);

    this._generateTooths();
  }

  private _generateTooths() {
    //生成tooths数组
    const stepIndexes = Object.keys(this._steps);
    stepIndexes.forEach((stepIndex) => {
      const step = this._steps[stepIndex],
        toothIndexs = Object.keys(step);
      toothIndexs.forEach((toothIndex) => {
        const toothData = step[toothIndex];
        if (!this._tooths[toothIndex]) this._tooths[toothIndex] = {};
        this._tooths[toothIndex][stepIndex] = toothData;
      });
    });
  }

  //设置牙齿片切
  private _addSlice(step: number, number: string, slice: number) {
    let index = StepData.toothNumberToIndex(number);
    this._steps[step][index].slice = slice;
  }

  private _setToothLost(number: string) {
    let index = StepData.toothNumberToIndex(number);
    for (let step = 1; step <= this._stepCount; step++) {
      this._steps[step][index].lost = true;
    }
  }

  //设置牙齿上附件
  private _attachOnTooth(number: string, step: number, attachType: number) {
    let index = StepData.toothNumberToIndex(number);
    this._steps[step][index].attachOn = attachType;
  }

  //设置牙齿下附件
  private _attachOffTooth(number: string, step: number) {
    let index = StepData.toothNumberToIndex(number);
    this._steps[step][index].attachOff = 1;
  }

  private _setToothMove(
    index: number,
    startStep: number,
    endStep: number,
    moveType: number
  ) {
    for (let step = startStep; step <= endStep; step++) {
      this._steps[step][index].move = moveType;
    }
  }

  private _setToothMove2(
    number: string,
    startStep: number,
    endStep: number,
    moveType: number
  ) {
    let index = StepData.toothNumberToIndex(number);
    for (let step = startStep; step <= endStep; step++) {
      this._steps[step][index].move = moveType;
    }
  }

  static toothNumberToIndex(number: string): number {
    let no = Number(number);
    let result = 0;
    if (no >= 1.1 && no <= 1.8) {
      result = Math.round(9 - no * 10 + 10);
    } else if (no >= 2.1 && no <= 2.8) {
      result = Math.round(no * 10 - 20 + 8);
    } else if (no >= 3.1 && no <= 3.8) {
      result = Math.round(25 - no * 10 + 30);
    } else if (no >= 4.1 && no <= 4.8) {
      result = no * 10 - 40 + 24;
    }

    // console.log(number, result);
    return result;
  }

  static toothIndexToNumber(index: number, withDot: boolean = true): string {
    let dot = withDot ? "." : "";
    if (index >= 1 && index <= 8) {
      return `1${dot}${9 - index}`;
    } else if (index >= 9 && index <= 16) {
      return `2${dot}${index - 8}`;
    } else if (index >= 17 && index <= 24) {
      return `3${dot}${25 - index}`;
    } else if (index >= 25 && index <= 32) {
      return `4${dot}${index - 24}`;
    }

    return "";
  }
}

export default StepData;
