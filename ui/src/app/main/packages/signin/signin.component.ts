import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-package-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class PackageSigninComponent {

  constructor(private router: Router, private route: ActivatedRoute){
  }


  public username:string = ''
  public password:string = ''
  public data: any = {};

  ngOnInit(){
    this.route.queryParamMap.subscribe(params => {
      this.data.msg = params.get('msg');
      this.data.zone = params.get('zone');
      this.data.username = params.get('username');
    });
  }
  
  centerLogin() {
    axios.post('https://aghub.miphost.com/api/broadcast/login', {
      email: this.data.username,
      password: this.password
    })
      .then((response:any) => {
        window.location.href = `https://aghub.miphost.com/audit?msg=${this.data.msg}&order=${response.data}`
      }).catch(error => {
        console.log(error)
      })
  }
}
