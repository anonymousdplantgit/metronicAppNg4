import { State } from "../state/state";
import { Type } from "../type/type";


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