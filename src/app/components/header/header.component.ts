import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public headerStartingHeight: number;
  public headerMinimumHeight: number;
  public headerPxHeight: string;
  public windowHeight: number;

  constructor() {
    this.windowHeight = window.innerHeight;
    this.headerStartingHeight = Math.round(this.windowHeight * 0.8);
    this.headerMinimumHeight = Math.round(this.windowHeight * 0.1);

    this.headerPxHeight = `${this.headerStartingHeight}px`;
  }

  ngOnInit(): void {
  }

  @HostListener('window:scroll')
  private onWindowScroll(): void {
    const adjustedHeight = this.headerStartingHeight-window.scrollY;
    this.headerPxHeight = `${Math.max(adjustedHeight , this.headerMinimumHeight )}px`;
  }

}
