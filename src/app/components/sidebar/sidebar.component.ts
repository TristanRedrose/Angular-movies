import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() display: boolean;
  @Output() sideCloseEvent = new EventEmitter();

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  changeSidebar() {
    if (this.display === true) {
      this.sideCloseEvent.emit();
    }
  }

  hasRoute(route: string) {
    return this.router.url !== route;
  }
}
