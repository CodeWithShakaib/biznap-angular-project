import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, untilDestroyed } from '@core';
import { AuthenticationService } from './authentication.service';
import { NotifierService } from 'angular-notifier';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    public notifier: NotifierService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  login() {
    this.isLoading = true;
    const login$ = this.authenticationService.login(this.loginForm.value);
    login$
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (credentials) => {
          log.debug(`${credentials.username} successfully logged in`);
          // this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          log.debug(`Login error: ${error}`);
          this.error = error;
        }
      );
  }

  signIn() {
    this.isLoading = true;
    let data = {
      type: 'ADMIN',
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authenticationService.signIn(data).subscribe(
      (res) => {
        if (res.message == 'success') {
          this.notifier.notify('success', 'You have logged in successfully');
          this.router.navigate(['/dashboard']);
          this.isLoading = false;
        }
      },
      (error) => {
        this.notifier.notify('error', 'Something went wrong, please try again');
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      // username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[a-zA-z]{2,4}$')]],
      password: ['', Validators.required],
      remember: true,
    });
  }
}
