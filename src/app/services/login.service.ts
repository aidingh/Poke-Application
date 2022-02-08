import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from '../models/login.model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Class is used as a service to the page components. It makes user data reachable in all components
 */
export class LoginService {

  //Public and private variables used in a global scope in this component.
  private user: Login[] = [];
  private error: string = "";
  status: string | undefined;

  private apiURL = "https://noroff-trivia-api.herokuapp.com";
  private apiKEY = "1b23229d-18ca-48ec-bdeb-9c7445384f23";

  /**
   * Constructor with dependency injected components.
   * HttpClient is a dependency to make REST-requests.
   * @return {void} returns void
   */
  constructor(public readonly http: HttpClient) {
  }

  /**
 * Function will check if user is set to the API or not.
 * @param {string} username the current users name
 * @return {Observable<Login[]>} returns the response object from the API.
 */
  public queryUser(username: string): Observable<Login[]> {
    return this.http.get<Login[]>(`${this.apiURL}/trainers?username=${username}`)
  }

  /**
   * Function will set a user to the API
   * @param {string} username the current users name
   * @return {Observable<Login[]>} returns the response object from the API.
   */
  public setUserToApi(username: string): Observable<Login[]> {
    const headers = { 'X-API-Key': this.apiKEY, 'Content-Type': 'application/json' };
    const body = { username: username, pokemon: [] };
    let data = this.http.post<Login[]>(`${this.apiURL}/trainers?username=${username}`, JSON.stringify(body), { 'headers': headers })
    return data
  }

  /**
   * Function will PATH-request the clients deletion of pokemons.
   * It will update the API and storage.
   * @param {string} username the current users name
   * @return {void} returns void
   */
  public deleteSelectedUserPokemon(pokemon: string[], id: string): void {
    const headers = { 'X-API-Key': this.apiKEY, 'Content-Type': 'application/json' };
    const body = { pokemon: pokemon };

    this.http.patch<Login[]>(`${this.apiURL}/trainers/${id}`, JSON.stringify(body), { 'headers': headers }).subscribe({
      next: data => {
        sessionStorage.getItem("pokemons") || '{}'
        let user = JSON.parse(localStorage.getItem('current-user') || '{}');
        user = data
        localStorage.setItem("current-user", JSON.stringify([user]));
      },
      error: error => {
        this.error = error.message;
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Function will PATH-request the clients addition of pokemons.
   * It will update the API and storage.
   * @param {string} username the current users name
   * @return {void} returns void
   */
  public addSelectedUserPokemon(pokemon: string[], id: string, newPokemon: string): void {
    const headers = { 'X-API-Key': this.apiKEY, 'Content-Type': 'application/json' };
    const body = { pokemon: pokemon };

    this.http.patch<Login[]>(`${this.apiURL}/trainers/${id}`, JSON.stringify(body), { 'headers': headers }).subscribe({
      next: data => {
        sessionStorage.getItem("pokemons") || '{}'
        let user = JSON.parse(localStorage.getItem('current-user') || '{}');
        user = data
        localStorage.setItem("current-user", JSON.stringify([user]));
        alert("Congrats! You have collected: " + newPokemon)
      },
      error: error => {
        this.error = error.message;
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Returns the current user
   * @return {Login[]} returns current user object from API.
   */
  public getUser(): Login[] {
    return this.user
  }
}
