import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  private username:string = ''
  private password:string = ''

  centerLogin() {
    axios.post('https://aghub.miphost.com/api/broadcast/login', {
      email: this.username,
      password: this.password
    })
      .then(response => {
        // this.setCookie('token', response.data, 1)
        // this.$router.push({ name: 'ControlCenter' })
      }).catch(error => {
        console.log(error)
      })
  }
}
