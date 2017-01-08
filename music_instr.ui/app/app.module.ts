import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { SimpleSynthComponent } from './simple-synth.component';

import { ValueProvider } from '@angular/core';

const WINDOW_PROVIDER: ValueProvider = {
    provide: Window,
    useValue: window
};

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent,
        SimpleSynthComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        WINDOW_PROVIDER
    ]
})
export class AppModule { }
