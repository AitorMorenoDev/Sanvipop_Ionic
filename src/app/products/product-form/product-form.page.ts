import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ToastController,
  NavController,
  IonRouterLink,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonButton,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonLabel,
  IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
import { ProductsService } from '../services/products.service';
import {Product, ProductInsert, ProductUpdate} from '../interfaces/product';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {Category} from "../interfaces/category";
import {CategoriesService} from "../services/categories.service";
import {AlertController} from "@ionic/angular";
import {CanComponentDeactivate} from "../../interfaces/can-component-deactivate";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'product-form',
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss'],
  standalone: true,
  imports: [FormsModule, RouterLink, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonIcon, IonButton, IonImg, IonGrid, IonRow, IonCol, IonInput, IonLabel, IonSelect, IonSelectOption]
})
export class ProductFormPage implements OnInit, CanComponentDeactivate {
  categories: Category[] = [];
  saved = false;
  isEdit = false;
  productId = 0;

  product: ProductInsert = {
    title: '',
    description: '',
    price: 0,
    category: 0,
    mainPhoto: ''
  };

  #productsService = inject(ProductsService);
  #categoriesService = inject(CategoriesService);
  #toastCtrl = inject(ToastController);
  #nav = inject(NavController)
  #alertCtrl = inject(AlertController);
  #route = inject(ActivatedRoute);

  ngOnInit() {
    this.#categoriesService.getCategories()
      .subscribe(categories => this.categories = categories);

    this.#route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.productId = +params['id'];
        this.#productsService.getProduct(this.productId)
          .subscribe(product => {
            this.fillForm(product);
          });
      }
    });
  }

  async canDeactivate() {
    if (this.saved || this.product.title === ''
      && this.product.description === ''
      && this.product.price === 0
      && this.product.category === 0
      && this.product.mainPhoto === '') {
      return true;
    }

    return await this.confirmDiscardChanges();
  }

  private async confirmDiscardChanges(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.#alertCtrl.create({
        header: 'Discard changes?',
        message: 'Are you sure you want to discard the changes?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => resolve(false)
          },
          {
            text: 'Yes',
            handler: () => resolve(true)
          }
        ]
      }).then(alert => {
        alert.present();
      });
    });
  }

  addOrEditProduct() {

    const productUp: ProductUpdate = {
      title: this.product.title,
      description: this.product.description,
      price: this.product.price,
      category: this.product.category,
    }

    const productOperation = this.isEdit ?
      this.#productsService.editProduct(this.productId, productUp):
      this.#productsService.addProduct(this.product);

    productOperation.subscribe(
    async prod => {
          this.saved = true;

          (await this.#toastCtrl.create({
          position: 'bottom',
          duration: 3000,
          message: 'Product added succesfully',
          color: 'success'
        })).present().then();
        this.#nav.navigateRoot(['/products']).then();
      },
      async error => (await this.#toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: 'Error adding product'
      })).present());
  }

  async takePhoto() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 1024,
      width: 1024,
      allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    this.product.mainPhoto = photo.dataUrl as string;
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 1024,
      width: 1024,
      allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    this.product.mainPhoto = photo.dataUrl as string;
  }

  fillForm(product: Product) {
    this.product = {
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category.id,
      mainPhoto: product.mainPhoto
    };
  }
}
