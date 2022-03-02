import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  successmessage: string = '';
  constructor(private AuthService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.AuthService.createUser(
      form.value.firstname,
      form.value.lastname,
      form.value.Email,
      form.value.Password
    ).subscribe((message) => {
      console.log(message);
      this.router.navigate(['/login']);
    });
  }
}
