import {Component, inject, Input, numberAttribute, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar, IonButton, IonButtons,
  IonCard, IonCardContent,
  IonCardHeader,
  IonCardTitle, IonCol,
  IonContent,
  IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenuButton, IonRow, IonText,
  IonTitle,
  IonToolbar, ModalController, ToastController
} from '@ionic/angular/standalone';
import {UserService} from "../services/user.service";
import {User} from "../../auth/interfaces/user";
import {Coordinates} from "../../bingmaps/coordinates";
import {BmMapDirective} from "../../bingmaps/bm-map.directive";
import {BmMarkerDirective} from "../../bingmaps/bm-maker.directive";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {SelectPhotoSourcePage} from "../modals/select-photo-source/select-photo-source.page";
import {EditProfilePage} from "../modals/edit-profile/edit-profile.page";
import {EditPassPage} from "../modals/edit-pass/edit-pass.page";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonAvatar, IonItem, IonLabel, IonButtons, IonMenuButton, BmMapDirective, BmMarkerDirective, IonCol, IonRow, IonButton, IonIcon, IonText, IonImg]
})
export class ProfilePage implements OnInit {

  #modalCtrl = inject(ModalController);
  #toastCtrl = inject(ToastController);
  #userService = inject(UserService);
  @Input({transform: numberAttribute }) id!: number;
  user: User = {email: "", lat: undefined, lng: undefined, name: "", password: "", photo: ""};
  coordinates: Coordinates = {latitude: 0, longitude: 0};

  ngOnInit() {
    if(this.id) {
      this.#userService
        .getUser(this.id)
        .subscribe(otherUser => {
          this.user = otherUser
          this.coordinates = {latitude: this.user.lat ?? 0, longitude: this.user.lng ?? 0};
        });
    } else {
      this.#userService
        .getOwnUser()
        .subscribe(ownUser => {
            this.user = ownUser
            this.coordinates = {latitude: this.user.lat ?? 0, longitude: this.user.lng ?? 0};
          }
        );
    }
  }

  async editProfile() {
    const modal = await this.#modalCtrl.create({
      component: EditProfilePage,
      componentProps: {name: 'Edit profile'}
    });
    await modal.present();
    const result = await modal.onDidDismiss();

    if (result.data) {
      this.#userService.editUser(result.data.name, result.data.email).subscribe();
      this.user.name = result.data.name;
      this.user.email = result.data.email;

      const toast = await this.#toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: 'Profile updated successfully!',
        color: 'success'
      });
      await toast.present();
    }
  }

  async editPassword() {
    const modal = await this.#modalCtrl.create({
      component: EditPassPage,
      componentProps: {name: 'Edit password'}
    });
    await modal.present();
    const result = await modal.onDidDismiss();

    if (result.data) {
      this.#userService.editPassword(result.data.password).subscribe();

      const toast = await this.#toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: 'Password changed successfully!',
        color: 'success'
      });
      await toast.present();
    }
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

    this.user.photo = photo.dataUrl as string;
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 200,
      width: 200,
      allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    this.user.photo = photo.dataUrl as string;
  }

  async editPhoto() {
    const modal = await this.#modalCtrl.create({
      component: SelectPhotoSourcePage,
      componentProps: {name: 'Select Photo Source'}
    });
    await modal.present();
    const result = await modal.onDidDismiss();
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

    this.#userService.editPhoto(this.user.photo).subscribe();

    const toast = await this.#toastCtrl.create({
      position: 'bottom',
      duration: 3000,
      message: 'Photo updated successfully!',
      color: 'success'
    });
    await toast.present();
  }
}
