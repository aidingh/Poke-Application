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

  url=''
  pokemons: Array<Pokemon>|null|string|undefined|string[]|any = [];
  pokemonsID: Array<Pokemon>|null|string|undefined|string[]|any = [];
  Avatars: Array<ImageBitmap>|any|null|undefined|((error: any) => void) = []
  //private readonly pokemons$: BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon[]>();

  constructor(private readonly loginService:LoginService, 
              private readonly pokemonService:PokeAPIService,
              private readonly catalogueService:CatalogueService,
              private router: Router) {

                
               }


  ngOnInit(): void {

    if (sessionStorage.getItem('pokemons')!= null){
      const pokemons: {name: string, url: string}[]|string|null = sessionStorage.getItem('pokemons')
      this.pokemons = pokemons
      this.pokemons = JSON.parse(this.pokemons)
      //console.log("all pokemons from catalogue")
      //console.log(this.pokemons)


      for(let id of this.pokemons){
        //console.log(id.url)
         let id2 = (id.url.toString().split('/',7))[6]
         //console.log((id.toString().split('/',7))[6])
         this.pokemonsID.push(id2)
     
      } 

      for(let id of this.pokemonsID){
        //console.log(id)
         this.Avatars.push(this.pokemonService.getAvatars(id))
          
      }
      // for (let i=0;i<this.Avatars.length; i++){
      //   console.log(this.Avatars[i])
      // }

      // for(let i =0; i<this.pokemons.length; i++){
      //   https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
      // }
      
    }else{  
      console.log("no pokemons")
    }
}
onChange() {
  let i = $("select[name='select'] option:selected").index();
  this.url=this.Avatars[i];
  console.log(this.url)
}
onChooseButton() {
  const user: string|null|any = localStorage.getItem("current-user")
  let i = $("select[name='select'] option:selected").index();
  this.catalogueService.getPokeList("ash",this.pokemons[i].name)
  this.catalogueService.updatePokeList("ash")
  
}
}//npm i --save-dev @types/jquery
