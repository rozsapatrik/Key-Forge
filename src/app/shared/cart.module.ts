import { NewItemModule } from "./new-item.module";

export class Cart{
  email?: string = "";
  address?: string = "";
  name?: string = "";
  phone?: string = "";
  cart?: Array<NewItemModule> = [];
}