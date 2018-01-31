import { Injectable } from '@angular/core';
import { Http ,Response} from '@angular/http';
import { Categorie } from './categorie';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class CategorieService {
  private apiUrl = ' http://localhost:8080/categories';
  //private apiUrl = 'https://global-management-application.herokuapp.com/categories';
  constructor(private http: Http) { }
  findAll(): Observable<Categorie[]>  {
    return this.http.get(this.apiUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  findById(id: number): Observable<Categorie> {
    return this.http.get(this.apiUrl + '/' + id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Error'));
  }
 
  save(model: Categorie): Observable<Categorie> {
    console.log("Saving "+model.description)
    return this.http.post(this.apiUrl, model)
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
 
  deleteById(id: number): Observable<boolean> {
    return this.http.delete(this.apiUrl + '/' + id)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
 
  update(model: Categorie): Observable<Categorie> {
    return this.http.put(this.apiUrl, model)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
