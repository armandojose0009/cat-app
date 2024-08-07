import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  async onLogin(): Promise<void> {
    if (this.loginForm.valid) {
      try {
        await this.userService.login(this.loginForm.value);
        this.router.navigate(['/protected']);
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  }
}
