import { Component, OnInit, Input } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { SubSink } from 'subsink';
import { IArticle } from 'src/app/interfaces/INewResponse.interface';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  
  @Input() news: Array<IArticle> = [];
  @Input() favsSection: boolean = false;
  
  constructor() { }
  
  ngOnInit() { }

}
