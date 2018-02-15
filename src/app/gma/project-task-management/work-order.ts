import { Resource } from "../resource-management/resource";
import { Project } from "../project-management/project";



export class WorkOrder {
 
  workorderId: number;
  label: string;
  estimatedCost: number;
  estimatedEndDate: any;
  project: Project;
  ressource:Resource ;
   
    constructor(workorderId: number,
       label: string, 
       estimatedCost: number,
       estimatedEndDate: any,
       project: Project, 
       ressource:Resource ){
      this.workorderId = workorderId;
      this.label = label;
      this.estimatedCost = estimatedCost;
      this.estimatedEndDate = estimatedEndDate;
      this.project = project;
      this.ressource = ressource;
    }
   
  }