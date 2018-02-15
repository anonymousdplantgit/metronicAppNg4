import { Injectable } from '@angular/core';
import { Http ,Response} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Task } from './task';


@Injectable()
export class TaskService {
  //private apiUrl = ' http://localhost:8080/tasks';
  private apiUrl = 'https://global-management-application.herokuapp.com/tasks';
  constructor(private http: Http) { }
  findAll(): Observable<Task[]>  {
    return this.http.get(this.apiUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  findByWorkOrder(id: number): Observable<Task[]>  {
    return this.http.get(this.apiUrl + '/workorder/' + id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  findById(id: number): Observable<Task> {
    return this.http.get(this.apiUrl + '/' + id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Error'));
  }
 
  save(model: Task): Observable<Task> {
    return this.http.post(this.apiUrl, model)
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
 
  deleteById(id: number): Observable<Response> {
    return this.http.delete(this.apiUrl + '/' + id)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
 
  update(model: Task): Observable<Task> {
    return this.http.put(this.apiUrl, model)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
