import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Angular2TokenService } from 'angular2-token';
import { HomePage } from '../pages/home/home';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;
  currentUser: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private _tokenService: Angular2TokenService,
    private alertCtrl: AlertController
  ) {
    this._tokenService.init({
      apiBase: 'https://aj-cooper-api.herokuapp.com/api/v1'
    })

    this.initializeApp();
    this.pages = [
      { title: 'Home', component: HomePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  loginPopUp() {
    console.log('popup');
    let confirm = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        },
        {
          name: 'password',
          placeholder: 'password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            this.login(data);
          }
        }
      ]
    });
    confirm.present();
  }

  login(credentials) {
    this._tokenService
      .signIn(credentials)
      .subscribe(
      res => (this.currentUser = res.json().data),
      err => console.error('error')
      );
  }

  logout() {
    this._tokenService
      .signOut()
      .subscribe(res => console.log(res), err => console.error('error'));
    this.currentUser = undefined;
  }

  signUpPopUp() {
    console.log('popup');
    let confirm = this.alertCtrl.create({
      title: 'Sign up',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        },
        {
          name: 'password',
          placeholder: 'password',
          type: 'password'
        },
        {
          name: 'passwordConfirmation',
          placeholder: 'password confirmation',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sign up',
          handler: data => {
            this.signup(data);
          }
        }
      ]
    });
    confirm.present();
  }

  signup(credentials) {
    this._tokenService
      .registerAccount(credentials)
      .subscribe(
      res => console.log(res),
      error => console.log(error)
      );
  }
  passwordResetPopUp() {
    console.log('popup');
    let confirm = this.alertCtrl.create({
      title: 'Reset Password',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        }],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Reset Password',
          handler: data => {
            this.resetPassword(data);
          }
        }
      ]
    });
    confirm.present();
  }
  resetPassword(credentials) {
    this._tokenService
      .resetPassword(credentials)
      .subscribe(
      res => console.log(res),
      error => console.log(error)
      )
  };
}
