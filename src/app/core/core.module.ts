import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { JwtService } from './services/jwt.service';
import { HttpTokenInterceptor } from './interceptors';
import { ArticlesService } from './services/articles.service';
import { TagsService } from './services/tags.service';
import { AuthGuard } from './services/auth-guard.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    JwtService,
    UserService,
    ArticlesService,
    TagsService,
    AuthGuard
  ],
})
export class CoreModule { }
