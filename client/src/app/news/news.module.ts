import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NewsComponent } from './components/news/news.component'
import { NewsService } from './services/news.service'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { ShowNewsComponent } from './components/showNews/showNews.component'
import { QuillModule } from 'ngx-quill'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ReactiveFormsModule } from '@angular/forms'
import { PersistanceService } from '../shared/services/persistance.service'
import { AddNewsComponent } from './modals/components/addNews/add-news.component'


const routes = [
  {
    path: '',
    component: NewsComponent
  },
  {path: 'show_news/:url', component: ShowNewsComponent},
]

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    InfiniteScrollModule,
    RouterModule.forChild(routes),
    QuillModule.forRoot(),
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  declarations: [NewsComponent, ShowNewsComponent, AddNewsComponent],
  providers: [NewsService, PersistanceService]
})
export class NewsModule {}
