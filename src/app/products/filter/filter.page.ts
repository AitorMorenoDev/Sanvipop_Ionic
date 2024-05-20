import {Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon, IonItem, IonLabel,
  IonList, IonListHeader, IonRadio, IonRadioGroup,
  IonTitle,
  IonToolbar, ModalController
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonIcon, IonList, IonListHeader, IonRadioGroup, IonItem, IonRadio, IonLabel]
})
export class FilterPage {

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
