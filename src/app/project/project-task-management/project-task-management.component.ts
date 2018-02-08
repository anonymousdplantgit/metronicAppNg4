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

@Component({
  selector: 'app-project-task-management',
  templateUrl: './project-task-management.component.html',
  styleUrls: ['./project-task-management.component.css'],
  providers: [ProjectService,ToastrService,WorkOrderService,TaskService]
})
export class ProjectTaskManagementComponent implements OnInit {
  param : any;
  id : number;
  public  project : Project;
  public  workOder : WorkOrder;
  public  workOrders : WorkOrder[];
  public  tasks : Task[];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private workOrderService: WorkOrderService,
    private taskService: TaskService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    
    this.getProject();
    this.getWorkOrders(this.id);
   
  }

  getProject(){
    this.spinnerService.show();
    this.param = this.route.params.subscribe(params => {
      this.id = +params['id']; 
      });
      if(this.id){
        this.projectService.findById(this.id).subscribe( project =>{
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

  getWorkOrders(idProject: number){
    this.spinnerService.show();
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
          this.getWorkOrders(this.id);
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


}
