import { Component, OnInit,ViewChild  } from '@angular/core';
import { Project } from '../project';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppComponent } from '../../app.component';
import { ProjectService } from '../project.service';
import { ToastrService } from 'ngx-toastr';

import { State } from '../../state/state';
import { TypeService } from '../../type/type.service';
import { StateService } from '../../state/state.service';
import { Type } from '../../type/type';


@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css'],
  providers: [ProjectService,ToastrService,TypeService,StateService]
})
export class ProjectManagementComponent implements OnInit {

  //@ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
 
  public project: Project;
  form: FormGroup;
  public projects: Project[];
  public types: Type[];
  public states: State[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restService: ProjectService,
    private typeService: TypeService,
    private stateService: StateService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastrService: ToastrService) { }

  ngOnInit() {

    this.getAll();


    this.form = new FormGroup({
      projectId : new FormControl(),
      code: new FormControl(null, Validators.required),
      label: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required)
    });
  }
  ngOnDestroy(): void {
  }

  onSubmit() {
    if (this.form.valid) {
        let element: Project = new Project(
          this.form.controls['projectId'].value,
          this.form.controls['code'].value,
          this.form.controls['label'].value,
          this.form.controls['type'].value,
          this.form.controls['state'].value);
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
    this.getTypes();
    this.getStates();
    this.restService.findAll().subscribe(
      elements => {
        this.projects = elements;
        console.log(elements);
        this.spinnerService.hide();
      },
      err => {
        this.toastrService.error(err, 'Error loading Data :', {timeOut: 3000,})
        console.log(err);
      }
 
    );
    
  }
 
  delete(element: Project) {
    if (element) {
      this.restService.deleteById(element.projectId).subscribe(
        res => { 
          this.getAll();
          console.log('delete Project '+ element.projectId+' done');
          this.toastrService.success("DELETED", '', {timeOut: 3000,})
        },
        error =>  {
           console.log(error);
           this.toastrService.error(error, '', {timeOut: 3000,});
         }
      );
    }
  }
  
  edit(element: Project) {
    console.log(element);
    this.form.patchValue({
      projectId: element.projectId,
      code: element.code,
      label: element.label,
      type: element.type,
      state: element.state
  });
  
  }
  reset() {
    this.form.reset();
 
  }

  getStates(){
    this.stateService.findAll().subscribe(
      states => {
        this.states = states;
        console.log(states);
      },
      err => {
        this.toastrService.error(err, 'Error loading Data :', {timeOut: 3000,})
        console.log(err);
      } 
    );
  }

  getTypes(){
    this.typeService.findAll().subscribe(
      types => {
        this.types = types;
        console.log(types);
      },
      err => {
        this.toastrService.error(err, 'Error loading Data :', {timeOut: 3000,})
        console.log(err);
      } 
    );
  }

  redirectTaskManagementPage(project : Project){
    if (project) {
      this.router.navigate(['project/manage/', project.projectId]);
    }
  }

}