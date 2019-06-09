import { Component } from '@angular/core';
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  sldOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  }

  constructor(public _localDataService: LocalDataService) {}

}
