import { CommonModule } from '@angular/common';
import {Component, effect, inject} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
  IonHeader, IonToolbar, IonTitle, Platform, IonAvatar, IonImg, NavController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline,
  personSharp,
  pricetagOutline,
  addOutline,
  pricetagSharp,
  addSharp,
  bagOutline,
  bagSharp,
  logIn,
  documentText,
  arrowUndoCircle,
  camera,
  images,
  checkmarkCircle,
  eye,
  menu,
  add,
  trash,
  close,
  logOut,
  pencil,
  informationCircle,
  pricetag,
  location,
  heart,
  heartOutline,
  cashOutline,
  filterOutline,
  mapOutline, navigate, createOutline, lockClosedOutline, cameraOutline
} from 'ionicons/icons';
import { User } from "./auth/interfaces/user";
import { AuthService } from "./auth/service/auth.service";
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [HttpClientModule, RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonAvatar, IonImg],
})
export class AppComponent {
  user: User | null = null;
  #authService = inject(AuthService);
  #platform = inject(Platform);
  #navCtrl = inject(NavController);

  public appPages = [
    { title: 'Profile', url: '/profile', icon: 'person' },
    { title: 'Products', url: '/products', icon: 'bag' },
    { title: 'Add product', url: '/products/add', icon: 'add' },
  ];

  constructor() {
    addIcons({  personOutline, personSharp, pricetagOutline, pricetagSharp, addOutline, addSharp, bagSharp, bagOutline, logIn, documentText,
    arrowUndoCircle, camera, images, checkmarkCircle, add, menu, trash, eye, close, logOut, pencil, informationCircle, pricetag, location, heart, heartOutline,
    cashOutline, filterOutline, mapOutline, navigate, createOutline, lockClosedOutline, cameraOutline});

    effect(() => {
      if (this.#authService.isLogged()) {
        this.#authService.getProfile().subscribe(user => {this.user = user});
      } else {
        this.user = null;
      }
    });

    this.initializeApp().then();
  }

  async initializeApp() {
    if (this.#platform.is('capacitor')) {
      await this.#platform.ready();
      SplashScreen.hide().then();
      StatusBar.setBackgroundColor({color: '#3880ff'}).then();
      StatusBar.setStyle({style: Style.Dark}).then();
    }
  }

  async logout() {
    await this.#authService.logout();
    this.#navCtrl.navigateRoot('/auth/login').then();
    window.location.reload();
  }

  protected readonly logOut = logOut;
}
