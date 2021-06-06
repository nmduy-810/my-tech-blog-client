import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService) { }

  currentUser!: User;

  categoriesItems = [
    { link: '/', title: 'Home'},
    { link: '/tech', title: 'Tech'},
    { link: '/blog', title: 'Blog'},
    { link: '/about', title: 'About'},
    { link: '/contact', title: 'Contact'},
  ];

  featuredItems = [
    { link: '/subscribe', title: 'Subscribe'},
    { link: '/login', title: 'Sign in'},
  ]

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
  }

}
