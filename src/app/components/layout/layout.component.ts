import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  display: boolean = false;
  sideIsOpen:string = "closed";

  constructor() { }

  ngOnInit(): void {
  }

  changeDisplay() {
    if (this.sideIsOpen === "closed") {
      this.display = true;
      this.sideIsOpen= "open";
      console.log(this.sideIsOpen);
    }
    else if (this.sideIsOpen === "open") {
      this.display = false;
      this.sideIsOpen= "closed";
      console.log(this.sideIsOpen);
    }
  }
}
