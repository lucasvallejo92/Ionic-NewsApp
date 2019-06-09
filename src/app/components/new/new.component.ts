import { Component, OnInit, Input } from '@angular/core';
import { IArticle } from 'src/app/interfaces/INewResponse.interface';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  @Input() new: IArticle;
  @Input() indice: number;
  @Input() favsSection: boolean;

  constructor(
    private _inAppBrowser: InAppBrowser,
    private _actionSheetController: ActionSheetController,
    private _socialSharing: SocialSharing,
    private _localDataService: LocalDataService
    ) { }

  ngOnInit() {}

  openInBrowser() {
    const browser = this._inAppBrowser.create(this.new.url, '_system');
  }

  async share() {

    const actionSheet = await this._actionSheetController.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          this._socialSharing.share(
            this.new.title,
            this.new.source.name,
            null,
            this.new.url
            );
        }
      }, {
        text: this.favsSection ? 'Eliminar' : 'Favorito',
        icon: this.favsSection ? 'trash' : 'star',
        cssClass: this.favsSection ? 'action-red' : 'action-dark',
        handler: () => {
          if (this.favsSection) {
            this._localDataService.deleteNew(this.new);
          } else {
            this._localDataService.saveNew(this.new);
          }
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
