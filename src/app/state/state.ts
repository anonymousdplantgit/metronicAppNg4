export class State {
  stateId: number;
    code: string;
    label: string;


    constructor(stateId: number, code: string,
      label: string){
       this.stateId = stateId;
       this.code = code;
       this.label = label; 
     }
}
