import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'checkDoubleObject'
})
export class CheckDoubleObject implements PipeTransform {
	transform(value: any, arg1: any, arg2: any): any {

        if (arg2)

        for (let index = 0; index < arg2.length; index++) {
            //console.log("arg2[index] : ", arg2[index].id)
            const element = arg2[index].id?.split('-')[0];
            
            if (element === arg1) {
                return index + 1;  
            } 
        }

        return undefined;
    }
}
