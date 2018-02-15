import { Injectable } from '@angular/core';
import { Http ,Response} from '@angular/http';
import { WorkOrder } from './work-order';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class WorkOrderService {
  //private apiUrl = ' http://localhost:8080/workOrders';
  private apiUrl = 'https://global-management-application.herokuapp.com/workOrders';
  constructor(private http: Http) { }
  findAll(): Observable<WorkOrder[]>  {
    return this.http.get(this.apiUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  findByProject(id: number): Observable<WorkOrder[]>  {
    return this.http.get(this.apiUrl + '/project/' + id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  findById(id: number): Observable<WorkOrder> {
    return this.http.get(this.apiUrl + '/' + id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Error'));
  }
 
  save(model: WorkOrder): Observable<WorkOrder> {
    console.log("Saving "+model)
    return this.http.post(this.apiUrl, model)
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
 
  deleteById(id: number): Observable<Response> {
    return this.http.delete(this.apiUrl + '/' + id)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
 
  update(model: WorkOrder): Observable<WorkOrder> {
    return this.http.put(this.apiUrl, model)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
