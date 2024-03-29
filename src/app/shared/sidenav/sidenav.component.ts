import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();

  constructor(private userS: UserService) { }

  ngOnInit(): void {
  }

  close() {
    this.onCloseSidenav.emit(true);
  }

  snlogout()
  {
    return this.userS.logout();
  }
}