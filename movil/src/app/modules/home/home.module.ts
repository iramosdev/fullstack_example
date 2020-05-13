import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { TareasComponent } from "./tareas/tareas.component";
import { BottonBarComponent } from "./bootom-bar/bottom.bar.component";
import { CommonModule } from "@angular/common";

import { registerElement } from 'nativescript-angular/element-registry';
// import { CardView } from '@nstudio/nativescript-cardview';
import { CardView } from 'nativescript-cardview';
registerElement('CardView', () => CardView);

import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular/listview-directives';
import { ProfileComponent } from "./profile/profile.component";



// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { DetalleTareaComponent } from "./detalletarea/detalletarea.component";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

const routes: Routes=[{
        path:"tareas",
        component:TareasComponent
    },
    {
        path: "profile",
        component: ProfileComponent
    },
    {
        path: "detalletarea/:id",
        component: DetalleTareaComponent
    }
    
]

@NgModule({
    imports: [
        CommonModule,
        NativeScriptUIListViewModule,
        NativeScriptRouterModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forChild(routes)
    ],
    declarations: [
        BottonBarComponent,
        TareasComponent,
        ProfileComponent,
        DetalleTareaComponent
        ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class HomeModule { }

