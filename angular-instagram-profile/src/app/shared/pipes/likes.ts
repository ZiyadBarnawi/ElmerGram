import { inject, Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({name:'likes',standalone:true})
export class likes implements PipeTransform{

private sanitizer=inject(DomSanitizer)
    transform(value: number|string, ...args: any[]) {                
        return this.sanitizer.bypassSecurityTrustHtml(`<b>${value}</b>🤍`); 
    }
}