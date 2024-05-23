import {Component, inject, OnInit, WritableSignal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol,
  IonContent,
  IonHeader, IonIcon, IonImg, IonRow,
  IonText,
  IonTitle,
  IonToolbar, ModalController, ToastController
} from '@ionic/angular/standalone';
import {Product} from "../../interfaces/product";
import {ProductDetailPage} from "../product-detail.page";
import {RatingModalPage} from "./rating-modal/rating-modal.page";
import {ProductsService} from "../../services/products.service";
import {Rating} from "../../interfaces/rating";

@Component({
  selector: 'app-product-saledetails',
  templateUrl: './product-saledetails.page.html',
  styleUrls: ['./product-saledetails.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonText, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonImg, IonButton, IonIcon, IonRow, IonCol]
})
export class ProductSaledetailsPage implements OnInit{

  product: WritableSignal<Product|null> = inject(ProductDetailPage).product;
  serverRoute = "https://api.fullstackpro.es/sanvipop/";
  #modalCtrl = inject(ModalController);
  #toastCtrl = inject(ToastController);
  #productsService = inject (ProductsService);
  buyerRatings: Rating[] = [];
  sellerRatings: Rating[] = [];
  ownerId = this.product()!.owner.id;

  ngOnInit() {
    this.getBuyerRatings();
    this.getSellerRatings();
    console.log(this.buyerRatings);
    console.log(this.sellerRatings);
  }

  async rateSale() {
    const modal = await this.#modalCtrl.create({
      component: RatingModalPage,
      componentProps: {name: 'Rate sale'}
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    let product = this.product()!;

    if (result.data) {
      this.#productsService.rateSale(
        product.id,
        result.data.rating,
        result.data.comment
      ).subscribe();

      console.log(product.id)
      console.log(result.data.rating)
      console.log(result.data.comment)

      const toast = await this.#toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: 'Sale rated successfully!',
        color: 'success'
      });
      await toast.present();
    }
  }

  getBuyerRatings() {
    this.#productsService.getOwnRatings().subscribe((ratings) => {
      this.buyerRatings = ratings;
    });
  }

  getSellerRatings() {
    this.#productsService.getUserRatings(this.ownerId!).subscribe((ratings) => {
      this.sellerRatings = ratings;
    });
  }

}

