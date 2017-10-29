import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  @Input("current")
  private _current: number = 0;

  @Input("maximum")
  private _maximum: number = 100;
  

  constructor(
    private element: ElementRef
  ) { }

  ngOnInit() {
  }

  public getBarWidth(): number {
    let width = 0;
    let containerWidth = this.element.nativeElement.querySelector(".bar").offsetWidth;

    width = Math.round(containerWidth * this._current / this._maximum);

    return width;
  }

}
