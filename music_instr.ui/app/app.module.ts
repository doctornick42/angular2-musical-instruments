import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { SimpleSynthComponent } from './simple-synth.component';
import { WaveVisualizerComponent } from './wave-visualizer.component';
import { PolyphonicSynthComponent } from './polyphonic-synth.component';

import { ValueProvider } from '@angular/core';

import { KeysPipe } from './keysPipe';

import { AlertModule, TabsModule } from 'ng2-bootstrap';

import { RouterModule, Routes } from '@angular/router';

import { routing } from './routes';

const WINDOW_PROVIDER: ValueProvider = {
    provide: Window,
    useValue: window
};

@NgModule({
    imports: [
        AlertModule.forRoot(),
        TabsModule.forRoot(),
        BrowserModule,
        FormsModule,
        RouterModule,
        routing
    ],
    declarations: [
        AppComponent,
        SimpleSynthComponent,
        WaveVisualizerComponent,
        PolyphonicSynthComponent,
        KeysPipe
    ],
    bootstrap: [AppComponent],
    providers: [
        WINDOW_PROVIDER
    ]
})
export class AppModule { }
