import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppComponent } from '../../app.component';
import { DatePipe } from '@angular/common';
import { ProjectService } from '../project-management/project.service';
import { ToastrService } from 'ngx-toastr';
import { WorkOrderService } from './work-order.service';
import { TaskService } from './task.service';
import { ResourceService } from '../resource-management/resource.service';
import { Project } from '../project-management/project';
import { WorkOrder } from './work-order';
import { Task } from './task';
import { Resource } from '../resource-management/resource';

@Component({
  selector: 'app-project-task-management',
  templateUrl: './project-task-management.component.html',
  styleUrls: ['./project-task-management.component.css'],
  providers: [ProjectService,ToastrService,WorkOrderService,TaskService,ResourceService]
})
export class ProjectTaskManagementComponent implements OnInit {
  param : any;
  idProject : number;
  public  project : Project;
  public  workOrder : WorkOrder;
  public  workOrders : WorkOrder[];
  public  task : Task;
  public  tasks : Task[];
  public  resources : Resource[];
  formWo: FormGroup;
  formTask: FormGroup;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private workOrderService: WorkOrderService,
    private taskService: TaskService,
    private resourceService: ResourceService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastrService: ToastrService) { }
    byResourceId(item1: Resource, item2: Resource) : boolean{
      return item1 && item2 ?  item1.ressourceId === item2.ressourceId : item1 === item2;
    }
    getProject(){
      this.spinnerService.show();
      this.param = this.route.params.subscribe(params => {
        this.idProject = +params['id']; 
        });
        if(this.idProject){
          this.projectService.findById(this.idProject).subscribe( project =>{
            this.project = project;
            this.spinnerService.hide();
          } ,
          err => {
            this.toastrService.error(err, 'Error loading Data :', {timeOut: 3000,})
            console.log(err);
            this.spinnerService.hide();
          });
        }
    }

  ngOnInit() {
    
    this.getProject();
    this.getWorkOrders(this.idProject);

    this.formWo = new FormGroup({
      workorderId : new FormControl(),
      label: new FormControl(null, Validators.required),
      estimatedCost: new FormControl(null, [Validators.required, Validators.min(0)]),
      estimatedEndDate: new FormControl(null, Validators.required),
      ressource: new FormControl(null, Validators.required)
    });
    this.formWo.patchValue({ project: this.project,});
    
    this.formTask = new FormGroup({
      taskId : new FormControl(),
      label: new FormControl(null, Validators.required),
      taskDate: new FormControl(null, Validators.required),
      cost: new FormControl([Validators.required, Validators.min(0),Validators.max(1)]),
      workorder: new FormControl(null, Validators.required)
    });
   
  }

  onSubmitWo() {
    if (this.formWo.valid) {
        let element: WorkOrder = new WorkOrder(
          this.formWo.controls['workorderId'].value,
          this.formWo.controls['label'].value,
          this.formWo.controls['estimatedCost'].value,
          this.formWo.controls['estimatedEndDate'].value,
          this.project,
          this.formWo.controls['ressource'].value);
        this.workOrderService.save(element).subscribe(
          response =>  this.toastrService.success('SAVED', '', {timeOut: 3000,}),
          error =>  this.toastrService.error(error, '', {timeOut: 3000,})
        );

      }
      this.resetWo();
      this.getWorkOrders(this.idProject);

}

getWorkOrders(idProject: number){
  this.spinnerService.show();
  this.getResources();
  this.workOrderService.findByProject(idProject).subscribe(
    workOrders => {
      this.workOrders = workOrders;
      console.log(workOrders);
      this.spinnerService.hide();
    },
    err => {
      this.toastrService.error(err, 'Error loading Data :', {timeOut: 3000,})
      console.log(err);
      this.spinnerService.hide();
    } 
  );
}

deleteWo(workOrder: WorkOrder) {
  if (workOrder) {
    this.workOrderService.deleteById(workOrder.workorderId).subscribe(
      res => {
        this.getWorkOrders(this.idProject);
        console.log('delete workOrder '+ workOrder.workorderId+' done');
        this.toastrService.success("DELETED", '', {timeOut: 3000,})
      },
      error =>  {
         console.log(error);
         this.toastrService.error(error, '', {timeOut: 3000,});
       }
    );
  }
}

editWo(element: WorkOrder) {
  console.log(element);
  this.formWo.patchValue({
    workorderId: element.workorderId,
    label: element.label,
    estimatedCost: element.estimatedCost,
    estimatedEndDate:new Date(element.estimatedEndDate),
    project: element.project,
    ressource: element.ressource
});

}
resetWo() {
  this.formWo.reset();

}


onSubmitTask() {
  if (this.formTask.valid) {
      let element: Task = new Task(
        this.formTask.controls['taskId'].value,
        this.formTask.controls['label'].value,
        this.formTask.controls['taskDate'].value,
        this.formTask.controls['cost'].value,
        this.workOrder);
      this.taskService.save(element).subscribe(
        response =>  this.toastrService.success('SAVED', ''),
        error =>  this.toastrService.error(error, '', {timeOut: 3000,})
      );

    }
    this.resetTask();
    this.getTasks(this.workOrder);

}

 

 
  deleteTask(task: Task) {
    if (task) {
      this.taskService.deleteById(task.taskId).subscribe(
        res => {
          this.getTasks(task.workorder);
          console.log('delete workOrder '+ task.taskId+' done');
          this.toastrService.success("DELETED", '', {timeOut: 3000,})
        },
        error =>  {
           console.log(error);
           this.toastrService.error(error, '', {timeOut: 3000,});
         }
      );
    }
  }

  
  editTask(element: Task) {
    console.log(element);
    this.formTask.patchValue({
      taskId: element.taskId,
      label: element.label,
      taskDate: new Date(element.taskDate),
      cost: element.cost,
      workorder: element.workorder
  });
  
  }
  resetTask() {
    this.formTask.reset();
 
  }
  getTasks(workOrder: WorkOrder){
    this.spinnerService.show();
    this.workOrder=workOrder;
    this.formTask.patchValue({ workorder: workOrder});
    this.taskService.findByWorkOrder(workOrder.workorderId).subscribe(
      tasks => {
        this.tasks = tasks;
        console.log(tasks);
        this.spinnerService.hide();
      },
      err => {
        this.toastrService.error(err, 'Error loading Data :', {timeOut: 3000,})
        console.log(err);
        this.spinnerService.hide();
      } 
    );
  }
  getResources(){
    this.resourceService.findAll().subscribe(
      resources => {
        this.resources = resources;
        console.log(resources);
      },
      err => {
        this.toastrService.error(err, 'Error loading Data :', {timeOut: 3000,})
        console.log(err);
      } 
    );
  }

}
