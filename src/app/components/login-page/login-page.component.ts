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

  @Input() login: Login | undefined;      //What is happening here
  @Output() onUserLogin: EventEmitter<Login> = new EventEmitter() //And here

  public users: Login[] | undefined;
  public pokemons: Pokemon[] | undefined;


  constructor(private readonly loginService: LoginService, private readonly pokemonService:PokeAPIService,private router: Router) { }

  ngOnInit(): void{
    
  //---Getting the username
    this.loginService.query("ash").subscribe((res: Login[]) => {   
    this.users = res
    this.username = this.users[0].username
    console.log(this.users[0].username)

    //---saving username in local storage
    localStorage.setItem('user', JSON.stringify(this.users)); 

    //---if no pokemons in local storage get from service
    if(localStorage.getItem('pokemons') == null){
      localStorage.setItem('pokemons', JSON.stringify(this.pokemonService.get_pokemons()));
    }
    else{
      console.log("Pokemons are already set in local storage")
    }
  })
  }

  onLogin(): void{

  }
  //-- getters for user
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
    //this.setUserToApi()
  }

}
