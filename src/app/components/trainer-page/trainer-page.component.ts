import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { PokeAPIService, Pokemon } from 'src/app/services/pokeapi.service';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.css']
})
export class TrainerPageComponent implements OnInit {

  title: string = "Trainer";
  username: string = "";
  user_id: string = "";
  user_pokemons: string[] = [];
  default_pokemons: string[] = [];

  pokemons: Array<Pokemon> = [];
  pokemonAvatarUrls: any[] = [];
  pokeListToAPI: any[] = [];
  selectedPokemonList: string[] = [];
  Avatars: Array<ImageBitmap> = [];

  constructor(private loginService: LoginService, private readonly pokemonService: PokeAPIService, private readonly catalogueService: CatalogueService, private router: Router) { }

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

  updater(){
    let current_user = JSON.parse(localStorage.getItem('current-user') || '{}');
    if(current_user){
      this.user_pokemons = current_user[0].pokemon.toString().split(',')
      this.pokemons = JSON.parse(sessionStorage.getItem("pokemons") || '{}')
    }
  }

  onChangeStatusCheckBox(selectedPokemon: string) {
    console.log(selectedPokemon)
    this.selectedPokemonList.push(selectedPokemon)
  }

  onPokemonDelete() {
    for(let i = 0; i < this.selectedPokemonList.length; i++) {
      this.pokemonAvatarUrls = this.pokemonAvatarUrls.filter(e => e.pokemon != this.selectedPokemonList[i]);
    }
    this.pokeListToAPI = this.pokemonAvatarUrls.map(e => e.pokemon);
    this.loginService.deleteSelectedUserPokemon(this.pokeListToAPI, this.user_id);
  }

  onNavigate() {
    this.router.navigateByUrl('/catalogue');
  }

}
