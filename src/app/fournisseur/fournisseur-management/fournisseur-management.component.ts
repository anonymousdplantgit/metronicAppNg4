import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../fournisseur';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppComponent } from '../../app.component';
import { FournisseurService } from '../fournisseur.service';

@Component({
  selector: 'app-fournisseur-management',
  templateUrl: './fournisseur-management.component.html',
  styleUrls: ['./fournisseur-management.component.css'],
  providers: [FournisseurService]
})
export class FournisseurManagementComponent implements OnInit {

  public fournisseur: Fournisseur;
  form: FormGroup;
  message:string;
  public fournisseurs: Fournisseur[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restService: FournisseurService,
    private spinnerService: Ng4LoadingSpinnerService, 
    private app: AppComponent) { }

  ngOnInit() {

    this.getAll();


    this.form = new FormGroup({
      fournisseurId : new FormControl(),
      nom: new FormControl(null, Validators.required),
      prenom: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      adresse: new FormControl(null, Validators.required),
      message : new FormControl()
    });
  }
  ngOnDestroy(): void {
  }

  onSubmit() {
    if (this.form.valid) {
        let element: Fournisseur = new Fournisseur(
          this.form.controls['fournisseurId'].value,
          this.form.controls['nom'].value,
          this.form.controls['prenom'].value,
          this.form.controls['phone'].value,
          this.form.controls['adresse'].value);
        this.restService.save(element).subscribe(
          response =>this.message="Added",
          error =>  this.message = <any>error);

      }
      this.reset();
      this.getAll();
}
  getAll() {
    this.spinnerService.show();
    this.restService.findAll().subscribe(
      elements => {
        this.fournisseurs = elements;
        console.log(elements);
        this.spinnerService.hide();
      },
      err => {
        this.message="Error loading Data : "+err;
        console.log(err);
      }
 
    );
    
  }
 
  delete(element: Fournisseur) {
    if (element) {
      this.restService.deleteById(element.fournisseurId).subscribe(
        res => {
          this.getAll();
          console.log('delete Categorie '+ element.fournisseurId+' done');
          this.message="Deleted successfully";
        },
        error =>  this.message = <any>error
      );
    }
  }
  
  edit(element: Fournisseur) {
    console.log(element);
    this.form.patchValue({
      fournisseurId: element.fournisseurId,
      nom: element.nom,
      prenom: element.prenom,
      phone: element.phone,
      adresse:element.adresse
  });
  
  }
  reset() {
    this.form.reset();
 
  }

}