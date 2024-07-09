import { Component, OnInit } from '@angular/core';
import { Story } from 'src/app/models/Story';
import { NewsfeedService } from 'src/app/services/newsfeed.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  stories: Story[] = [];
  page = 1;
  pageSize = 10;
  loading = false; 

  constructor(private newsService: NewsfeedService) {}

  ngOnInit(): void {
    this.loadStories();
  }

 loadStories(): void {
    this.loading = true;
    this.newsService.getStories(this.page, this.pageSize).subscribe(
      stories => {
        this.stories = stories;
        this.loading = false;
      },
      error => {
        console.error('Error fetching stories', error);
        this.loading = false;
      }
    );
  }

  search(query: string): void {
    this.loading = true;
    if(query==="") {
      this.loadStories();
    }
    else {
      this.newsService.searchStories(query).subscribe(
        stories => {
          this.stories = stories;
          this.loading = false;
        },
        error => {
          console.error('Error searching stories', error);
          this.loading = false;
        }
      );
    }
  }

  changePage(page: number): void {
    this.page = page;
    this.loadStories();
  }

}
