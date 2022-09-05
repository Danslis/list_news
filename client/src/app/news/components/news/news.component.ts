import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsService } from 'src/app/news/services/news.service';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { NewsInterface } from 'src/app/news/types/news.interface';
import { AddNewsComponent } from '../../modals/components/addNews/add-news.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'nl-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, OnDestroy {
  news: NewsInterface[];
  pageNum = 1;
  limit = 10;
  gSub: Subscription;
  nSub: Subscription;

  ngOnInit(): void {
    //localStorage.clear()
    this.initializeValues();
  }

  ngOnDestroy() {
    if (this.gSub) {
      this.gSub.unsubscribe();
    }

    if (this.nSub) {
      this.nSub.unsubscribe();
    }
  }

  constructor(
    private newsService: NewsService,
    private persistanceService: PersistanceService,
    private modalService: NgbModal
  ) {}

  initializeValues(): void {
    this.gSub = this.newsService.getNews(this.pageNum, this.limit).subscribe({
      next: (data: NewsInterface[]) => {
        let localNews = this.persistanceService.get('news');
        localNews != null
          ? (this.news = localNews.concat(data))
          : (this.news = data);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  onScroll() {
    this.loadNextPost();
  }

  loadNextPost() {
    this.pageNum = this.pageNum + 1;
    this.nSub = this.newsService.getNews(this.pageNum, this.limit).subscribe({
      next: (data: NewsInterface[]) => {
        this.news = this.news.concat(data);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  public openModal() {
    const modalRef = this.modalService.open(AddNewsComponent, {
      size: <any>'xxl',
      backdrop: 'static',
    });
    modalRef.result.then(
      (result) => {
        console.log(result);
        if (result != null) {
          this.news.unshift(result);
          let localNews: NewsInterface[] = this.persistanceService.get('news');
          if (localNews == null) {
            localNews = [];
          }
          localNews.unshift(result);
          this.persistanceService.set('news', localNews);
        }
      },
      (reason) => {}
    );
  }
}
