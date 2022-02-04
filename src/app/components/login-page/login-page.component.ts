import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { PokeAPIService, Pokemon } from 'src/app/services/pokeapi.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  apiURL = "https://noroff-trivia-api.herokuapp.com";
  apiKEY = "1b23229d-18ca-48ec-bdeb-9c7445384f23";

  title: string = "Pokemon Trainer";
  username: string = "";

  @Input() login: Login | undefined;
  @Output() onUserLogin: EventEmitter<Login> = new EventEmitter()

  public users: Login[] | undefined;
  public pokemons: Pokemon[] | undefined;


  constructor(private readonly loginService: LoginService, private readonly pokemonService:PokeAPIService,private router: Router) { }

  ngOnInit(): void{

   this.loginService.query("ash").subscribe((res: Login[]) => {
    this.users = res
    this.username = this.users[0].username
    console.log(this.users[0].username)

    if(localStorage.getItem('pokemons') == null){
      localStorage.setItem('pokemons', JSON.stringify(this.pokemonService.get_pokemons()));
    }
    else{
      console.log("Pokemons are already set in local storage")
    }

    localStorage.setItem('user', JSON.stringify(this.users));

  })

  console.log(JSON.stringify(this.loginService.query("ash")))

   this.pokemons = this.pokemonService.get_pokemons()
   console.log("below")

   console.log(this.pokemons)

    let object = this.getUser();
    console.log(object);
  }

  onLogin(): void{

  }

  get user(): Login[]{
    return this.loginService.getUser()
  }

  getUser(): Login[]{
    return this.loginService.getUser();
  }

  tester(){
    console.log("binding works")
    //this.loginService.queryRequestUser(this.username);
    this.loginService.queryRequestUser("ash");
    let object = this.getUser();
    console.log("a" + object);
    this.router.navigateByUrl('/trainer');
  }

  onSubmit(){
    console.log(this.username)
    this.setUserToApi()
  }

  async setUserToApi(){
    console.log("nothing to se here")

      let userResponse = fetch(`${this.apiURL}/trainers?username=${this.username}`);
      if ((await userResponse).ok) {
        let data = await (await userResponse).json();

        if (data.length == 0) {
          let response = fetch(`${this.apiURL}/trainers`, {
            method: "POST",
            headers: { "X-API-Key": this.apiKEY, "Content-Type": "application/json" },
            body: JSON.stringify({
              username: this.username,
              pokemon: [],
            }),
          });
          let newResponse = await (await response).json();
          console.log("a" + newResponse)
          return newResponse
        }
        else{
          let newData = { username: data[0].username, translations: data[0].translations, id: data[0].id }
          console.log("b" + newData)
          return newData
        }
      }
      else{
        console.log("something went wrong")
      }
  }


}
