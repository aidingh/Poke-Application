import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'

import { PokeAPIService, Pokemon } from 'src/app/services/pokeapi.service';
import { LoginService } from 'src/app/services/login.service';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { __values } from 'tslib';


@Component({
  selector: 'app-catalogue-page',
  templateUrl: './catalogue-page.component.html',
  styleUrls: ['./catalogue-page.component.css']
})
export class CataloguePageComponent implements OnInit {

  // @Input() Avatar?: Avatar;
  // @Output() complete: EventEmitter<number> = new EventEmitter();
  title: string = "Catalogue";
  username: string = "Set user here";

  url = ''
  pokemons: Array<Pokemon> | null | string | undefined | string[] | any = [];
  pokemonsID: Array<Pokemon> | null | string | undefined | string[] | any = [];
  Avatars: Array<ImageBitmap> | any | null | undefined | ((error: any) => void) = []
  //private readonly pokemons$: BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon[]>();

  constructor(private readonly loginService: LoginService, private readonly pokemonService: PokeAPIService, private readonly catalogueService: CatalogueService, private router: Router) { }


  ngOnInit(): void {

    if (sessionStorage.getItem('pokemons') != null) {
      const pokemons: { name: string, url: string }[] | string | null = sessionStorage.getItem('pokemons')
      this.pokemons = pokemons
      this.pokemons = JSON.parse(this.pokemons)

      for (let id of this.pokemons) {
         let id2 = (id.url.toString().split('/',7))[6]
         this.pokemonsID.push(id2)

      }
      sessionStorage.setItem("pokemonsID", this.pokemonsID)

      for(let id of this.pokemonsID){
         this.Avatars.push(this.pokemonService.getAvatars(id))
      }


    } else {
      console.log("no pokemons")
    }
  }
  //Must add more functionality here
  onLogout(){
    localStorage.clear()
    sessionStorage.clear()
    this.router.navigateByUrl('/login');
  }

  onChange() {
    let i = $("select[name='select'] option:selected").index();
    this.url = this.Avatars[i];
    //console.log(this.url)
  }
  onChooseButton() {
    const user: string | null | any = localStorage.getItem("current-user")
    let i = $("select[name='select'] option:selected").index();
    this.catalogueService.getPokeList("ash", this.pokemons[i].name)
    this.catalogueService.updatePokeList("ash")

  }
}//npm i --save-dev @types/jquery
