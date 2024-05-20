import { Component, Input, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel]
})
export class ProductDetailPage  {
  @Input() id!: number;
  product = signal<Product|null>(null);

  #productsService = inject(ProductsService);

  constructor() { }

  ionViewWillEnter() {
    this.#productsService.getProduct(this.id).subscribe(
      p => this.product.set(p)
    )
  }
}
