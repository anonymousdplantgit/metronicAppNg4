import { WorkOrder } from "./work-order";


export class Task {
 
  taskId: number;
  label: string;
  taskDate: any;
  cost: number;
  workorder: WorkOrder;
   
    constructor(taskId: number,label: string, taskDate: any, cost: number, workorder: WorkOrder){
      this.taskId = taskId;
      this.label = label;
      this.taskDate = taskDate;
      this.cost = cost;
      this.workorder = workorder;
    }
   
  }