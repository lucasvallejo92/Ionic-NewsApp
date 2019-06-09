import { Injectable } from '@angular/core';
import { IArticle } from '../interfaces/INewResponse.interface';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  news: Array<IArticle> = [];

  constructor(private _storage: Storage, private _toastController: ToastController) {
    this.loadFavs();
  }

  async presentToast(message: string) {
    const toast = await this._toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  saveNew(article: IArticle) {
    const exists = this.news.find(art => art.title === article.title);
    if (!exists){
      this.news.unshift(article);
      this._storage.set('favs', this.news);
      this.presentToast('Guardado en favoritos.');
    }
  }

  deleteNew(article: IArticle) {
    this.news = this.news.filter(art => art.title !== article.title);
    this._storage.set('favs', this.news);
    this.presentToast('Eliminado de favoritos.');
  }

  async loadFavs() {
    const favs = await this._storage.get('favs');
    this.news = favs ? favs : [];
  }

}
