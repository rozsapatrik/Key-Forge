export class NewItemModule {
  id : string;
  description: string;
  image: string;
  name: string;
  price: number;

  constructor(NewItemModule: NewItemModule)
  {
    this.id = NewItemModule.id;
    this.description = NewItemModule.description;
    this.image = NewItemModule.image;
    this.name = NewItemModule.name;
    this.price = NewItemModule.price;
  }
}
