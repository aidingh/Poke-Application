import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { PokeAPIService } from 'src/app/services/pokeapi.service';


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

  constructor(private readonly loginService: LoginService, private readonly pokemonService:PokeAPIService,private router: Router) { }

   ngOnInit(): void{
    this.loginService.queryRequestUser("ash")

    this.pokemonService.get_pokemons()

    //let any = this.loginService.query("ash");
    //console.log(any)

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
