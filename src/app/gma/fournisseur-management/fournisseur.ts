
export class Fournisseur {
 
  fournisseurId: number;
  nom: string;
  prenom: string;
  phone: string;
  adresse : string;
   
    constructor(fournisseurId: number, nom: string, prenom: string, phone: string,adresse: string){
      this.fournisseurId = fournisseurId;
      this.nom =nom;
      this.prenom = prenom;
      this.phone = phone; 
      this.adresse = adresse;
    }
   
  }