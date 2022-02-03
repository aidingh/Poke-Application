import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon/'


export interface Pokemon {
  name: string,
  url: string
}


interface PokeAPIResponse {
  count: number,
  next: string,
  previous: string,
  results: Array<Pokemon>
}


/**
 * PokéAPI service.
 */
@Injectable({providedIn: 'root'})
export class PokeAPIService {
  private pokemons: Array<Pokemon> = []

  constructor(private http: HttpClient) {
    this.getListOfPokemonUrls().subscribe(
      (results: Array<Pokemon>) => {
        for(let p of results) {
          this.pokemons.push(p)
        }
      }
    )
  }

  public get_pokemons(): Array<Pokemon> {
    return this.pokemons
  }

  private getListOfPokemonUrls(): Observable<Array<Pokemon>> {
    return this.http.get<any>(POKEAPI_URL)
      .pipe(
        map((response: PokeAPIResponse) =>
        response.results
        )
      );
  }
}
