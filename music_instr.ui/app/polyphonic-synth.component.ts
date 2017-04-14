import { Component, HostListener, Renderer, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Route }  from '@angular/router';
import { NoteWithName } from './noteWithName';
import { KeyboardNote } from './keyboardNote';
import { Note } from './note';
import { VoiceWithKey } from './voiceWithKey';
import { Voice } from './voice';
import { AudioContextProvider } from './audioContextProvider';
import { NotesFrequenciesBinder } from './notesFrequenciesBinder';
import { PianoKeysKeyboardBinder } from './pianoKeysKeyboardBinder';

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

    constructor(private elementRef: ElementRef, private audioContextProvider: AudioContextProvider,
        private notesFrequenciesBinder: NotesFrequenciesBinder, private pianoKeysKeyboardBinder: PianoKeysKeyboardBinder) {

        this.initFrequencies();
        this.initKeyboardBinding();

        this.availableWaveForms = ['sine', 'square', 'sawtooth', 'triangle'];

        this.audioCtx = audioContextProvider.getAudioContext();
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
            this.muteSound(this.keyboardNotes[event.keyCode]);
        }
    };

    isKeyPressed(noteKey: string): boolean {
        let pressedFrequencyIndex = this.pressedFrequencies.indexOf(this.frequencies[noteKey].frequency);
        return pressedFrequencyIndex != -1;
    };
}
export const PolyphonicSynthComponentRoutes: Route[] = [{ path: 'polyphonic-synth', component: PolyphonicSynthComponent }];