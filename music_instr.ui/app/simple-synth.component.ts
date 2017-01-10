import { Component, HostListener, Renderer, ViewChild, ElementRef } from '@angular/core';
import { NoteWithName } from './noteWithName';
import { KeyboardNote } from './keyboardNote';

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

    private pressedFrequencies: Array<number>;

    constructor(private window: Window, private renderer: Renderer) {
        this.initFrequencies();
        this.initKeyboardBinding();

        this.availableWaveForms = ['sine', 'square', 'sawtooth', 'triangle'];

        this.audioCtx = new AudioContext(); //(window.AudioContext || window.webkitAudioContext)();
        this.oscillator = this.audioCtx.createOscillator();
        this.oscillator.type = this.availableWaveForms[0];
        this.oscillator.frequency.value = this.frequencies["C0"]; // value in hertz
        this.oscillator.start(0);

        this.volumeFilter = this.audioCtx.createGain();
        this.volumeFilter.gain.value = 0;

        this.waveAnalyzer = this.audioCtx.createAnalyser();

        this.oscillator.connect(this.volumeFilter);
        this.volumeFilter.connect(this.waveAnalyzer);
        this.waveAnalyzer.connect(this.audioCtx.destination);

        this.volume = 50;
        this.release = 0;
        this.attack = 0;

        this.pressedFrequencies = [];
    };

    playSound(frequency: number) {
        let pressedFrequencyIndex = this.pressedFrequencies.indexOf(frequency);
        if (pressedFrequencyIndex === -1) {
            this.oscillator.frequency.value = frequency;

            this.volumeFilter.gain.linearRampToValueAtTime(this.volume / 100,
                this.audioCtx.currentTime + this.attack / 100);

            this.pressedFrequencies.push(frequency);
        }
    };

    muteSound(frequency: number) {
        let pressedFrequencyIndex = this.pressedFrequencies.indexOf(frequency);
        if (pressedFrequencyIndex > -1) {
            this.pressedFrequencies.splice(pressedFrequencyIndex, 1);
        }

        if (this.pressedFrequencies.length === 0) {
            this.volumeFilter.gain.linearRampToValueAtTime(0,
                this.audioCtx.currentTime + this.attack / 100 + this.release / 100);
        }
    };

    onWaveFormChange(newValue: string) {
        this.oscillator.type = newValue;
    };

    private initFrequencies() {
        this.frequencies = {};

        this.frequencies["C0"] = 261.626;
        this.frequencies["C#0"] = 277.183;
        this.frequencies["D0"] = 293.665;
        this.frequencies["D#0"] = 311.127;
        this.frequencies["E0"] = 329.628;
        this.frequencies["F0"] = 349.228;
        this.frequencies["F#0"] = 369.994;
        this.frequencies["G0"] = 391.995;
        this.frequencies["G#0"] = 415.305;
        this.frequencies["A0"] = 440;
        this.frequencies["A#0"] = 466.164;
        this.frequencies["H0"] = 493.883;

        this.frequencies["C1"] = 2 * this.frequencies["C0"];
        this.frequencies["C#1"] = 2 * this.frequencies["C#0"];
        this.frequencies["D1"] = 2 * this.frequencies["D0"];
        this.frequencies["D#1"] = 2 * this.frequencies["D#0"];
        this.frequencies["E1"] = 2 * this.frequencies["E0"];
        this.frequencies["F1"] = 2 * this.frequencies["F0"];
        this.frequencies["F#1"] = 2 * this.frequencies["F#0"];
        this.frequencies["G1"] = 2 * this.frequencies["G0"];
        this.frequencies["G#1"] = 2 * this.frequencies["G#0"];
        this.frequencies["A1"] = 2 * this.frequencies["A0"];
        this.frequencies["A#1"] = 2 * this.frequencies["A#0"];
        this.frequencies["H1"] = 2 * this.frequencies["H0"];

        this.frequencies["C2"] = 2 * this.frequencies["C1"];
        this.frequencies["C#2"] = 2 * this.frequencies["C#1"];
        this.frequencies["D2"] = 2 * this.frequencies["D1"];
        this.frequencies["D#2"] = 2 * this.frequencies["D#1"];
        this.frequencies["E2"] = 2 * this.frequencies["E1"];
        this.frequencies["F2"] = 2 * this.frequencies["F1"];
        this.frequencies["F#2"] = 2 * this.frequencies["F#1"];
        this.frequencies["G2"] = 2 * this.frequencies["G1"];
        this.frequencies["G#2"] = 2 * this.frequencies["G#1"];
        this.frequencies["A2"] = 2 * this.frequencies["A1"];
        this.frequencies["A#2"] = 2 * this.frequencies["A#1"];
        this.frequencies["H2"] = 2 * this.frequencies["H1"];
    };

    private initKeyboardBinding() {
        this.keyboardNotes = {};
        this.keyboardNotes[65] = 'C0';
        this.keyboardNotes[87] = 'C#0';
        this.keyboardNotes[83] = 'D0';
        this.keyboardNotes[69] = 'D#0';
        this.keyboardNotes[68] = 'E0';
        this.keyboardNotes[70] = 'F0';
        this.keyboardNotes[84] = 'F#0';
        this.keyboardNotes[71] = 'G0';
        this.keyboardNotes[89] = 'G#0';
        this.keyboardNotes[72] = 'A0';
        this.keyboardNotes[85] = 'A#0';
        this.keyboardNotes[74] = 'H0';

        this.keyboardNotes[75] = 'C1';
        this.keyboardNotes[79] = 'C#1';
        this.keyboardNotes[76] = 'D1';
        this.keyboardNotes[80] = 'D#1';
        this.keyboardNotes[186] = 'E1';
        this.keyboardNotes[222] = 'F1';
        this.keyboardNotes[221] = 'F#1';
    };

    @HostListener('document:keydown', ['$event'])
    playSoundWithKeyboard(event: KeyboardEvent) {
        let currentKey = this.keyboardNotes[event.keyCode];
        if (currentKey) {
            this.playSound(this.frequencies[this.keyboardNotes[event.keyCode]]);
        }
    };

    @HostListener('document:keyup', ['$event'])
    muteSoundWithKeyboard(event: KeyboardEvent) {
        let currentKey = this.keyboardNotes[event.keyCode];
        if (currentKey) {
            this.muteSound(this.frequencies[this.keyboardNotes[event.keyCode]]);
        }
    };
}
