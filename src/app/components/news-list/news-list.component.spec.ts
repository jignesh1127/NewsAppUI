import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NewsListComponent } from './news-list.component';
import { NewsfeedService } from 'src/app/services/newsfeed.service';
import { Story } from 'src/app/models/Story';

describe('NewsListComponent', () => {
  let component: NewsListComponent;
  let fixture: ComponentFixture<NewsListComponent>;
  let newsService: NewsfeedService;

  const dummyStories: Story[] = [
    { title: 'Story 1', url: 'http://story1.com' },
    { title: 'Story 2', url: 'http://story2.com' }
  ];

  beforeEach(async () => {
    const newsServiceSpy = jasmine.createSpyObj('NewsfeedService', ['getStories', 'searchStories']);
    newsServiceSpy.getStories.and.returnValue(of(dummyStories));
    newsServiceSpy.searchStories.and.returnValue(of(dummyStories));

    await TestBed.configureTestingModule({
      declarations: [ NewsListComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: NewsfeedService, useValue: newsServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListComponent);
    component = fixture.componentInstance;
    newsService = TestBed.inject(NewsfeedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load stories on init', () => {
    expect(newsService.getStories).toHaveBeenCalledWith(1, 10);
    expect(component.stories).toEqual(dummyStories);
  });

  it('should load stories when page changes', () => {
    component.changePage(2);
    expect(newsService.getStories).toHaveBeenCalledWith(2, 10);
    expect(component.stories).toEqual(dummyStories);
  });

  it('should search stories', () => {
    const query = 'test';
    component.search(query);
    expect(newsService.searchStories).toHaveBeenCalledWith(query);
    expect(component.stories).toEqual(dummyStories);
  });
});