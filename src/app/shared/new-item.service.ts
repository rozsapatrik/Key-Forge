import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FieldPath } from 'firebase/firestore';
import { NewItemModule } from './new-item.module';

@Injectable({
  providedIn: 'root'
})
export class NewItemService {
  formData?: NewItemModule;

  constructor(private firestore: AngularFirestore) { }

  createItem(data: NewItemModule) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
          .collection("items")
          .add(data)
          .then(res => {resolve(res)}, err => reject(err));
    });
  }

  getItems(order: string, direction: "asc" | "desc") {
    return this.firestore.collection("items", ref => ref.orderBy(order, direction).limit(63)).snapshotChanges();
  }

  updateItem(data: NewItemModule) {
    let itemId = data.id;

    return new Promise<any>((resolve, reject) => {
      this.firestore.collection("items")
          .doc(itemId)
          .update(data)
          .then(res => {resolve(res)}, err => reject(err));
    });
  }

  deleteItem(data: NewItemModule) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection("items")
          .doc(data.id).delete()
          .then(res => {resolve(res)}, err => reject(err));
    });
  }
}