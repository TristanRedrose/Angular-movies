import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'MyFavMovies';
  @Output() sidebarEvent= new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.sidebarEvent.emit();
  }
}
