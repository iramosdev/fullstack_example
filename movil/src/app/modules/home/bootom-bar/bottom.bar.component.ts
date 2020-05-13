import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    moduleId:module.id,
    selector:"BottomBar",
    templateUrl: "./bottom.bar.component.html"
})
export class BottonBarComponent { 
    @Input("index") public index:number;

    constructor(private router:RouterExtensions){}

    public onNavigate(url:string){
        this.router.navigate([url], {
            animated: false,
            clearHistory: true
        });
    }
}
