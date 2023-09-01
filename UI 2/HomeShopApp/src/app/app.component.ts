import { Component } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HomeShop';

  brandLogoUrl = '../assets/Logo/logo.png';

  user: any = null;
  role: any = null;
  name: any = null;
  token: any = null;
  isLoggedIn: Boolean = false;

  constructor(
    public localStorageService: LocalStorageService,
    private router: Router,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.localStorageService.logout();
  }

  ngAfterContentChecked() {
    this.user = this.localStorageService.get('email');
    this.name = this.localStorageService.get('name');
    this.role = this.localStorageService.get('role');
    this.localStorageService.getUserLoggedInStatus().subscribe((status: Boolean) => {
      this.isLoggedIn = status;
    });
    this.cdref.detectChanges();
  }
}
