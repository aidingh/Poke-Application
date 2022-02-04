import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Login} from '../models/login.model'
import { Observable} from 'rxjs';

@Injectable({
providedIn: 'root'
})

export class LoginService{
  private user: Login[] = [];
  public testUser = {}

  loggedIn = false;

  private error: string = "";

  apiURL = "https://noroff-trivia-api.herokuapp.com";
  apiKEY = "1b23229d-18ca-48ec-bdeb-9c7445384f23";

  constructor(public readonly http: HttpClient){
  }

  public queryUser(username:string): Observable<Login[]> {
    return this.http.get<Login[]>(`${this.apiURL}/trainers?username=${username}`)
  }

  public setUserToApi(username:string): Observable<Login[]> {
    const headers = { 'X-API-Key': this.apiKEY, 'Content-Type': 'application/json' };
    const body = [{ username: username, pokemon: []}];
    let data = this.http.post<Login[]>(`${this.apiURL}/trainers?username=${username}`, body, { headers })
    return data
  }

  public isLoggedIn(){
      return this.isLoggedIn;
  }


  public getUser(): Login[]{
    return this.user
  }


  /*public query(username:string): Observable<Login[]> {

    console.log("Above")
    console.log(this.http.get<Login[]>(`${this.apiURL}/trainers?username=${username}`));
    return this.http.get<Login[]>(`${this.apiURL}/trainers?username=${username}`)

  }
  //--explain
  public queryRequestUser(username:string): void{
    this.http.get<Login[]>(`${this.apiURL}/trainers?username=${username}`).subscribe({
      next: data => {
        console.log(data);
        this.user = data
      },
      error: error => {
          this.error = error.message;
          console.error('There was an error!', error);
      }
  })
  }
  //---save user to API
  public setUserToApi(username:string): void {
    const headers = { 'X-API-Key': this.apiKEY, 'Content-Type': 'application/json' };
    const body = { username: username, pokemon: []};

    this.http.post<Login[]>(`${this.apiURL}/trainers?username=${username}`, body, { headers }).subscribe({
        next: data => {
          this.user = data; //What is happening here
        },
        error: error => {
          this.error = error.message;
          console.error('There was an error!', error);
        }
    })
  }

  public setUser(user:Login[]){
    this.user = user;
  }*/


}
