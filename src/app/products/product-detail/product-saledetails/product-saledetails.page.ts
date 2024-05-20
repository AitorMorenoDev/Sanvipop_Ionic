import {Component, inject, OnInit, WritableSignal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonHeader, IonImg,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Product} from "../../interfaces/product";
import {ProductDetailPage} from "../product-detail.page";

@Component({
  selector: 'app-product-saledetails',
  templateUrl: './product-saledetails.page.html',
  styleUrls: ['./product-saledetails.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonText, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonImg]
})
export class ProductSaledetailsPage {

  product: WritableSignal<Product|null> = inject(ProductDetailPage).product;
  serverRoute = "https://api.fullstackpro.es/sanvipop/";

}
