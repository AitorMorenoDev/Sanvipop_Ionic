import {Component, inject, NgZone, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCol,
  IonContent, IonGrid,
  IonHeader, IonIcon,
  IonInput,
  IonItem, IonLabel,
  IonList, IonRow,
  IonTitle,
  IonToolbar,
  NavController
} from '@ionic/angular/standalone';
import {AuthService} from "../service/auth.service";
import {AlertController} from "@ionic/angular";
import {RouterLink} from "@angular/router";
import {Geolocation} from "@capacitor/geolocation";
import {Coordinates} from "../../bingmaps/coordinates";
import {UserLogin} from "../interfaces/user";
import { FacebookLogin, FacebookLoginResponse } from '@capacitor-community/facebook-login';
import {Observable} from "rxjs";
import {GoogleAuth, User} from "@codetrix-studio/capacitor-google-auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonInput, IonGrid, IonRow, IonCol, IonButton, IonIcon, RouterLink, IonLabel]
})
export class LoginPage implements OnInit {
  email='';
  password='';
  coords?: Coordinates;
  userGoogle!: User;
  accessToken='';

  #authService = inject(AuthService);
  #alertCtrl = inject(AlertController);
  #navCtrl = inject(NavController);
  #ngZone = inject(NgZone);

  async ngOnInit() {
    try {
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true
      });
      this.coords = coordinates.coords;

      const resp= (await FacebookLogin.getCurrentAccessToken()) as FacebookLoginResponse;
      if (resp.accessToken) {
        this.accessToken = resp.accessToken.token;
      }
    } catch (error) {
      console.error("Error getting location: ", error);
      this.coords = {latitude: 0, longitude: 0};
    }
  }

  login() {
    const user = {
      email: this.email,
      password: this.password,
      lat: this.coords?.latitude,
      lng: this.coords?.longitude
    }
    this.#authService
      .login(user as UserLogin)
      .subscribe(
        () => this.#navCtrl.navigateRoot('/products'),
        async () => {
          const alert = await this.#alertCtrl.create({
            header: 'Login error',
            message: 'Incorrect email or password. Please try again.',
            buttons: ['OK']
          });
          await alert.present();
        }
      );
  }

  async googleLogin() {
    try {
      this.userGoogle = await GoogleAuth.signIn();

      this.#authService.loginGoogle({
        token: this.userGoogle.authentication.idToken,
        lat: this.coords?.latitude,
        lng: this.coords?.longitude
      }).subscribe(() => {
        this.#ngZone.run(() => {
          this.#navCtrl.navigateRoot('/products');
        });
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  async fbLogin() {
    const resp = (await FacebookLogin.login({
      permissions: ['email'],
    })) as FacebookLoginResponse;
    if (resp.accessToken) {
      this.accessToken = resp.accessToken.token;
      console.log(this.accessToken);
      this.#authService.loginFacebook({
        token: this.accessToken,
        lat: this.coords?.latitude,
        lng: this.coords?.longitude
      }).subscribe(() => {
        console.log("AQUI ENTRA")
        this.#ngZone.run(() => {
          console.log("¿Y aqui?")
          this.#navCtrl.navigateRoot('/products');
        });
      });
    }
  }

  async fbLogOut() {
    await FacebookLogin.logout()
    this.accessToken = '';
  }
}
