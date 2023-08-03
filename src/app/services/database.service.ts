import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { DatabaseEntry, DatabaseResponse } from '../models/database.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private serverURL: string = 'https://angular-cruddy-default-rtdb.firebaseio.com/crud-db.json';
  private databaseApiResults: DatabaseResponse = null;
  private loadingChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loading: boolean;
  private httpSubscription: Subscription;
  private isSuccessfullyCompleted: boolean = false;

  constructor(private http: HttpClient) { }

  /**
   * @description - Resets the state of the service. 
   * @returns {void}
   */
   public resetData(): void {
    this.databaseApiResults = null;
    this.loading = false;
    this.loadingChanged.next(this.loading);
    this.isSuccessfullyCompleted = false;
    this.cancelRequest();
  }
 
  /**
   * @description - Cancels any ongoing API call.
   * @returns {void}
   */
  private cancelRequest(): void {
    if (this.httpSubscription) {
      if (!this.httpSubscription.closed) {
        this.httpSubscription.unsubscribe();
      }
    }
  }
 
  /**
   * @description - Returns the loadingChanged Subject as an Observable. Components should subscribe to this function, which should return the status of the API, and retrieve the API result when the loading has been updated from true to false. 
   * @returns {Observable<boolean>} - The loadingChanged Subject as an Observable
   */
  public getLoading(): Observable<boolean> {
    return this.loadingChanged.asObservable();
  }
 
  /**
   * @description - Updates the loadingChanged BehaviorSubject. This is called within the service's call() to update the status of the API. The loading variable is updated to true when the API is called, and updated to false when the response is retrieved.
   * @param {boolean} loading - The new value for loading
   * @returns {void}
   */
  private updateLoading(loading: boolean): void {
    this.loading = loading;
    this.loadingChanged.next(this.loading);
  }
 
  /**
   * @description - Returns the status of isSuccessfullyCompleted. This should be used in components to determine if an API should be called again.
   * @returns {boolean} - true if the API has successfully been called; false otherwise
   */
  public hasSuccessfullyCompleted(): boolean {
    return this.isSuccessfullyCompleted;
  }
 
  /**
   * @description - Returns the DatabaseResponse API result
   * @returns {DatabaseResponse} - The API processed results 
   */
  public getResults(): DatabaseResponse {
    return this.databaseApiResults;
  }
 
  /**
   * @description - Calls firebase in order to get all database data.
   * @returns {void}
   */
  public call(): void {
    // validate we're not already loading an API response and that we have the expected parameters
    if (!this.loading) {
      this.updateLoading(true);
      this.httpSubscription = this.http.get(`${this.serverURL}`)
        .subscribe({ 
          next: (response: any) => {
            this.databaseApiResults = new DatabaseResponse(response);
            this.isSuccessfullyCompleted = true;
            this.updateLoading(false);
          },
          error: (error: any) => {
            this.databaseApiResults = new DatabaseResponse(error.error);
            this.isSuccessfullyCompleted = false;
            this.updateLoading(false);
          }
        });
    }
  }

  public put(data: DatabaseEntry): void {
    if (this.databaseApiResults && data) {
      this.update(JSON.stringify(this.databaseApiResults.appendEntry(data)));
    }
  }

  public delete(data: DatabaseEntry): void {
    if (this.databaseApiResults && data) {
      this.update(JSON.stringify(this.databaseApiResults.removeEntry(data)));
    }
  }

  private update(payload: string): void {
    if (!this.loading) {
      this.updateLoading(true);
      this.httpSubscription = this.http.put(`${this.serverURL}`, payload)
        .subscribe({ 
          next: (response: any) => {
            this.databaseApiResults = new DatabaseResponse(response);
            this.isSuccessfullyCompleted = true;
            this.updateLoading(false);
          },
          error: (error: any) => {
            this.databaseApiResults = new DatabaseResponse(error.error);
            this.isSuccessfullyCompleted = false;
            this.updateLoading(false);
          }
        });
    }
  }
}
