import {ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ActionSheetController,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonRefresher,
  IonRefresherContent, IonRouterLink,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  NavController,
  ToastController
} from '@ionic/angular/standalone';
import {Product} from "../interfaces/product";
import {ProductsService} from "../services/products.service";
import {RouterLink} from "@angular/router";
import {refresh} from "ionicons/icons";
import {AlertController} from "@ionic/angular";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'product-item',
  templateUrl: './product-item.page.html',
  styleUrls: ['./product-item.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon, RouterLink, IonLabel, IonItemGroup, IonItem, IonGrid, IonRow, IonCol, IonImg, IonText, IonItemDivider, IonRefresher, IonRefresherContent, IonRouterLink]
})
export class ProductItemPage {
  products: Product[] = [];

  #productsService = inject(ProductsService);
  #navController = inject(NavController);
  #actionSheetCtrl =inject(ActionSheetController);
  #toastCtrl = inject(ToastController);
  #alertCtrl = inject(AlertController);
  @Input() product!: Product | null;
  @Output() productDeleted = new EventEmitter<void>();

  ionViewWillEnter() {
    this.#productsService
      .getProducts()
      .subscribe((prods) => (this.products = prods));
  }

  addToFavs(product: Product) {
    this.#productsService.addFavoriteProduct(product.id!).subscribe(
      () => (product.bookmarked = true)
    );
  }

  removeFromFavs(product: Product) {
    this.#productsService.removeFavoriteProduct(product.id!).subscribe(
      () => (product.bookmarked = false)
    );
  }

  async deleteProduct(product: Product) {
    const alert = await this.#alertCtrl.create({
      header: 'Delete product',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Ok',
          handler: () => this.handleDelete(product),
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    alert.present().then();
  }

  async handleDelete(product: Product) {
    this.#productsService.deleteProduct(product.id!).subscribe(async () => {
      this.products = this.products.filter((p) => p.id !== product.id);
      const toast = await this.#toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: 'Product deleted successfully',
        color: 'success'
      });
      await toast.present();
      this.productDeleted.emit();
    }, async () => {
      const toast = await this.#toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: 'Error deleting product'
      });
      await toast.present();
    });
  }
}
