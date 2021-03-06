import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AF } from '../providers/af';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css','../app.component.css']
})
export class NewUserComponent implements OnInit {
  public passError = false;
  constructor(public fireService: AF, private router: Router) { }

  ngOnInit() {
  }
  cancel(){
    this.router.navigate(['login']);
  }
  confirm(firstName: HTMLInputElement, username: HTMLInputElement, email: HTMLInputElement, password: HTMLInputElement){
    this.fireService.signup(email.value, password.value).then((data) => {
      this.router.navigate(['user']);
      console.log('Nice, it worked!');
      var userInfo = {
        uid: data.uid,
        firstName: firstName.value,
        username: username.value
      };
      this.fireService.pushToDatabase("user", userInfo);
    })
    .catch(err => {
      console.log('Something went wrong:',err.message);
        this.passError = true;
        setTimeout(function() {
          this.passError = false;
          console.log(this.passError);
        }.bind(this), 3000);
    });
  }
}
