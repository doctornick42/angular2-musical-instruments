import { Component, HostListener, Renderer, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Route }  from '@angular/router';
import { NoteWithName } from './noteWithName';
import { KeyboardNote } from './keyboardNote';
import { Note } from './note';
import { VoiceWithKey } from './voiceWithKey';
import { Voice } from './voice';

@Component({
    selector: 'polyphonic-synth',
    templateUrl: 'app/polyphonic-synth.component.html',
    styleUrls: ['app/simple-synth.component.css']
})
export class PolyphonicSynthComponent {

    audioCtx: AudioContext;
    oscillators: VoiceWithKey;
    volumeFilter: GainNode;
    waveAnalyzer: AnalyserNode;

    canvasCtx: CanvasRenderingContext2D;

    volume: number;
    release: number;
    attack: number;

    frequencies: NoteWithName;
    keyboardNotes: KeyboardNote;

    availableWaveForms: Array<string>;
    currentWaveForm: string;

    pressedFrequencies: Array<number>;

    constructor(private window: Window, private renderer: Renderer, private elementRef: ElementRef) {
        this.initFrequencies();
        this.initKeyboardBinding();

        this.availableWaveForms = ['sine', 'square', 'sawtooth', 'triangle'];

        this.audioCtx = new AudioContext(); //(window.AudioContext || window.webkitAudioContext)();
        this.oscillators = {};

        this.waveAnalyzer = this.audioCtx.createAnalyser();
        this.waveAnalyzer.connect(this.audioCtx.destination);

        this.volume = 50;
        this.release = 0;
        this.attack = 7;

        this.pressedFrequencies = [];
        this.currentWaveForm = this.availableWaveForms[0];
    };

    playSound(noteKey: string) {
        if (!this.oscillators[noteKey]) {
            let newVoice: Voice = new Voice(this.audioCtx, this.frequencies[noteKey].frequency, this.currentWaveForm);
            newVoice.gainNode.connect(this.waveAnalyzer);
            //this.waveAnalyzer.connect(this.audioCtx.destination);

            newVoice.gainNode.gain.linearRampToValueAtTime(this.volume / 100,
                this.audioCtx.currentTime + this.attack / 100);

            this.oscillators[noteKey] = newVoice;
        } else {
            this.oscillators[noteKey].oscillatorNode.type = this.currentWaveForm;
            this.oscillators[noteKey].gainNode.gain.linearRampToValueAtTime(this.volume / 100,
                this.audioCtx.currentTime + this.attack / 100);
        }

        let pressedFrequencyIndex = this.pressedFrequencies.indexOf(this.frequencies[noteKey].frequency);
        if (pressedFrequencyIndex === -1) {

            this.pressedFrequencies.push(this.frequencies[noteKey].frequency);
        }
    };

    muteSound(noteKey: string) {
        if (this.oscillators[noteKey]) {
            this.oscillators[noteKey].gainNode.gain.linearRampToValueAtTime(0,
                this.audioCtx.currentTime + this.attack / 100 + this.release / 100);
        }

        let pressedFrequencyIndex = this.pressedFrequencies.indexOf(this.frequencies[noteKey].frequency);
        if (pressedFrequencyIndex > -1) {
            this.pressedFrequencies.splice(pressedFrequencyIndex, 1);
        }
    };

    onWaveFormChange(newValue: string) {
        this.currentWaveForm = newValue;
    };

    private initFrequencies() {
        this.frequencies = {};

        this.frequencies["C0"] = new Note(261.626);
        this.frequencies["C#0"] = new Note(277.183);
        this.frequencies["D0"] = new Note(293.665);
        this.frequencies["D#0"] = new Note(311.127);
        this.frequencies["E0"] = new Note(329.628);
        this.frequencies["F0"] = new Note(349.228);
        this.frequencies["F#0"] = new Note(369.994);
        this.frequencies["G0"] = new Note(391.995);
        this.frequencies["G#0"] = new Note(415.305);
        this.frequencies["A0"] = new Note(440);
        this.frequencies["A#0"] = new Note(466.164);
        this.frequencies["H0"] = new Note(493.883);

        this.frequencies["C1"] = new Note(2 * this.frequencies["C0"].frequency);
        this.frequencies["C#1"] = new Note(2 * this.frequencies["C#0"].frequency);
        this.frequencies["D1"] = new Note(2 * this.frequencies["D0"].frequency);
        this.frequencies["D#1"] = new Note(2 * this.frequencies["D#0"].frequency);
        this.frequencies["E1"] = new Note(2 * this.frequencies["E0"].frequency);
        this.frequencies["F1"] = new Note(2 * this.frequencies["F0"].frequency);
        this.frequencies["F#1"] = new Note(2 * this.frequencies["F#0"].frequency);
        this.frequencies["G1"] = new Note(2 * this.frequencies["G0"].frequency);
        this.frequencies["G#1"] = new Note(2 * this.frequencies["G#0"].frequency);
        this.frequencies["A1"] = new Note(2 * this.frequencies["A0"].frequency);
        this.frequencies["A#1"] = new Note(2 * this.frequencies["A#0"].frequency);
        this.frequencies["H1"] = new Note(2 * this.frequencies["H0"].frequency);

        this.frequencies["C2"] = new Note(2 * this.frequencies["C1"].frequency);
        this.frequencies["C#2"] = new Note(2 * this.frequencies["C#1"].frequency);
        this.frequencies["D2"] = new Note(2 * this.frequencies["D1"].frequency);
        this.frequencies["D#2"] = new Note(2 * this.frequencies["D#1"].frequency);
        this.frequencies["E2"] = new Note(2 * this.frequencies["E1"].frequency);
        this.frequencies["F2"] = new Note(2 * this.frequencies["F1"].frequency);
        this.frequencies["F#2"] = new Note(2 * this.frequencies["F#1"].frequency);
        this.frequencies["G2"] = new Note(2 * this.frequencies["G1"].frequency);
        this.frequencies["G#2"] = new Note(2 * this.frequencies["G#1"].frequency);
        this.frequencies["A2"] = new Note(2 * this.frequencies["A1"].frequency);
        this.frequencies["A#2"] = new Note(2 * this.frequencies["A#1"].frequency);
        this.frequencies["H2"] = new Note(2 * this.frequencies["H1"].frequency);

        for (let key in this.frequencies) {
            this.frequencies[key].isBlackPianoKey = key.indexOf('#') > -1;
        }
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
        if (this.elementRef.nativeElement.offsetParent == null) {
            return;
        }

        let currentKey = this.keyboardNotes[event.keyCode];
        if (currentKey) {
            //this.playSound(this.frequencies[this.keyboardNotes[event.keyCode]]);
            this.playSound(this.keyboardNotes[event.keyCode]);
        }
    };

    @HostListener('document:keyup', ['$event'])
    muteSoundWithKeyboard(event: KeyboardEvent) {
        if (this.elementRef.nativeElement.offsetParent == null) {
            return;
        }

        let currentKey = this.keyboardNotes[event.keyCode];
        if (currentKey) {
            //this.muteSound(this.frequencies[this.keyboardNotes[event.keyCode]]);
            this.muteSound(this.keyboardNotes[event.keyCode]);
        }
    };

    isKeyPressed(noteKey: string): boolean {
        let pressedFrequencyIndex = this.pressedFrequencies.indexOf(this.frequencies[noteKey].frequency);
        return pressedFrequencyIndex != -1;
    };
}
export const PolyphonicSynthComponentRoutes: Route[] = [{ path: 'polyphonic-synth', component: PolyphonicSynthComponent }];