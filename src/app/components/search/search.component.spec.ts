import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty query on init', () => {
    expect(component.query).toBe('');
  });

  it('should emit search event with query value', () => {
    spyOn(component.search, 'emit');

    component.query = 'test';
    component.onSearch();

    expect(component.search.emit).toHaveBeenCalledWith('test');
  });

  it('should emit search event when onSearch method is called', () => {
    spyOn(component.search, 'emit');

    const query = 'another test';
    component.query = query;
    component.onSearch();

    expect(component.search.emit).toHaveBeenCalledWith(query);
  });

  it('should call onSearch method when button is clicked', () => {
    spyOn(component, 'onSearch');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(component.onSearch).toHaveBeenCalled();
  });
});