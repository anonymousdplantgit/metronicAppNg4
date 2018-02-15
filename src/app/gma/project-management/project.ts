import { Type } from "../type-management/type";
import { State } from "../state-management/state";



export class Project {
 
  projectId: number;
  code: string;
  label: string;
  state: State;
  type: Type;
   
    constructor(projectId: number, code: string, label: string,type: Type, state: State){
      this.projectId = projectId;
      this.code = code;
      this.label = label;
      this.type = type;
      this.state = state;
    }
   
  }