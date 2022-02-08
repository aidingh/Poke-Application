import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

//Reference to the poke-API.
const pokemonURL = 'https://pokeapi.co/api/v2/pokemon?limit=1118'

//Interface model to capsulate the response in a model.
export interface Pokemon {
  name: string,
  url: string,
}

//Interface model to capsulate the response in a model.
interface PokeAPIResponse {
  count: number,
  next: string,
  previous: string,
  results: Array<Pokemon>
}
@Injectable({ providedIn: 'root' })

/**
 * Class is used as a service to the page components. It makes pokemon data reachable in all components
 */
export class PokeAPIService {

  //Private variable used in a global scope in this component.
  private pokemons: Array<Pokemon> = []

  /**
   * Constructor with dependency injected components.
   * HttpClient is a dependency to make REST-requests.
   * @return {void} returns void
   */
  constructor(private http: HttpClient) { }

  /**
   * Function will return pokemon data as a array of pokemons.
   * @return {Array<Pokemon>} returns pokemon urls and names.
   */
  public getPokemons(): Array<Pokemon> {
    return this.pokemons
  }

  /**
 * Function will make a request to get pokemon data from the poke-API.
 * @return {Observable<Array<Pokemon>>} returns pokemon response from poke-API.
 */
  public getListOfPokemonUrls(): Observable<Array<Pokemon>> {
    return this.http.get<any>(pokemonURL)
      .pipe(
        map((response: PokeAPIResponse) =>
          response.results
        )
      );
  }
}
