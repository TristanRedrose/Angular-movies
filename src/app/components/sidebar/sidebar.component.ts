import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() display: boolean;
  @Output() sideCloseEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  changeSidebar() {
    if (this.display === true) {
      this.sideCloseEvent.emit();
    }
  }
}
