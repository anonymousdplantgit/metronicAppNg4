export class Type {
  typeId: number;
    code: string;
    label: string;


    constructor(typeId: number, code: string,
      label: string){
       this.typeId = typeId;
       this.code = code;
       this.label = label; 
     }
}
