import { Injectable } from '@angular/core';
import { Http ,Response} from '@angular/http';
import { Type } from './type';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TypeService {
//private apiUrl = ' http://localhost:8080/types';
private apiUrl = 'https://global-management-application.herokuapp.com/types';
constructor(private http: Http) { }
findAll(): Observable<Type[]>  {
  return this.http.get(this.apiUrl)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
}
findById(id: number): Observable<Type> {
  return this.http.get(this.apiUrl + '/' + id)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Error'));
}

save(model: Type): Observable<Type> {
  console.log("Saving "+model)
  return this.http.post(this.apiUrl, model)
  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
}

deleteById(id: number): Observable<Response> {
  return this.http.delete(this.apiUrl + '/' + id)
  .map((res:Response) => res.json())
  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
}

update(model: Type): Observable<Type> {
  return this.http.put(this.apiUrl, model)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
}

}
