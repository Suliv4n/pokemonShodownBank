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
  
  @Input("colors")
  private _colors: Array<Array<number>> = [];

  @Input("maxHue")
  private _maxHue: number = 180;

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

  public getRGBColor(): string {

    let rate: number = this._current / this._maximum;
    let rgb: string = "";

    if(this._colors.length >= 2){
      let r: number = Math.min(Math.round(this._colors[0][0] + (this._colors[1][0] - this._colors[0][0]) * rate), 255);
      let g: number = Math.min(Math.round(this._colors[0][1] + (this._colors[1][1] - this._colors[0][1]) * rate), 255);
      let b: number = Math.min(Math.round(this._colors[0][2] + (this._colors[1][2] - this._colors[0][2]) * rate), 255);

      rgb = "rgb(" + [r,g,b].join(",") + ")";
    }

    return rgb;
  }

  public getHSLColor(): string {
    let rate: number = this._current / this._maximum;
    let hsl: string = "";

    let h: number = Math.round(rate * this._maxHue);
    hsl = "hsl("+h+",100%,50%)";

    return hsl;
  }

}
