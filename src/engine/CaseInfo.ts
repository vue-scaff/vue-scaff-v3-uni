//import PlanInfo from "./PlanInfo";
//为了支持小程序初始页面加载，这里不要import其它文件,避免导致引入three

import axios from "axios";
import StepData from "./StepData";

class CaseInfo {
  approved: boolean;
  orderId: number;
  orderNo: string;
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  doctorImageUrl: string;
  designId: number;
  designNo: string;
  pictures: string[];
  xrayImages: string[];
  planList: any[];
  treatmentDetails: string;
  authorInfo: any;

  constructor() {
    this.pictures = [];
    this.xrayImages = [];
  }

  async loadCase(data: any, callback: Function) {
    this.planList = data.planList
    return new Promise((resolve, reject) => {
      let keys = Object.keys(data);
      keys.forEach((key) => {
        this[key] = data[key];
      });

      //调整planlist
      if (this.planList) {
        let index = 0;
        let newPlanList = [];
        this.planList.forEach(async (design: any) => {
          //   let targetPlan = new PlanInfo(this);
          //   Object.assign(targetPlan, design);
          //test, for local debuging
          if (design.ossFiles) {
            design.ossFiles.forEach((ossFile) => {
              if (ossFile.url.indexOf("http://localhost") < 0) {
                ossFile.url = ossFile.url.replace("http://", "https://");
              }
            });
          }
          await this._loadPlanBrief(design, callback);
          //targetPlan.loadDesignBrief();
          newPlanList.push(design);

          index++;
          if (index == this.planList.length) {
            this.planList = newPlanList;
            //sort
            this.planList.sort(function (a, b) {
              if (a.name <= b.name) return 1;
              else return -1;
            });
            resolve(this);
          }
        });
      }
    });
  }

  getPlan(version: number) {
    if (this.planList) {
      return this.planList.find((design: any) => design.version == version);
    }
  }

  private async _loadPlanBrief(plan: any, callback: Function) {
    let fromFullJson = false;
    let planFile = plan.ossFiles.find(
      (file: any) => file.fileName == "plan_brief.json"
    );
    if (!planFile) {
      console.log("no plan_brief.json, will read from plan.json");
      fromFullJson = true;
      planFile = plan.ossFiles.find(
        (file: any) => file.fileName == "plan.json"
      );
    }

    // let planData = await axios({
    //   url: planFile.url,
    //   method: "get",
    //   responseType: "json",
    // });
    let planData = await callback(planFile.url)
    if (fromFullJson) {
      plan.planData = planData.data;
    }

    this._generateDesignDetail(plan, planData);
  }

  private _generateDesignDetail(plan: any, planData: any) {
    const attachDatas = planData["Attach"];
    const sliceDatas = planData["SliceCut"];
    let steps = {};

    if (sliceDatas) {
      const sliceToothIndexs = Object.keys(sliceDatas);
      sliceToothIndexs.sort();
      sliceToothIndexs.forEach((indexStr) => {
        const toothIndex = Number(indexStr);
        const toothNumber = StepData.toothIndexToNumber(toothIndex);
        const slice = sliceDatas[indexStr];
        let stepIndex = Number(slice["StepS"]);
        if (stepIndex == 0) stepIndex = 1;
        if (!steps[stepIndex]) {
          steps[stepIndex] = {};
        }
        const step = steps[stepIndex];
        if (!step[toothIndex]) {
          step[toothIndex] = { index: toothIndex, number: toothNumber };
        }

        const tooth = step[toothIndex];
        tooth.slice = slice["CutValue"];
      });
    }

    if (attachDatas) {
      const attachToothIndexs = Object.keys(attachDatas);
      attachToothIndexs.sort();
      attachToothIndexs.forEach((indexStr) => {
        const toothIndex = Number(indexStr);
        const toothNumber = StepData.toothIndexToNumber(toothIndex);
        const toothAttachs = attachDatas[toothIndex];
        toothAttachs.forEach((toothAttach) => {
          let stepIndex = Number(toothAttach["StepS"]);
          if (stepIndex == 0) {
            stepIndex = 1;
          }
          if (!steps[stepIndex]) {
            steps[stepIndex] = {};
          }
          let step = steps[stepIndex];
          if (!step[toothIndex]) {
            step[toothIndex] = { index: toothIndex, number: toothNumber };
          }
          let tooth = step[toothIndex];
          tooth.attachOn = 1;

          stepIndex = Number(toothAttach["StepE"]);
          if (stepIndex < 1000) {
            if (!steps[stepIndex]) {
              steps[stepIndex] = {};
            }
            step = steps[stepIndex];
            if (!step[toothIndex]) {
              step[toothIndex] = { index: toothIndex, number: toothNumber };
            }
            tooth = step[toothIndex];
            tooth.attachOff = 1;
          }
        });
      });
    }

    this._updateDesignDetail(plan, steps);
  }

  private _updateDesignDetail(plan: any, steps: any) {
    let attachInfo = "";
    let sliceInfo = "";
    const stepIndexes = Object.keys(steps);
    stepIndexes.forEach((stepIndex) => {
      const step = steps[stepIndex];
      const toothIndexs = Object.keys(step);
      let onCount = 0;
      let onTooths = "";
      let offCount = 0;
      let offTooths = "";
      let sliceCount = 0;
      let sliceTooths = "";
      toothIndexs.forEach((toothIndexStr) => {
        let toothIndex = Number(toothIndexStr);
        let toothNumber = StepData.toothIndexToNumber(toothIndex, false);
        const tooth = step[toothIndex];
        if (tooth.attachOn == 1) {
          onTooths += `${toothNumber},`;
          onCount++;
        } else if (tooth.attachOff == 1) {
          offCount++;
          offTooths += `${toothNumber},`;
        }

        if (tooth.slice > 0) {
          sliceCount++;
          let nextToothNumber = StepData.toothIndexToNumber(
            toothIndex + 1,
            false
          );
          sliceTooths += `${toothNumber}-${nextToothNumber},`;
        }
      });

      if (sliceCount > 0) {
        sliceInfo += `\nS${stepIndex}前: 新增${sliceCount}个片切 (${sliceTooths.substring(
          0,
          sliceTooths.length - 1
        )})`;
      }

      if (onCount > 0) {
        attachInfo += `\nS${stepIndex}前：新增${onCount}个附件 (${onTooths.substring(
          0,
          onTooths.length - 1
        )})`;
      }
      if (offCount > 0) {
        attachInfo += `\nS${stepIndex}前：去除${offCount}个附件 (${offTooths.substring(
          0,
          offTooths.length - 1
        )})`;
      }
    });

    if (attachInfo == "") attachInfo = "无";
    if (sliceInfo == "") sliceInfo = "无";
    if (this.treatmentDetails) {
      plan.designDetail = `${this.treatmentDetails}\n片切情况:${sliceInfo}\n\n附件情况: ${attachInfo}`;
    } else {
      plan.designDetail = `片切情况: ${sliceInfo}\n\n附件情况: ${attachInfo}`;
    }
  }
}

export default CaseInfo;
