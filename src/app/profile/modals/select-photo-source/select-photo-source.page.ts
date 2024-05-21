import {Component, inject, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem, IonLabel, IonList, IonListHeader, IonRadio, IonRadioGroup,
  IonTitle,
  IonToolbar, ModalController
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-select-photo-source',
  templateUrl: './select-photo-source.page.html',
  styleUrls: ['./select-photo-source.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonRadio, IonRadioGroup]
})
export class SelectPhotoSourcePage {

  @Input() name!: string;
  option = '';

  #modalCtrl = inject(ModalController);

  choseOption() {
    this.#modalCtrl.dismiss({option: this.option}).then();
  }

  close() {
    this.#modalCtrl.dismiss().then();
  }
}
