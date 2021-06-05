import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeAuthResolver } from './home-auth-resolver.service';
import { SharedModule } from '../shared/shared.module';
import { SliderComponent } from './pages/slider/slider.component';
import { FeaturedStoriesComponent } from './pages/featured-stories/featured-stories.component';
import { RecommendedComponent } from './pages/recommended/recommended.component';
import { ArticleItemComponent } from './pages/article-item/article-item.component';
import { ArticleDetailsComponent } from './pages/article-details/article-details.component';
import { RightComponent } from './pages/right/right.component';

@NgModule({
  declarations: [
    HomeComponent, 
    SliderComponent, 
    FeaturedStoriesComponent, 
    RecommendedComponent, 
    ArticleItemComponent, 
    ArticleDetailsComponent, 
    RightComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  providers: [
    HomeAuthResolver
  ]
})
export class HomeModule { }
