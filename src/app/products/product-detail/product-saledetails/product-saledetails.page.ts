import {Component, inject, OnInit, WritableSignal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonHeader, IonIcon, IonImg,
  IonText,
  IonTitle,
  IonToolbar, ModalController, ToastController
} from '@ionic/angular/standalone';
import {Product} from "../../interfaces/product";
import {ProductDetailPage} from "../product-detail.page";
import {RatingModalPage} from "./rating-modal/rating-modal.page";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-product-saledetails',
  templateUrl: './product-saledetails.page.html',
  styleUrls: ['./product-saledetails.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonText, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonImg, IonButton, IonIcon]
})
export class ProductSaledetailsPage {

  product: WritableSignal<Product|null> = inject(ProductDetailPage).product;
  serverRoute = "https://api.fullstackpro.es/sanvipop/";
  #modalCtrl = inject(ModalController);
  #toastCtrl = inject(ToastController);
  #productsService = inject (ProductsService);

  async rateSale() {
    const modal = await this.#modalCtrl.create({
      component: RatingModalPage,
      componentProps: {name: 'Rate sale'}
    });
    await modal.present();
    const result = await modal.onDidDismiss();

    if (result.data) {
      this.#productsService.rateSale(
        this.product()!.id,
        result.data.rating,
        result.data.comment).subscribe();

      const toast = await this.#toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: 'Sale rated successfully!',
        color: 'success'
      });
      await toast.present();
    }
  }

}
