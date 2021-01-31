import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';

import { AuthenticationService, CredentialsService } from '@app/auth';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  config = {
    paddingAtStart: true,
    classname: 'my-sidebar-class',
    listBackgroundColor: '#ec524b',
    fontColor: '#fff',
    backgroundColor: 'rgb(208, 241, 239)',
    selectedListFontColor: '#fff',
    highlightOnSelect: true,
    collapseOnSelect: true,
    rtlLayout: false,
  };

  appitems: any = [];

  constructor(
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private media: MediaObserver,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.appitems = [
      {
        label: 'Dashboard',
        link: '/dashboard',
        icon: 'dash',
      },
      {
        label: 'Users',
        link: '/users',
        icon: 'person',
      },
      {
        label: 'Field Workers',
        link: '/fieldworkers',
        icon: 'groups',
        // hidden: true
      },
      {
        label: 'Shops',
        link: '/shops',
        icon: 'shopping_basket',
      },
      {
        label: 'Ads',
        link: '/ads',
        icon: 'play_circle_outline',
      },
      {
        label: 'Categories',
        link: '/categories',
        icon: 'view_module',
      },
      {
        label: 'Cities',
        link: '/cities',
        icon: 'cities',
      },
      {
        label: 'Feedbacks',
        link: '/feedbacks',
        icon: 'feedbacks',
      },
    ];
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
    this.notifier.notify('success', 'You have logged out successfully');
  }

  selectedItem(event: any) {
    this.router.navigate([event.link]);
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
