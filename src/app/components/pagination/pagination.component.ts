import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() page: number = 1;
  @Output() pageChange = new EventEmitter<number>();


  constructor() { }

  ngOnInit(): void {
  }

  changePage(newPage: number): void {
    this.pageChange.emit(newPage);
  }
}
