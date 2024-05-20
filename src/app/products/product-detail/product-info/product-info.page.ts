import {Component, inject} from '@angular/core';
import {
  AlertController,
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel, IonText,
  IonToolbar,
  NavController
} from '@ionic/angular/standalone';
import {ProductsService} from '../../services/products.service';
import {ProductDetailPage} from '../product-detail.page';
import {CurrencyPipe} from '@angular/common';
import {ProductItemPage} from "../../product-item/product-item.page";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'product-info',
  templateUrl: './product-info.page.html',
  styleUrls: ['./product-info.page.scss'],
  standalone: true,
  imports: [CurrencyPipe, IonHeader, IonToolbar, IonContent, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonButton, IonIcon, IonLabel, IonItem, IonAvatar, ProductItemPage, IonText],
})
export class ProductInfoPage {
  product = inject(ProductDetailPage).product;

  #alertCtrl = inject(AlertController);
  #productsService = inject(ProductsService);
  #navController = inject(NavController);


  async buyProduct() {
    const product = this.product();
    this.#productsService.buyProduct(product!.id).subscribe(() => {
      product!.status = 3;
      this.#alertCtrl.create({
        header: 'Product bought',
        message: 'The product has been bought successfully',
        buttons: ['Ok'],
      }).then((alert) => {
        alert.present().then();
      });
    });
  }

  goBack() {
    this.#navController.navigateBack(['/products']).then();
  }
}
