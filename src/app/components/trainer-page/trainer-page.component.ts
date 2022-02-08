import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.css']
})

/**
 * Class is used as a logic operator for the trainer-page.
 * The class is responsible to handle all the login actions and states.
 */
export class TrainerPageComponent implements OnInit {

  //Public variables used in a global scope in this component.
  public title: string = "Trainer";
  public username: string = "";
  public user_id: string = "";
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
  constructor(private loginService: LoginService, private router: Router) { }

/**
 * Function is run on page render.
 * Function will get pokemon data from sessions storage and user data from local storage.
 * All values from the storages are then set to globally scoped variables to be used in this specific component.
 * @return {void} returns void
 */
  ngOnInit(): void {

    let current_user = JSON.parse(localStorage.getItem('current-user') || '{}');
    if(current_user){
      this.username = current_user[0].username
      this.user_id = current_user[0].id
      this.user_pokemons = current_user[0].pokemon.toString().split(',')
      this.pokemons = JSON.parse(sessionStorage.getItem("pokemons") || '{}')
    }

    for (let i = 0; i < this.pokemons.length; i++) {
      let index = this.pokemons.findIndex(e => e.name === this.user_pokemons[i])
      if (index != -1) {
        let temp_id = this.pokemons[index].url.toString().split('/', 7)[6]
        let obj = { pokemon: this.pokemons[index].name, id: temp_id, img_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${temp_id}.png` }
        this.pokemonAvatarUrls.push(obj)
      }
    }
  }

  /**
 * Function is run when client logs out from the application. Function is run on a onclick event.
 * Function will clear all storages and navigate user back to the login page.
 * @return {void} returns void
 */
  onLogout() {
    localStorage.clear()
    sessionStorage.clear()
    this.router.navigateByUrl('/login');
  }

/**
 * Function is run when client selects a checkbox related to the pokemon it wants to delete.
 * It will store the selected pokemon name in a list to be used when validating the deletion.
 * @return {void} returns void
 */
  onChangeStatusCheckBox(selectedPokemon: string) {
    let index = this.selectedPokemonList.findIndex(e => e === selectedPokemon);
    if (index === -1) {
      this.selectedPokemonList.push(selectedPokemon);
    }
    else{
      this.selectedPokemonList = this.selectedPokemonList.filter(e => e !== selectedPokemon);
    }
  }

/**
 * Function is run when client validates the deletion of pokemons.
 * It will update the deletion in the API and storage.
 * @return {void} returns void
 */
  onPokemonDelete() {
    for(let i = 0; i < this.selectedPokemonList.length; i++) {
      this.pokemonAvatarUrls = this.pokemonAvatarUrls.filter(e => e.pokemon != this.selectedPokemonList[i]);
    }
    this.pokeListToAPI = this.pokemonAvatarUrls.map(e => e.pokemon);
    this.loginService.deleteSelectedUserPokemon(this.pokeListToAPI, this.user_id);
  }
}
