import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PokeAPIService, Pokemon } from 'src/app/services/pokeapi.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-catalogue-page',
  templateUrl: './catalogue-page.component.html',
  styleUrls: ['./catalogue-page.component.css']
})
export class CataloguePageComponent implements OnInit {

  constructor(private readonly loginService:LoginService, 
              private readonly pokemonService:PokeAPIService,
              private router: Router) { }

  ngOnInit(): void {
  }

}
