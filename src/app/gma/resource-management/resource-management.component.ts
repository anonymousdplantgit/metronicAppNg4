
import { Component, OnInit,ViewChild  } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppComponent } from '../../app.component';
import { ToastrService } from 'ngx-toastr';
import { ResourceService } from './resource.service';
import { Resource } from './resource';

@Component({
  selector: 'app-resource-management',
  templateUrl: './resource-management.component.html',
  styleUrls: ['./resource-management.component.css'],
  providers: [ResourceService,ToastrService]
})
export class ResourceManagementComponent implements OnInit {

  public resource: Resource;
  form: FormGroup;
  public resources: Resource[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restService: ResourceService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    //this.toastrService.overlayContainer = this.toastContainer;
    this.getAll();


    this.form = new FormGroup({
      ressourceId : new FormControl(),
      code: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required)
    });
  }
  ngOnDestroy(): void {
  }

  onSubmit() {
    if (this.form.valid) {
        let element: Resource = new Resource(
          this.form.controls['ressourceId'].value,
          this.form.controls['code'].value,
          this.form.controls['firstName'].value,
          this.form.controls['lastName'].value);
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
        this.resources = elements;
        console.log(elements);
        this.spinnerService.hide();
      },
      err => {
        this.toastrService.error(err, 'Error loading Data :', {timeOut: 3000,})
        console.log(err);
      }
 
    );
    
  }
 
  delete(element: Resource) {
    if (element) {
      this.restService.deleteById(element.ressourceId).subscribe(
        res => { 
          this.getAll();
          console.log('delete Resource '+ element.ressourceId+' done');
          this.toastrService.success("DELETED", '', {timeOut: 3000,})
        },
        error =>  {
           console.log(error);
           this.toastrService.error(error, '', {timeOut: 3000,});
         }
      );
    }
  }
  
  edit(element: Resource) {
    console.log(element);
    this.form.patchValue({
      ressourceId: element.ressourceId,
      code: element.code,
      firstName: element.firstName,
      lastName: element.lastName
  });
  
  }
  reset() {
    this.form.reset();
 
  }

}
