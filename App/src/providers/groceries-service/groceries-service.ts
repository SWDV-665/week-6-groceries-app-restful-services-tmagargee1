import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class GroceriesServiceProvider {

  items : any = [];
  public dataChanged$: Observable<boolean>;
  private dataChangeSubject: Subject<boolean>;

  private baseURL = 'http://localhost:8080/api/groceries';

  constructor(public http: HttpClient){
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }
  
  public getItems(){
    return this.http.get(this.baseURL).pipe(
      map(this.extractData),
      catchError(this.handleError)
    )
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any){
    let message: string;
    if (error instanceof Response){
      message = `${error.status} - ${error.statusText || ''} ${error || ''}`
    } else{
      message = error.message ? error.message : error.toString();
    }
    return Observable.throw(message);
  }

  public removeItem(id) {
    return this.http.delete(`${this.baseURL}/${id}`).subscribe(res => {
      this.items = res
      this.dataChangeSubject.next(true)
    })
  }

  addItem(item) {
    return this.http.post(`${this.baseURL}`, item).subscribe(res => {
      this.items = res
      this.dataChangeSubject.next(true)
    })
  }

  editItem(item) {
    return this.http.put(`${this.baseURL}/${item._id}`, item).subscribe(res => {
      this.items = res
      this.dataChangeSubject.next(true)
    })
  }

}
