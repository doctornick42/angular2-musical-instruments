import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ValueProvider } from '@angular/core';
import { AlertModule, TabsModule } from 'ng2-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  from './app.component';
import { SimpleSynthComponent } from './simple-synth/simple-synth.component';
import { WaveVisualizerComponent } from './shared/wave-visualizer.component';
import { PolyphonicSynthComponent } from './polyphonic-synth/polyphonic-synth.component';
import { PlotSynthComponent } from './plot-synth/plot-synth.component';
import { KeysPipe } from './shared/keysPipe.pipe';
import { routing } from './routes';
import { AudioContextProvider } from './shared/audioContext.provider';
import { NotesFrequenciesBinder } from './shared/notesFrequenciesBinder.service';
import { PianoKeysKeyboardBinder } from './shared/pianoKeysKeyboardBinder.service';

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
        PlotSynthComponent,
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
