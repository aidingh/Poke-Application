import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
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

  constructor(private loginService: LoginService, private router: Router) { }
  //35
  ngOnInit(): void {
    if(localStorage.getItem('current-user') != null){
      let current_user = JSON.parse(localStorage.getItem('current-user') || '{}');
      this.username = current_user[0].username
      this.user_id = current_user[0].id
      this.user_pokemons = current_user[0].pokemon
      this.default_pokemons = JSON.parse(sessionStorage.getItem("pokemons") || '{}')
    }
  }

  onPokemonDelete(){
    console.log("make maginc")
  }

  onNavigate(){
    this.router.navigateByUrl('/catalogue');
  }

}
