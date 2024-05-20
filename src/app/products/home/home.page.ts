import {Component, inject, Signal, computed, WritableSignal, signal, OnInit} from '@angular/core';
import {
  ModalController,
  NavController,
  IonRouterLink,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonSearchbar
} from '@ionic/angular/standalone';
import { ProductsService } from '../services/products.service';
import { RouterLink } from '@angular/router';
import {CurrencyPipe, DatePipe} from '@angular/common';
import { Product } from '../interfaces/product';
import {ProductItemPage} from "../product-item/product-item.page";
import {FormsModule} from "@angular/forms";
import {FilterPage} from "../filter/filter.page";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CurrencyPipe, RouterLink, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabButton, IonIcon, IonList, IonItem, IonThumbnail, IonLabel, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, DatePipe, ProductItemPage, IonSearchbar, FormsModule]
})
export class HomePage implements OnInit {
  products: WritableSignal<Product[]> = signal([]);
  search: WritableSignal<string> = signal('' as string);
  #productsService = inject(ProductsService);
  #navController = inject(NavController);
  #modalCtroller = inject(ModalController);

  ngOnInit(): void {
    this.getProducts();
  }

  ionViewWillEnter() {
    this.#productsService
      .getProducts()
      .subscribe((prods) => (this.products.set(prods)));
  }

  reloadProducts(refresher: IonRefresher) {
    this.#productsService
      .getProducts()
      .subscribe((prods) => {
        this.products.set(prods);
        refresher.complete().then();
      });
  }

  onProductDeleted() {
    this.ionViewWillEnter()
  }

  filteredProducts: Signal<Product[]> = computed(() =>
    this.products().filter((p) =>
      p.description.toLowerCase().includes(this.search().toLowerCase()) ||
      p.title.toLowerCase().includes(this.search().toLowerCase()))
  );

  getProducts() {
    this.#productsService.getProducts().subscribe((products) => {
      this.products.set(products);
    });
  }

  getFavProducts() {
    this.#productsService.getFavoriteProducts().subscribe((products) => {
      this.products.set(products);
    });
  }

  getSoldProducts() {
    this.#productsService.getProductsSoldByMe().subscribe((products) => {
      this.products.set(products);
    });
  }

  getBoughtProducts() {
    this.#productsService.getProductsBoughtByMe().subscribe((products) => {
      this.products.set(products);
    });
  }

  async openFilterOptions() {
    const modal = await this.#modalCtroller.create({
      component: FilterPage,
      componentProps: {
        products: this.products
      }
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data.option) {
      switch(result.data.option) {
        case 'all':
          this.getProducts();
          break;
        case 'favs':
          this.getFavProducts();
          break;
        case 'sold':
          this.getSoldProducts();
          break;
        case 'bought':
          this.getBoughtProducts();
          break;
      }
    }
  }
}
