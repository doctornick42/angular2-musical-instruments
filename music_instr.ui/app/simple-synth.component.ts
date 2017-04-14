import { Component, HostListener, Renderer, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Route }  from '@angular/router';
import { NoteWithName } from './noteWithName';
import { KeyboardNote } from './keyboardNote';
import { Note } from './note';
import { AudioContextProvider } from './audioContextProvider';
import { NotesFrequenciesBinder } from './notesFrequenciesBinder';
import { PianoKeysKeyboardBinder } from './pianoKeysKeyboardBinder';

@Component({
    selector: 'simple-synth',
    templateUrl: 'app/simple-synth.component.html',
    styleUrls: ['app/simple-synth.component.css']
})
export class SimpleSynthComponent {

    audioCtx: AudioContext;
    oscillator: OscillatorNode;
    volumeFilter: GainNode;
    waveAnalyzer: AnalyserNode;

    canvasCtx: CanvasRenderingContext2D;

    volume: number;
    release: number;
    attack: number;

    frequencies: NoteWithName;
    keyboardNotes: KeyboardNote;

    availableWaveForms: Array<string>;

    pressedFrequencies: Array<number>;

    constructor(private elementRef: ElementRef, private audioContextProvider: AudioContextProvider,
        private notesFrequenciesBinder: NotesFrequenciesBinder, private pianoKeysKeyboardBinder: PianoKeysKeyboardBinder) {

        this.initFrequencies();
        this.initKeyboardBinding();

        this.availableWaveForms = ['sine', 'square', 'sawtooth', 'triangle'];

        this.audioCtx = audioContextProvider.getAudioContext();
        this.oscillator = this.audioCtx.createOscillator();
        this.oscillator.type = this.availableWaveForms[0];
        this.oscillator.frequency.value = this.frequencies["C0"].frequency; // value in hertz
        this.oscillator.start(0);

        this.volumeFilter = this.audioCtx.createGain();
        this.volumeFilter.gain.value = 0;

        this.waveAnalyzer = this.audioCtx.createAnalyser();

        this.oscillator.connect(this.volumeFilter);
        this.volumeFilter.connect(this.waveAnalyzer);
        this.waveAnalyzer.connect(this.audioCtx.destination);

        this.volume = 50;
        this.release = 0;
        this.attack = 7;

        this.pressedFrequencies = [];
    };

    playSound(note: Note) {
        let pressedFrequencyIndex = this.pressedFrequencies.indexOf(note.frequency);
        if (pressedFrequencyIndex === -1) {
            this.oscillator.frequency.value = note.frequency;

            this.volumeFilter.gain.linearRampToValueAtTime(this.volume / 100,
                this.audioCtx.currentTime + this.attack / 100);

            this.pressedFrequencies.push(note.frequency);
        }
    };

    muteSound(note: Note) {
        let pressedFrequencyIndex = this.pressedFrequencies.indexOf(note.frequency);
        if (pressedFrequencyIndex > -1) {
            this.pressedFrequencies.splice(pressedFrequencyIndex, 1);
        }

        if (this.pressedFrequencies.length === 0) {
            this.volumeFilter.gain.linearRampToValueAtTime(0,
                this.audioCtx.currentTime + this.attack / 100 + this.release / 100);
        } else {
            this.oscillator.frequency.value = this.pressedFrequencies[this.pressedFrequencies.length - 1];
        }
    };

    onWaveFormChange(newValue: string) {
        this.oscillator.type = newValue;
    };

    private initFrequencies() {
        this.frequencies = this.notesFrequenciesBinder.getNotesMapping();
    };

    private initKeyboardBinding() {
        this.keyboardNotes = this.pianoKeysKeyboardBinder.getKeyboardMapping();
    };

    @HostListener('document:keydown', ['$event'])
    playSoundWithKeyboard(event: KeyboardEvent) {
        if (this.elementRef.nativeElement.offsetParent == null) {
            return;
        }

        let currentKey = this.keyboardNotes[event.keyCode];
        if (currentKey) {
            this.playSound(this.frequencies[this.keyboardNotes[event.keyCode]]);
        }
    };

    @HostListener('document:keyup', ['$event'])
    muteSoundWithKeyboard(event: KeyboardEvent) {
        if (this.elementRef.nativeElement.offsetParent == null) {
            return;
        }

        let currentKey = this.keyboardNotes[event.keyCode];
        if (currentKey) {
            this.muteSound(this.frequencies[this.keyboardNotes[event.keyCode]]);
        }
    };

    isKeyPressed(noteKey: string): boolean {
        let pressedFrequencyIndex = this.pressedFrequencies.indexOf(this.frequencies[noteKey].frequency);
        return pressedFrequencyIndex != -1;
    };
}
export const SimpleSynthComponentRoutes: Route[] = [{ path: 'simple-synth', component: SimpleSynthComponent }];