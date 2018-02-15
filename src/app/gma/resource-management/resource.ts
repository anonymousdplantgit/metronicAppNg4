export class Resource {
    ressourceId: number;
    code: string;
    firstName: string;
    lastName: string;


    constructor(ressourceId: number, code: string,
         firstName: string,
        lastName: string){
       this.ressourceId = ressourceId;
       this.code = code;
       this.firstName = firstName;
       this.lastName = lastName; 
     }
}
