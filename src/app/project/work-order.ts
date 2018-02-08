import { Project } from "./project";
import { Resource } from "../resource/resource";



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
      this.estimatedEndDate = estimatedEndDate;
      this.project = project;
      this.ressource = ressource;
    }
   
  }