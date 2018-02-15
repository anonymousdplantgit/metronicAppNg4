
export class Categorie {
 
  categorieId: number;
  ref: string;
  label: string;
  description: string;
   
    constructor(categorieId: number, ref: string, label: string, description: string){
      this.categorieId = categorieId;
      this.ref = ref;
      this.label = label;
      this.description = description;
    }
   
  }