import { Categorie } from "../categorie/categorie";

export class Product {
    produitId: number;
    ref: string;
    label: string;
    description: string;
    prixAchat: number;
    prixVente: number; 
    categorie: Categorie;  
    constructor(produitId: number, ref: string, label: string,
       description: string,prixAchat : number,prixVente:number,categorie: Categorie
       ){
      this.produitId = produitId;
      this.ref = ref;
      this.label = label;
      this.description = description;
      this.prixAchat = prixAchat;
      this.prixVente = prixVente;
      this.categorie = categorie;

    }
   
  }