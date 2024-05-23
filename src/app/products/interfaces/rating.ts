import {Product} from "./product";
import {User} from "../../auth/interfaces/user";

export interface RatingInsert {
  rating: number;
  product: number;
  comment: string;
}

export interface Rating extends Omit<RatingInsert, "product"> {
  product: Product;
  user: User;
}
