import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
  ModalController
} from '@ionic/angular/standalone';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonRadio, IonRadioGroup, IonInput],
})
export class EditProfilePage implements OnInit {

  userName = '';
  email = '';

  #userService = inject(UserService);
  #modalCtrl = inject(ModalController);

  ngOnInit() {
    this.#userService.getOwnUser().subscribe(user => {
      this.userName = user.name;
      this.email = user.email;
    });
  }

  editProfile() {
    this.#modalCtrl.dismiss({name: this.userName, email: this.email}).then();
  }

  close() {
    this.#modalCtrl.dismiss().then();
  }

}
