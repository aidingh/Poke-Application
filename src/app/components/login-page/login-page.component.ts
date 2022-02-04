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

  title: string = "Pokemon Trainer";
  username: string = "";

  @Input() login: Login | undefined;
  @Output() onUserLogin: EventEmitter<Login> = new EventEmitter()

  public users: Login[] | undefined;
  //public pokemonss: Pokemon[] | undefined;
  public pokemons: Array<Pokemon> = []


  constructor(private loginService: LoginService, private pokemonService: PokeAPIService, private router: Router) { }

  ngOnInit(): void {

    this.pokemonService.getListOfPokemonUrls().subscribe(
      (results: Array<Pokemon>) => {
        for (let p of results) {
          this.pokemons.push(p)
        }

        if (sessionStorage.getItem('pokemons') == null) {
          sessionStorage.setItem('pokemons', JSON.stringify(this.pokemons));
        }
        else {
          console.log("Pokemons are already set in local storage")
        }
      }
    )
  }

  get user(): Login[] {
    return this.loginService.getUser()
  }

  getUser(): Login[] {
    return this.loginService.getUser();
  }

  onNavigate() {
    this.loginService.queryUser(this.username).subscribe((res: Login[]) => {
      if (res.length == 0) {
        this.loginService.setUserToApi(this.username).subscribe((res: Login[]) => {
          this.users = res
          this.username = this.users[0].username
          localStorage.setItem("current-user", this.users[0].username)
          console.log("----User set to API-----")
          return
        })
      }
      else {
        this.users = res
        this.username = this.users[0].username
        localStorage.setItem("current-user", this.users[0].username)
        console.log("----User query found -----")
        return
      }
    })

    this.router.navigateByUrl('/trainer');
  }

  onSubmit() {
    if (this.username == "") {
      alert("Please enter a trainer name to continue...")
      return
    }
    else {
      this.onNavigate();
    }
  }

}
