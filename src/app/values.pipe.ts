import {Pipe, PipeTransform} from '@angular/core';


@Pipe({name: 'values'})
export class ValuesPipe implements PipeTransform {
    transform(value: object, args?: any[]): any[] {

        let keyArr: any[] = Object.keys(value),
            dataArr = [];


        keyArr.forEach((key: any) => {
            dataArr.push(value[key]);
        });

        return dataArr;
    }
}