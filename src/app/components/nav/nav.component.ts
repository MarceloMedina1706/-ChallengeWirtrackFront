import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private route: Router, private location: Location) { }


  routeActive: string = "";


  ngOnInit(): void {
    this.route.events.subscribe(() => {
      this.routeActive = this.route.url;
    })
  }

}
