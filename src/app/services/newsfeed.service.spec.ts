import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NewsfeedService } from './newsfeed.service';
import { Story } from '../models/Story';

describe('NewsfeedService', () => {
  let service: NewsfeedService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Ensure HttpClientTestingModule is imported
      providers: [NewsfeedService]
    });

    service = TestBed.inject(NewsfeedService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch stories', () => {
    const dummyStories: Story[] = [
      { title: 'Story 1', url: 'http://story1.com' },
      { title: 'Story 2', url: 'http://story2.com' }
    ];

    service.getStories(1, 10).subscribe(stories => {
      expect(stories.length).toBe(2);
      expect(stories).toEqual(dummyStories);
    });

    const req = httpMock.expectOne('https://localhost:7072/api/NewsFeed/latestnews?page=1&pageSize=10');
    expect(req.request.method).toBe('GET');
    req.flush(dummyStories);
  });

  it('should search stories', () => {
    const dummyStories: Story[] = [
      { title: 'Story 3', url: 'http://story3.com' },
      { title: 'Story 4', url: 'http://story4.com' }
    ];

    service.searchStories('test').subscribe(stories => {
      expect(stories.length).toBe(2);
      expect(stories).toEqual(dummyStories);
    });

    const req = httpMock.expectOne('https://localhost:7072/api/NewsFeed/search?query=test');
    expect(req.request.method).toBe('GET');
    req.flush(dummyStories);
  });
});
