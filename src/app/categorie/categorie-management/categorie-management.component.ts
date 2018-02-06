import { Component, OnInit,ViewChild  } from '@angular/core';
import { Categorie } from '../categorie';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppComponent } from '../../app.component';
import { CategorieService } from '../categorie.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-categorie-management',
  templateUrl: './categorie-management.component.html',
  styleUrls: ['./categorie-management.component.css'],
  providers: [CategorieService,ToastrService]
})
export class CategorieManagementComponent implements OnInit {

  //@ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
 
  public categorie: Categorie;
  form: FormGroup;
  message:string;
  public categories: Categorie[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restService: CategorieService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    //this.toastrService.overlayContainer = this.toastContainer;
    this.getAll();


    this.form = new FormGroup({
      categorieId : new FormControl(),
      ref: new FormControl(null, Validators.required),
      label: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      message : new FormControl()
    });
  }
  ngOnDestroy(): void {
  }

  onSubmit() {
    if (this.form.valid) {
        let element: Categorie = new Categorie(
          this.form.controls['categorieId'].value,
          this.form.controls['ref'].value,
          this.form.controls['label'].value,
          this.form.controls['description'].value);
        this.restService.save(element).subscribe(
          response =>  this.toastrService.success('SAVED', ''),
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
        this.categories = elements;
        console.log(elements);
        this.spinnerService.hide();
      },
      err => {
        this.toastrService.error(err, 'Error loading Data :', {timeOut: 3000,})
        console.log(err);
      }
 
    );
    
  }
 
  delete(element: Categorie) {
    if (element) {
      this.restService.deleteById(element.categorieId).subscribe(
        res => { 
          this.getAll();
          console.log('delete Categorie '+ element.categorieId+' done');
          this.toastrService.success("DELETED", '', {timeOut: 3000,})
        },
        error =>  {
           console.log(error);
           this.toastrService.error(error, '', {timeOut: 3000,});
         }
      );
    }
  }
  
  edit(element: Categorie) {
    console.log(element);
    this.form.patchValue({
      categorieId: element.categorieId,
      ref: element.ref,
      label: element.label,
      description: element.description
  });
  
  }
  reset() {
    this.form.reset();
 
  }

}