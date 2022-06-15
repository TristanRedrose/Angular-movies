import { Component, OnInit, } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { WishlistService } from 'src/app/services/movies/wishlist.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  display: boolean = false;
  sideIsOpen: string = "closed";
  myWishlistCount: number;
  

  constructor(private router:Router, 
    private titleService: Title, 
    private activePage: ActivatedRoute, 
    private wishlistService: WishlistService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.changeTitle();
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

  hasRoute(route: string) {
    return this.router.url === route;
  }

  changeTitle() {
    this.router.events.subscribe(event => {
      switch(true) {
        case event instanceof NavigationEnd:
          this.titleService.setTitle(this.activePage.firstChild.snapshot.data['title']);
      }
    })
  }

  logOut():void {
    this.loginService.logOut();
    this.router.navigate(["/login"])
  }
}
