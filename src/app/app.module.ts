import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { ButtonComponent } from './components/button/button.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PageNotFoundComponent } from './components/404_page/page_not_found';
import { HomeComponent } from './components/home/home';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './components/movies/movie-list.component';
import { MovieComponent } from './components/movies/movie.component';
import { FooterComponent } from './components/footer/footer.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { title: "MyFavMovies"} },
  { path: 'movies/:movie_id', component: MovieComponent},
  { path: 'movies', component: MovieListComponent, data: { title: "MyFavMovies - Movies List"} },
  { path: 'wishlist', component: WishlistComponent, data: { title:"MyFavMovies - Wishlist"}},
  { path: '**', component: PageNotFoundComponent, data: { title: "PageNotFound"}},
   
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ButtonComponent,
    LayoutComponent,
    MovieListComponent,
    MovieComponent,
    PageNotFoundComponent,
    HomeComponent,
    FooterComponent,
    WishlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    ProgressSpinnerModule,
    ButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
