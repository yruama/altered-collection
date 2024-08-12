import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent {
  user: User = {
    EMAIL: 'amaurylaroze@gmail.com',
    USERNAME: 'Yruama',
    PASSWORD: ''
  };

  buttonLoading = false;

  constructor(private UserService: UserService,
    private ToastService: MessageService,
    private TranslateService: TranslateService,
    private Router: Router,
    private GlobalService: GlobalService) { }

  signIn() {
    this.buttonLoading = true;
    this.UserService.signIn(this.user).subscribe({
      next: (data: any) => {
        localStorage.setItem('token', data.token);
        this.ToastService.add({
          severity: 'success',
          summary: this.TranslateService.instant('TOAST.connexion_success'),
        });

        this.GlobalService.userSignIn();

        setTimeout(() => {
          this.Router.navigate(['/']);
        }, 1500);

      }, error: (err) => {
        this.ToastService.add({
          severity: 'error',
          summary: this.TranslateService.instant('TOAST.connexion_error'),
        });
        console.error("[SignIn] : ", err)
      }, complete: () => {
        this.buttonLoading = false;
      }
    })

  }

}
