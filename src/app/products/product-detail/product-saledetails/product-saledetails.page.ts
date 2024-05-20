import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent, IonHeader, IonText, IonTitle, IonToolbar} from '@ionic/angular/standalone';

@Component({
  selector: 'app-product-saledetails',
  templateUrl: './product-saledetails.page.html',
  styleUrls: ['./product-saledetails.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonText]
})
export class ProductSaledetailsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
