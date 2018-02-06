
import { Component, OnInit,ViewChild  } from '@angular/core';
import { State } from '../state';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppComponent } from '../../app.component';
import { StateService } from '../state.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-state-management',
  templateUrl: './state-management.component.html',
  styleUrls: ['./state-management.component.css'],
  providers: [StateService,ToastrService]
})
export class StateManagementComponent implements OnInit {

  public state: State;
  form: FormGroup;
  public states: State[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restService: StateService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    //this.toastrService.overlayContainer = this.toastContainer;
    this.getAll();


    this.form = new FormGroup({
      stateId : new FormControl(),
      code: new FormControl(null, Validators.required),
      label: new FormControl(null, Validators.required)
    });
  }
  ngOnDestroy(): void {
  }

  onSubmit() {
    if (this.form.valid) {
        let element: State = new State(
          this.form.controls['stateId'].value,
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
        this.states = elements;
        console.log(elements);
        this.spinnerService.hide();
      },
      err => {
        this.toastrService.error(err, 'Error loading Data :', {timeOut: 3000,})
        console.log(err);
      }
 
    );
    
  }
 
  delete(element: State) {
    if (element) {
      this.restService.deleteById(element.stateId).subscribe(
        res => { 
          this.getAll();
          console.log('delete State '+ element.stateId+' done');
          this.toastrService.success("DELETED", '', {timeOut: 3000,})
        },
        error =>  {
           console.log(error);
           this.toastrService.error(error, '', {timeOut: 3000,});
         }
      );
    }
  }
  
  edit(element: State) {
    console.log(element);
    this.form.patchValue({
      stateId: element.stateId,
      code: element.code,
      label: element.label
  });
  
  }
  reset() {
    this.form.reset();
 
  }

}
