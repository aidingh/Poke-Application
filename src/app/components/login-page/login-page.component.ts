import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { PokeAPIService, Pokemon } from 'src/app/services/pokeapi.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

/**
 * Class is used as a logic operator for the login-page.
 * The class is responsible to handle all the login actions and states.
 */
export class LoginPageComponent implements OnInit {

  //Public variables used in a global scope in this component.
  public title: string = "Pokemon Trainer";
  public username: string = "";
  public logo: string = '../assets/images/left-poke-ball.png'
  public users: Login[] | undefined;
  public pokemons: Array<Pokemon> = []

/**
 * Constructor with dependency injected components.
 * LoginService is a dependency to set a user to storage and API.
 * PokeAPIService is a dependency to get pokemon data.
 * @return {void} returns void
 */
  constructor(private loginService: LoginService, private pokemonService: PokeAPIService, private router: Router) { }

/**
 * Function is run on page render.
 * Function will get pokemon data from the pokeapi.service.ts file and store it in the session storage.
 * @return {void} returns void
 */
  ngOnInit(): void {
    this.pokemonService.getListOfPokemonUrls().subscribe((results: Array<Pokemon>) => {
        for (let p of results) {
          this.pokemons.push(p)
        }
        if (sessionStorage.getItem('pokemons') == null) {
          sessionStorage.setItem('pokemons', JSON.stringify(this.pokemons));
        }
        else {
          console.log("Pokemons are already set in session storage")
        }
      }
    )
  }

   /**
 * get will return a object that can be used as a property in the HTML-component
 * Will return the Login object that contains user information.
 * @return {Login[]} returns Login object containing user information from login service
 */
  get user(): Login[] {
    return this.loginService.getUser()
  }

 /**
 * Function is run when client attempts to login to the application.
 * Function will call the dependency injected loginService and set a user to the API if the entry does not exist.
 * @return {void} returns void
 */
  onNavigate() {
    this.loginService.queryUser(this.username).subscribe((res: Login[]) => {
      if (res.length == 0) {
        this.loginService.setUserToApi(this.username).subscribe((res: Login[]) => {
          localStorage.setItem("current-user", JSON.stringify([res]))
          console.log("----User set to API-----")
          this.router.navigateByUrl('/catalogue');
        })
      }
      else {
        localStorage.setItem("current-user", JSON.stringify(res))
        console.log("----User query found -----")
        this.router.navigateByUrl('/catalogue');
      }
    })
  }

 /**
 * Function is run when client attempts to login to the application.
 * It will check if the user already is set to local storage.
 * If not the onNavigate() function will set a new user to the API and update the storage.
 * @return {void} returns void
 */
  onSubmit() {
    let current_user = localStorage.getItem('current-user')
    if(current_user === null){
      if(this.username !== ""){
          console.log("enter username")
          this.onNavigate()
      }
    }
    else {
      this.router.navigateByUrl('/catalogue');
    }
  }
}
