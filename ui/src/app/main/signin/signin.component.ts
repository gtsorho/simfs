import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  public username:string = ''
  public password:string = ''

  constructor(private router: Router){
  }
  
  centerLogin() {
    axios.post('https://aghub.miphost.com/api/broadcast/login', {
      email: this.username,
      password: this.password
    })
      .then((response:any) => {
        window.location.href = `https://aghub.miphost.com/audit?order=${response.data}`
      }).catch(error => {
        console.log(error)
      })
  }
}
