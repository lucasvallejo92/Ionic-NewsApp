import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { IArticle } from 'src/app/interfaces/INewResponse.interface';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  private subs = new SubSink();
  newsList: Array<IArticle> = [];

  constructor(private _newsService: NewsService) { }

  ngOnInit(): void {
    this.requestNews();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loadData(ev) {
    this.requestNews(ev);
  }

  requestNews(ev?) {
    this.subs.add(this._newsService.topHeadlines()
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
