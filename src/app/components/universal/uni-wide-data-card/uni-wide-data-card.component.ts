import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-uni-wide-data-card',
  templateUrl: './uni-wide-data-card.component.html',
  styleUrls: ['./uni-wide-data-card.component.scss'],
  animations: [
    trigger('popIntoView', [
      state('pop-in', style({ transform: 'translateX(0)', visibility: 'visible', opacity: 1 })), 
      state('pop-out', style({ transform: 'translateX(50px)', visibility: 'hidden', opacity: 0 })), // need visibility so it can't be interacted with, but opacity can be smoothly transitioned between for fading effect.
      transition('pop-in => pop-out', animate('200ms ease-out')),
      transition('pop-out => pop-in', animate('200ms ease-in')),
    ]),
  ]
})
export class UniWideDataCardComponent implements OnInit, AfterViewInit {
  @Input('styleGroup') styleGroup: number;
  @ViewChild('card') cardElementRef: ElementRef;
  @ViewChild('content') contentElementRef: ElementRef;

  public showCardContent: boolean = false;
  public cardStyle: {[key: string]: string} = {'height': '1000px'}; // Need to have placeholder height as will be set after the content size is determined in ngAfterViewInit

  private cardElement!: HTMLElement;
  private contentElement!: HTMLElement;

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cardElement = this.cardElementRef.nativeElement;
    this.contentElement = this.contentElementRef.nativeElement;
    this.cardStyle = {'height': `${Math.round(this.contentElement.offsetHeight + window.innerHeight*0.4)}px`}
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.checkForShowCardContent();
  }
  
  private checkForShowCardContent(): void {
    const mainCardHeight = this.cardElement.getBoundingClientRect().y;
    const screenHeight = window.innerHeight;
    const cardTargetHeight = this.contentElement.getBoundingClientRect().y - screenHeight * 0.06;

    this.showCardContent = mainCardHeight < cardTargetHeight;
  }

}