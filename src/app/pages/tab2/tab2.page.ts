import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NewsService } from 'src/app/services/news.service';
import { SubSink } from 'subsink';
import { IArticle } from 'src/app/interfaces/INewResponse.interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  
  private subs = new SubSink();
  
  @ViewChild(IonSegment) segment: IonSegment;
  
  newsList: Array<IArticle> = [];
  categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  selectedCategory: string;
  
  constructor(private _newsService: NewsService) {}
  
  ngOnInit(): void {
    this.selectedCategory = this.categories[0];
    this.segment.value = this.selectedCategory;
    this.requestNews(this.selectedCategory);
  }

  onCategoryChange(category: string) {
    this.newsList = [];
    this.selectedCategory = category;
    this.requestNews(category);
  }

  loadData(ev) {
    this.requestNews(this.selectedCategory, ev);
  }

  requestNews(category: string, ev?) {
    this.subs.add(this._newsService.byCategory(category)
    .subscribe(news => {
      if (news && news.articles.length === 0) {
        ev.target.disabled = true;
        ev.target.complete();
        return;
      }
      if (news) {
        this.newsList.push(...news.articles);
      }
      if (ev) {
        ev.target.complete();
      }
    }));
  }

}
