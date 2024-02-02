import { Component, HostListener, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  x = false;
  navList1: NavItem[] = [];
  navList2: NavItem[] = [];
  loggedIn!: boolean;

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.navList1 = [
      { "elm": "Login", "url": "Login", "active": false,"svg":"" },
      { "elm": "Contact", "url": "Contact", "active": false,"svg":"" }
    ];
    this.navList2 = [
      { "elm": "Profile", "url": "Profile", "active": false,"svg":"M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" },
      { "elm": "Cart", "url": "cart", "active": false,"svg":'M423.3 440.7c0 25.3-20.3 45.6-45.6 45.6s-45.8-20.3-45.8-45.6 20.6-45.8 45.8-45.8c25.4 0 45.6 20.5 45.6 45.8zm-253.9-45.8c-25.3 0-45.6 20.6-45.6 45.8s20.3 45.6 45.6 45.6 45.8-20.3 45.8-45.6-20.5-45.8-45.8-45.8zm291.7-270C158.9 124.9 81.9 112.1 0 25.7c34.4 51.7 53.3 148.9 373.1 144.2 333.3-5 130 86.1 70.8 188.9 186.7-166.7 319.4-233.9 17.2-233.9z' },
      { "elm": "Contact", "url": "Contact", "active": false,"svg":"M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256v32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9C320 371.1 289.5 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32v80 32c0 17.7 14.3 32 32 32s32-14.3 32-32V256c0-106-86-192-192-192zm64 192a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z" }
    ];

    window.addEventListener('scroll', this.onWindowScroll);

    let getPathUrl = window.location.pathname.substring(1);
    this.navList1.forEach(element => {
      (getPathUrl === element.url) ? element.active = true : element.active = false;
    });

    this.navList2.forEach(element => {
      (getPathUrl === element.url) ? element.active = true : element.active = false;
    });
    this.loggedIn=this.authService.isLoggedIn();
  }

  ngAfterViewInit() {
    // Additional logic after the view has been initialized
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onWindowScroll);
  }

  // This method will be called when the window is scrolled.
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    // Get the scroll position
    const scrollPosition = window.scrollY || window.pageYOffset;
    this.x = (scrollPosition > 0);
  }
}

interface NavItem {
  elm: string;
  url: string;
  active: boolean;
  svg: string;
}
