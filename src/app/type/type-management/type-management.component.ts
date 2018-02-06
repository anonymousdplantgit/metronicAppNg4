
import { Component, OnInit,ViewChild  } from '@angular/core';
import { Type } from '../type';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppComponent } from '../../app.component';
import { TypeService } from '../type.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-type-management',
  templateUrl: './type-management.component.html',
  styleUrls: ['./type-management.component.css'],
  providers: [TypeService,ToastrService]
})
export class TypeManagementComponent implements OnInit {

  public type: Type;
  form: FormGroup;
  public types: Type[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restService: TypeService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    //this.toastrService.overlayContainer = this.toastContainer;
    this.getAll();


    this.form = new FormGroup({
      typeId : new FormControl(),
      code: new FormControl(null, Validators.required),
      label: new FormControl(null, Validators.required)
    });
  }
  ngOnDestroy(): void {
  }

  onSubmit() {
    if (this.form.valid) {
        let element: Type = new Type(
          this.form.controls['typeId'].value,
          this.form.controls['code'].value,
          this.form.controls['label'].value);
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
        this.types = elements;
        console.log(elements);
        this.spinnerService.hide();
      },
      err => {
        this.toastrService.error(err, 'Error loading Data :', {timeOut: 3000,})
        console.log(err);
      }
 
    );
    
  }
 
  delete(element: Type) {
    if (element) {
      this.restService.deleteById(element.typeId).subscribe(
        res => { 
          this.getAll();
          console.log('delete Type '+ element.typeId+' done');
          this.toastrService.success("DELETED", '', {timeOut: 3000,})
        },
        error =>  {
           console.log(error);
           this.toastrService.error(error, '', {timeOut: 3000,});
         }
      );
    }
  }
  
  edit(element: Type) {
    console.log(element);
    this.form.patchValue({
      typeId: element.typeId,
      code: element.code,
      label: element.label
  });
  
  }
  reset() {
    this.form.reset();
 
  }

}
