import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../fournisseur';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppComponent } from '../../app.component';
import { FournisseurService } from '../fournisseur.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fournisseur-management',
  templateUrl: './fournisseur-management.component.html',
  styleUrls: ['./fournisseur-management.component.css'],
  providers: [FournisseurService,ToastrService]
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
    private toastrService: ToastrService) { }

  ngOnInit() {

    this.getAll();


    this.form = new FormGroup({
      fournisseurId : new FormControl(),
      nom: new FormControl(null, Validators.required),
      prenom: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      adresse: new FormControl(null, Validators.required)
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
          response =>  this.toastrService.success('Saved with success', ''),
          error =>  this.toastrService.error(error, '', {timeOut: 3000,})
        );

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
        this.toastrService.error(err, 'Error loading Data :', {timeOut: 3000,})
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
          this.toastrService.success("Deleted successfully", '', {timeOut: 3000,})
        },
        error => {
          console.log(error);
          this.toastrService.error(error, '', {timeOut: 3000,});
        }
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