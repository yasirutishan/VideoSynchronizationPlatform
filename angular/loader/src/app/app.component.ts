import { Component, OnInit } from '@angular/core';
//import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import {NgxUiLoaderService,SPINNER} from  'ngx-ui-loader'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private ngxService: NgxUiLoaderService) { }
  ngOnInit() {
    this.ngxService.start(); // start foreground loading with 'default' id

    // Stop the foreground loading after 5s
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground loading with 'default' id
    }, 5000);
    
  }
}





