import { Component, OnInit, ElementRef, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: '<app-input-range>',
    templateUrl: './input-range.component.html',
    styleUrls: ['./input-range.component.css'],
    
    providers: [{
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputRangeComponent),
            multi: true
        }
    ]
})
export class InputRangeComponent implements OnInit, ControlValueAccessor{
    private dragging : boolean = false;
    
    @Input() private minimum: number = 0;
    @Input() private maximum: number = 100;
    
    @Input("value") _value: number = 0;

    @Input() private forceInteger : boolean = true
    
    @Input() name: string;
    
    private position: number = 0;
    
    private propagateChange = (_: any) => {};
    
    constructor(private element: ElementRef) { }
    
    
    /* start dragging */
    public mousedown() : void {
        this.dragging = true;
    }
    
    private updateCursorPosition(x: number) : void {
        var barElement = this.getBarElement();
        var cursorElement = this.getCursorElement();
        var left = x - barElement.getBoundingClientRect().left;
        
        let ratio = left / barElement.offsetWidth;
        
        ratio = Math.min(1, ratio);
        ratio = Math.max(0, ratio);
        
        this._value = ratio * this.maximum + this.minimum; 
        
        if(this.forceInteger) {
            this._value = Math.round(this._value);    
        }
        
        this.position = ratio * barElement.offsetWidth - cursorElement.offsetWidth/2;
        
        this.propagateChange(this._value);
    }

    private updateValue(value: number) : void {
        
        if(value !== this._value) {
            
            var barElement = this.getBarElement();
            var cursorElement = this.getCursorElement();
            
            this._value = value;   
            this._value = Math.min(this._value, this.maximum);
            this._value = Math.max(this._value, this.minimum);
            
            if(this.forceInteger) {
                value = Math.round(this._value);    
            }
            
            let ratio = this._value / (this.maximum - this.minimum);
            
            this.position = ratio * barElement.offsetWidth - cursorElement.offsetWidth/2;
            
            this.propagateChange(this._value);
        }
    }

    private getCursorElement() : any {
        return this.element.nativeElement.querySelector(".js-inputRange-cursor");
    }
    
    private getBarElement() : any {
        return this.element.nativeElement.querySelector(".js-inputRange-bar");
    }
    
    public release() : void {
        this.dragging = false;    
    }
    
    public ngOnInit() {
        /* stop dragging on mouse up anywhere on window */
        window.addEventListener("mouseup", () => this.release());
        
        /* update value on mouse move any where on window */
        window.addEventListener("mousemove", (e) => this.dragging ? this.updateCursorPosition(e.x) : false);
        
        this.updateValue(this._value);
    }
    
    public writeValue(value: any) : void{
        this.updateValue(value);
    }

    public registerOnChange(fn) : void{
        this.propagateChange = fn;
    }
    
    public registerOnTouched() {
        
    }
    
    set value(value) {
        this.updateValue(value);
    }
    
    get value() : number{
        return this._value;    
    }
}