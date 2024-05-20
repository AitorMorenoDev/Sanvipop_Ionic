import {Component, inject, Input, numberAttribute, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar, IonButtons,
  IonCard, IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader, IonItem, IonLabel, IonMenuButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {UserService} from "../services/user.service";
import {User} from "../../auth/interfaces/user";
import {Coordinates} from "../../bingmaps/coordinates";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonAvatar, IonItem, IonLabel, IonButtons, IonMenuButton]
})
export class ProfilePage implements OnInit {

  #userService = inject(UserService);
  @Input({transform: numberAttribute }) id!: number;
  user: User = {email: "", lat: undefined, lng: undefined, name: "", password: "", photo: ""};
  coordinates: Coordinates = {latitude: 0, longitude: 0};

  // Booleans to show/hide the different forms
  editingProfile = false;
  editingPassword = false;

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

  editPhoto() {}
  editProfile() {}
  editPassword() {}

}
