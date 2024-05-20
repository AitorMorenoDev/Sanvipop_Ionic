import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent, IonHeader, IonText, IonTitle, IonToolbar} from '@ionic/angular/standalone';

@Component({
  selector: 'app-product-location',
  templateUrl: './product-location.page.html',
  styleUrls: ['./product-location.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonText]
})
export class ProductLocationPage {

}
