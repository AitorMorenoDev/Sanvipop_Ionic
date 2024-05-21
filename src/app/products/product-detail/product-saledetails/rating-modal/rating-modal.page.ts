import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption,
  IonTitle,
  IonToolbar, ModalController
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.page.html',
  styleUrls: ['./rating-modal.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonIcon, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption]
})
export class RatingModalPage {

  rating: number = 0;
  comment: string = '';

  #modalCtrl = inject(ModalController);

  rateSale() {
    this.#modalCtrl.dismiss({rating: this.rating, comment: this.comment}).then();
  }

  close() {
    this.#modalCtrl.dismiss().then();
  }
}
