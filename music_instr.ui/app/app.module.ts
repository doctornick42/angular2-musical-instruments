import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ValueProvider } from '@angular/core';
import { AlertModule, TabsModule } from 'ng2-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  from './app.component';
import { SimpleSynthComponent } from './simple-synth.component';
import { WaveVisualizerComponent } from './wave-visualizer.component';
import { PolyphonicSynthComponent } from './polyphonic-synth.component';
import { KeysPipe } from './keysPipe';
import { routing } from './routes';
import { AudioContextProvider } from './audioContextProvider';
import { NotesFrequenciesBinder } from './notesFrequenciesBinder';
import { PianoKeysKeyboardBinder } from './pianoKeysKeyboardBinder';

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
        WINDOW_PROVIDER,
        AudioContextProvider,
        PianoKeysKeyboardBinder,
        NotesFrequenciesBinder
    ]
})
export class AppModule { }
