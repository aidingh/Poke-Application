import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Login} from '../models/login.model'
import { flatMap, Observable, of} from 'rxjs';

export interface Pokemon {
    name: string,
}

@Injectable({
providedIn: 'root'
})

export class CatalogueService{


  apiURL = "https://noroff-trivia-api.herokuapp.com";
  apiKey = "1b23229d-18ca-48ec-bdeb-9c7445384f23";
  userId = 1
  constructor(public readonly http: HttpClient){
  }



//   public updateUser(username:string, pokemon: string): Observable<Login[]> {
//     const headers = { 'X-API-Key': this.apiKEY, 'Content-Type': 'application/json' };
//     const body = [{ username: username, pokemon: [...pokemon]}];
//     let data = this.http.patch<Login[]>(`${this.apiURL}/trainers?username=${username}`, body, { headers })
//     return data
//   }
public pokelist: string[]|any =[]

// public getPokeList(username: string, pokemonAdd: string) {
//     fetch(`${this.apiURL}/trainers?username=${username}`)
//         .then(response => response.json())
//         .then(results => {
//         // results will be an array of users that match the username of ash.
//         console.log(results)
//         console.log(results[0].pokemon)
//         this.pokelist = results[0].pokemon
//         console.log(this.pokelist)  
//         console.log(pokemonAdd)
//         this.pokelist.push(pokemonAdd)
//         console.log(this.pokelist)
          
//     })  
//     .catch(error => {
//     })
// }

public getPokeList(username: string, pokemonAdd: string): void {
    this.pokelist.length=0
    this.http.get(`${this.apiURL}/trainers?username=${username}`)
    .subscribe(
    (results: any )=> {
        console.log("from http request  ")
        console.log(results)
        console.log(results[0].pokemon)
        for(let p of results[0].pokemon) {
            this.pokelist.push(p)
            console.log(p)
            console.log(this.pokelist)
            if (this.pokelist.includes(pokemonAdd)){
                console.log("you already have pokemon")
            }else{
                this.pokelist.push(pokemonAdd) 
            }
      }
    })

    }

public updatePokeList(username: string) {  
    const headers = { 'X-API-Key': this.apiKey, 'Content-Type': 'application/json' };
    const body = [{ username: username, pokemon: []}];
    this.http.patch(`${this.apiURL}/trainers?username=${username}`, body, { headers })
}  

// public updatePokeList() {   
//     fetch(`${this.apiURL}/trainers/${this.userId}`, {
//         method: 'PATCH', // NB: Set method to PATCH
//         headers: {
//             'X-API-Key': this.apiKey,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             // Provide new Pokémon to add trainer with id 1
//             pokemon: this.pokelist
//             //pokemon: ["fearow", "weedle","metapod","kakuna","beedrill"]
//         })
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Could not update trainer')
//       }
//       return response.json()
//     })
//     .then(updatedTrainer => {
//       // updatedTrainer is the trainer user the Patched data
//     })
//     .catch(error => {
//     })
//   }
}