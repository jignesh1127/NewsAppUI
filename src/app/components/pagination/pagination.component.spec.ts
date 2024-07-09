import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit pageChange event with new page number', () => {
    spyOn(component.pageChange, 'emit');

    component.changePage(2);

    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should emit pageChange event when changePage method is called', () => {
    spyOn(component.pageChange, 'emit');

    const newPage = 3;
    component.changePage(newPage);

    expect(component.pageChange.emit).toHaveBeenCalledWith(newPage);
  });
});