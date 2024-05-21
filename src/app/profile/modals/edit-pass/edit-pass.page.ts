import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput, IonItem, IonLabel, IonList,
  IonTitle,
  IonToolbar, ModalController
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-edit-pass',
  templateUrl: './edit-pass.page.html',
  styleUrls: ['./edit-pass.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonIcon, IonInput, IonItem, IonLabel, IonList]
})
export class EditPassPage {

  password = '';
  repeatPassword = '';

  #modalCtrl = inject(ModalController);

  editPassword() {
    if (this.password === this.repeatPassword) {
      this.#modalCtrl.dismiss({password: this.password}).then();
    }
  }

  close() {
    this.#modalCtrl.dismiss().then();
  }

}
