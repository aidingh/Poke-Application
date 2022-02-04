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

  private error: string = "";
  apiURL = "https://noroff-trivia-api.herokuapp.com";
  apiKEY = "1b23229d-18ca-48ec-bdeb-9c7445384f23";

  constructor(private readonly http: HttpClient){

  }

  public query(username:string): Observable<Login[]> {
    console.log("Above")
    console.log(this.http.get<Login[]>(`${this.apiURL}/trainers?username=${username}`));
    return this.http.get<Login[]>(`${this.apiURL}/trainers?username=${username}`)

  }

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

  public setUserToApi(username:string): void {
    const headers = { 'X-API-Key': this.apiKEY, 'Content-Type': 'application/json' };
    const body = { username: username, pokemon: []};

    this.http.post<Login[]>(`${this.apiURL}/trainers?username=${username}`, body, { headers }).subscribe({
        next: data => {
          this.user = data;
        },
        error: error => {
          this.error = error.message;
          console.error('There was an error!', error);
        }
    })
  }

  public setUser(user:Login[]){
    this.user = user;
  }

  public getUser(): Login[]{
    console.log(this.user)
    return this.user
  }
}
