import {Component, inject, WritableSignal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard, IonCardContent,
  IonCardHeader,
  IonCardTitle, IonCol,
  IonContent, IonFab, IonFabButton,
  IonHeader, IonIcon,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {BmMapDirective} from "../../../bingmaps/bm-map.directive";
import {BmMarkerDirective} from "../../../bingmaps/bm-maker.directive";
import {Coordinates} from "../../../bingmaps/coordinates";
import {Product} from "../../interfaces/product";
import {ProductDetailPage} from "../product-detail.page";
import { StartNavigation } from '@proteansoftware/capacitor-start-navigation';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'product-location',
  templateUrl: './product-location.page.html',
  styleUrls: ['./product-location.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardContent, BmMapDirective, BmMarkerDirective, IonCol, IonFab, IonFabButton, IonIcon]
})
export class ProductLocationPage {

  product: WritableSignal<Product|null> = inject(ProductDetailPage).product;

  coordinates: Coordinates = {
    latitude: this.product()!.owner.lat ?? 0,
    longitude: this.product()!.owner.lng ?? 0
  };


  startNavigation() {
    StartNavigation.launchMapsApp({
      latitude: this.coordinates.latitude,
      longitude: this.coordinates.longitude,
      name: 'Product location',
    });
  }
}
