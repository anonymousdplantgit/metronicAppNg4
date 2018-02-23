import { Injectable } from '@angular/core';
import { Http ,Response} from '@angular/http';
import { Product } from './product';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Endpoints } from '../endpoints';

@Injectable()
export class ProductService {

  private apiUrl: string = new Endpoints().produits;
  constructor(private http: Http) { }
  findAll(): Observable<Product[]>  {
    return this.http.get(this.apiUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  findById(id: number): Observable<Product> {
    return this.http.get(this.apiUrl + '/' + id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Error'));
  }
 
  save(product: Product): Observable<Product> {
    return this.http.post(this.apiUrl, product)
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
 
  deleteById(id: number): Observable<boolean> {
    return this.http.delete(this.apiUrl + '/' + id)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
 
  update(product: Product): Observable<Product> {
    return this.http.put(this.apiUrl, product)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
