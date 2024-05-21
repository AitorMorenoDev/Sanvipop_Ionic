import {Component, inject, WritableSignal, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
  IonButton,
  IonContent,
  IonHeader, IonIcon, IonRow,
  IonTitle,
  IonToolbar,
  ModalController, NavController,
  ToastController
} from '@ionic/angular/standalone';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ProductsService} from "../../services/products.service";
import {Product} from "../../interfaces/product";
import {ProductDetailPage} from "../product-detail.page";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {SelectPhotoSourcePage} from "../../../profile/modals/select-photo-source/select-photo-source.page";
import {SwiperContainer} from "swiper/swiper-element";

@Component({
  selector: 'app-product-photos',
  templateUrl: './product-photos.page.html',
  styleUrls: ['./product-photos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon, IonRow],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductPhotosPage  {

  product: WritableSignal<Product|null> = inject(ProductDetailPage).product;
  #productService = inject(ProductsService);
  photoToAdd: string = '';
  #modalCtrl = inject(ModalController);
  #toastCtrl = inject(ToastController);
  #alertCtrl = inject(AlertController);
  #navCtrl = inject(NavController);

 async mainPhoto(idPhoto: number) {
    let product = this.product();
    this.#productService.mainPhoto(this.product()!.id, idPhoto).subscribe(() => {
      this.#productService.getProduct(product!.id).subscribe(r => {
        product = r;
      })
    });

    const toast = await this.#toastCtrl.create({
      position: 'bottom',
      duration: 3000,
      message: 'Main photo changed successfully!',
      color: 'success'
    });
    await toast.present();
  }

  async deletePhoto(idPhoto: number) {
    const alert = await this.#alertCtrl.create({
      header: 'Delete product',
      message: 'Are you sure you want to delete this photo?',
      buttons: [
        {
          text: 'Ok',
          handler: () => this.handleDelete(idPhoto),
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    alert.present().then();
  }

  async handleDelete(idPhoto: number) {
    this.#productService.deletePhoto(this.product()!.id, idPhoto).subscribe(async () => {
      this.product()!.photos = this.product()!.photos.filter(photo => photo.id !== idPhoto);
      const toast = await this.#toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: 'Photo deleted successfully',
        color: 'success'
      });
      await toast.present();
      await this.#navCtrl.navigateBack('/products');
    }, async () => {
      const toast = await this.#toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: 'Error deleting photo'
      });
      await toast.present();
    });
  }

  async addPhoto() {
    const modal = await this.#modalCtrl.create({
      component: SelectPhotoSourcePage,
      componentProps: {name: 'Select Photo Source'}
    });
    await modal.present();
    const result = await modal.onWillDismiss();
    if (result.data.option) {
      switch(result.data.option) {
        case 'camera':
          await this.takePhoto();
          break;
        case 'gallery':
          await this.pickFromGallery();
          break;
      }
    }

    this.#productService.addPhotos(this.product()!.id, this.photoToAdd).subscribe();

    const toast = await this.#toastCtrl.create({
      position: 'bottom',
      duration: 3000,
      message: 'Photo added successfully!',
      color: 'success'
    });
    await toast.present();

    await this.#navCtrl.navigateBack('/products');

  }

  async takePhoto() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 200,
      width: 200,
      allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    this.photoToAdd = photo.dataUrl as string;
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 200,
      width: 200,
      allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    this.photoToAdd = photo.dataUrl as string;
  }

}
