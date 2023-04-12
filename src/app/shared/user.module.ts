export class User {
  email: string;
  isAdmin: false;
  address: string;
  name: string;
  phone: string;

  constructor(User: User)
  {
    this.email = User.email;
    this.isAdmin = User.isAdmin;
    this.address = User.address;
    this.name = User.name;
    this.phone = User.phone;
  }
}
