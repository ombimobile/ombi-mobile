import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TvContent } from 'src/app/base/content-row/content-types/tv-row';
import { TvShow } from 'src/models/content';
import { RequestActionType } from 'src/models/requests';
import { TvService } from 'src/services/tv.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss'],
})
export class TvComponent implements OnInit {

  public shows: Array<TvShow> = [];

  constructor(
    private tv: TvService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchAllShows();
  }  

  ngOnDestroy() {
    this.shows = [];
  }
  
  searchChange(e) {
    (e == '' || !e) 
        ? this.fetchAllShows()
        : this.searchShows(e.detail);
  }

  public fetchAllShows() {
    this.tv.list().then((shows) => this.shows = shows);
  }

  public searchShows(term: string) {
    this.tv.search(term).then((shows) => this.shows = shows);
  }

  public content(show: TvShow) {
    return new TvContent(show);
  }

  public showContent(show: TvShow): void {
    this.router.navigate([RequestActionType.TV, show.id])
  }

}
