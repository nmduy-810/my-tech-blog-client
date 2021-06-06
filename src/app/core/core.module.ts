import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { JwtService } from './services/jwt.service';
import { HttpTokenInterceptor } from './interceptors';
import { ArticleService } from './services/article.service';
import { TagService } from './services/tag.service';
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
    ArticleService,
    TagService,
    AuthGuard
  ],
})
export class CoreModule { }
