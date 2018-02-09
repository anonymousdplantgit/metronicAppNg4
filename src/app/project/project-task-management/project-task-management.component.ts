import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from '../work-order.service';
import { TaskService } from '../task.service';
import { Project } from '../project';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppComponent } from '../../app.component';
import { ProjectService } from '../project.service';
import { ToastrService } from 'ngx-toastr';
import { WorkOrder } from '../work-order';
import { Task } from '../task';
import { ResourceService } from '../../resource/resource.service';
import { Resource } from '../../resource/resource';

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
  public  workOder : WorkOrder;
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
      estimatedCost: new FormControl(null, Validators.required),
      estimatedEndDate: new FormControl(null, Validators.required),
      project: new FormControl(null, Validators.required),
      ressource: new FormControl(null, Validators.required)
    });
    
    this.formTask = new FormGroup({
      taskId : new FormControl(),
      label: new FormControl(null, Validators.required),
      taskDate: new FormControl(null, Validators.required),
      cost: new FormControl(null, Validators.required),
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
        this.toastrService.success("Deleted successfully", '', {timeOut: 3000,})
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
    estimatedEndDate: element.estimatedEndDate,
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
        this.workOder);
      this.taskService.save(element).subscribe(
        response =>  this.toastrService.success('SAVED', ''),
        error =>  this.toastrService.error(error, '', {timeOut: 3000,})
      );

    }
    this.resetTask();
    this.getTasks(this.workOder);

}

 

 
  deleteTask(task: Task) {
    if (task) {
      this.taskService.deleteById(task.taskId).subscribe(
        res => {
          this.getTasks(task.workorder);
          console.log('delete workOrder '+ task.taskId+' done');
          this.toastrService.success("Deleted successfully", '', {timeOut: 3000,})
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
      taskDate: element.taskDate,
      cost: element.cost,
      workorder: element.workorder
  });
  
  }
  resetTask() {
    this.formTask.reset();
 
  }
  getTasks(workOrder: WorkOrder){
    this.spinnerService.show();
    this.workOder=workOrder;
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
