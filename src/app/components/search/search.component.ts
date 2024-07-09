import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  query: string = '';
  @Output() search = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onSearch(): void {
    this.search.emit(this.query);
  }
}
