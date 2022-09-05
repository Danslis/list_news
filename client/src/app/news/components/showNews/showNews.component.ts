import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/news/services/news.service';
import { NewsInterface } from 'src/app/news/types/news.interface';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'nl-show-news',
  templateUrl: './showNews.component.html',
  styleUrls: ['./showNews.component.scss'],
})
export class ShowNewsComponent implements OnInit, OnDestroy {
  news: NewsInterface;
  url: string;
  gSub: Subscription;
  faArrowLeft = faArrowLeft;

  ngOnInit(): void {
    this.initializeValues(this.url);
  }

  ngOnDestroy() {
    if (this.gSub) {
      this.gSub.unsubscribe();
    }
  }

  constructor(private service: NewsService, private route: ActivatedRoute) {
    this.url = this.route.snapshot.paramMap.get('url');
  }

  initializeValues(url: string): void {
    this.gSub = this.service.getOneNews(url).subscribe({
      next: (data: NewsInterface) => {
        this.news = data;
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}
