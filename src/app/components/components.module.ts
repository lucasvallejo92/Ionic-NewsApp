import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { IonicModule } from '@ionic/angular';
import { NewComponent } from './new/new.component';

@NgModule({
  declarations: [
    NewsComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NewsComponent
  ]
})
export class ComponentsModule { }
