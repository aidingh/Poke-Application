import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/services/pokeapi.service';
import { LoginService } from 'src/app/services/login.service';
import { __values } from 'tslib';
@Component({
  selector: 'app-catalogue-page',
  templateUrl: './catalogue-page.component.html',
  styleUrls: ['./catalogue-page.component.css']
})

/**
 * Class is used as a logic operator for the catalogue-page.
 * The class is responsible to handle all the login actions and states.
 */
export class CataloguePageComponent implements OnInit {

  //Public variables used in a global scope in this component.
  public title: string = "Catalogue";
  public username: string = "";
  public current_img: string = "";
  public selectedValue: string = "";
  public user_id: string = "";
  public logo: string = '../assets/images/left-poke-ball.png'

  public user_pokemons: string[] = [];
  public default_pokemons: string[] = [];
  public pokemons: Array<Pokemon> = [];
  public pokemonAvatarUrls: any[] = [];
  public pokeListToAPI: any[] = [];
  public selectedPokemonList: string[] = [];

/**
 * Constructor with dependency injected components
 * LoginService is a dependency to set a user to storage and API.
 * @return {void} returns void
 */
  constructor(private readonly loginService: LoginService, private router: Router) { }

/**
 * Function is run on page render.
 * Function will get pokemon data from sessions storage and user data from local storage.
 * All values from the storages are then set to globally scoped variables to be used in this specific component.
 * @return {void} returns void
 */
  ngOnInit(): void {
    let current_user = JSON.parse(localStorage.getItem('current-user') || '{}');
    if (current_user) {
      this.username = current_user[0].username
      this.user_id = current_user[0].id
      this.user_pokemons = current_user[0].pokemon.toString().split(',')
      this.pokemons = JSON.parse(sessionStorage.getItem("pokemons") || '{}')
    }

    for (let i = 0; i < this.pokemons.length; i++) {
      let temp_id = this.pokemons[i].url.toString().split('/', 7)[6]
      let obj = { pokemon: this.pokemons[i].name, id: temp_id, img_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${temp_id}.png` }
      this.pokemonAvatarUrls.push(obj)
    }
    this.current_img = this.pokemonAvatarUrls[0].img_url
    this.selectedValue = this.pokemonAvatarUrls[0].pokemon
  }

/**
 * Function is run when client selects a new pokemon.
 * Function will display the selected image.
 * @return {void} returns void
 */
  onChange() {
    for (let i = 0; i < this.pokemonAvatarUrls.length; i++) {
      let temp = this.pokemonAvatarUrls.find((e) => e.pokemon === this.selectedValue);
      if (temp) {
        this.current_img = temp.img_url
        return
      }
    }
  }

/**
 * Function is run when client validates the pokemon he/she chooses.
 * Function will then update the API and storage with the service objects.
 * @return {void} returns void
 */
  onChooseButton() {
    for (let i = 0; i < this.user_pokemons.length; i++) {
      let temp = this.user_pokemons.find((e) => e === this.selectedValue);
      if (temp) {
        alert("You already have the pokemon: " + this.selectedValue + " in your collection")
        return
      }
      else {
        this.user_pokemons.push(this.selectedValue)
        this.loginService.addSelectedUserPokemon(this.user_pokemons, this.user_id, this.selectedValue)
        return
      }
    }
  }

  /**
 * Function is run when client wants to navigate to the trainers page.
 * @return {void} returns void
 */
  onNavigate() {
    this.router.navigateByUrl('/trainer');
  }
}
