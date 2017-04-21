import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RouterModule, Route }  from '@angular/router';

import { Note } from '../shared/note.model';
import { VoiceWithKey } from '../shared/voiceWithKey.model';
import { Voice } from '../shared/voice.model';
import { AudioContextProvider } from '../shared/audioContext.provider';

@Component({
    selector: 'plot-synth',
    templateUrl: 'app/plot-synth/plot-synth.component.html',
    styleUrls: ['app/plot-synth/plot-synth.component.css']
})
export class PlotSynthComponent {
    audioCtx: AudioContext;
    oscillator: OscillatorNode;
    volumeFilter: GainNode;
    waveAnalyzer: AnalyserNode;

    canvasCtx: CanvasRenderingContext2D;

    availableWaveForms: Array<string>;

    constructor(private elementRef: ElementRef, private audioContextProvider: AudioContextProvider) {
        this.availableWaveForms = ['sine', 'square', 'sawtooth', 'triangle'];

        this.audioCtx = audioContextProvider.getAudioContext();
        this.oscillator = this.audioCtx.createOscillator();
        this.oscillator.type = this.availableWaveForms[0];
        this.oscillator.frequency.value = 0; // value in hertz
        this.oscillator.start(0);

        this.volumeFilter = this.audioCtx.createGain();
        this.volumeFilter.gain.value = 0;

        this.waveAnalyzer = this.audioCtx.createAnalyser();

        this.oscillator.connect(this.volumeFilter);
        this.volumeFilter.connect(this.waveAnalyzer);
        this.waveAnalyzer.connect(this.audioCtx.destination);
    }

    private _height: number = 0;
    private _width: number = 0;

    private _prevX: number = 0;
    private _prevY: number = 0;

    minFrequency: number = 30;
    maxFrequency: number = 5000;
    minLevel: number = 0;
    maxLevel: number = 100;

    mouseDown: boolean = false;

    // get the element with the #canvas on it
    @ViewChild("plotCanvas") canvas: ElementRef;

    ngAfterViewInit() { // wait for the view to init before using the element
        this.canvas.nativeElement.style.width = '100%';
        this.canvas.nativeElement.style.height = '100%';
        // ...then set the internal size to match
        this.canvas.nativeElement.width = this.canvas.nativeElement.offsetWidth;
        this.canvas.nativeElement.height = this.canvas.nativeElement.offsetHeight;

        this._height = this.canvas.nativeElement.height;
        this._width = this.canvas.nativeElement.width;

        this.canvasCtx = this.canvas.nativeElement.getContext("2d");

        this.canvasCtx.clearRect(0, 0, this._width, this._height);

        this.canvasCtx.fillStyle = '#c8c8c8';
        this.canvasCtx.fillRect(0, 0, this._width, this._height);

        this.canvasCtx.lineWidth = 2;
        this.canvasCtx.strokeStyle = '#000';

        this.canvasCtx.beginPath();
    };

    firePlotPoint(event: MouseEvent) {
        if (this.mouseDown) {
            var rect = this.canvas.nativeElement.getBoundingClientRect();

            var absoluteCoords = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };

            var frequency: number = this.convertCoordinateToSoundParameter(absoluteCoords.x,
                this._width, this.minFrequency, this.maxFrequency);
            var level: number = this.maxLevel / 100
                - this.convertCoordinateToSoundParameter(absoluteCoords.y, this._height, this.minLevel / 100, this.maxLevel / 100)
                + this.minLevel / 100;

            this.playSound(frequency, level);
            if (absoluteCoords.x != this._prevX || absoluteCoords.y != this._prevY) {
                this.eraseNoteLine(this._prevX, this._prevY);
            }
            this.drawNoteLine(absoluteCoords.x, absoluteCoords.y);

            this._prevX = absoluteCoords.x;
            this._prevY = absoluteCoords.y;
        }
    }

    onWaveFormChange(newValue: string) {
        this.oscillator.type = newValue;
    };

    playSound(frequency: number, level: number) {
        this.oscillator.frequency.value = frequency;
        this.volumeFilter.gain.value = level;
    }

    startSound(event: MouseEvent) {
        this.mouseDown = true;
        this.firePlotPoint(event);
    }

    stopSound(event: MouseEvent) {
        this.mouseDown = false;
        this.volumeFilter.gain.value = 0;

        var rect = this.canvas.nativeElement.getBoundingClientRect();
        var absoluteCoords = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
        this.eraseNoteLine(absoluteCoords.x, absoluteCoords.y);
    }

    drawNoteLine(xCoord: number, yCoord: number) {
        this.canvasCtx.beginPath();
        this.canvasCtx.strokeStyle = '#000';
        this.canvasCtx.moveTo(xCoord, this._height);
        this.canvasCtx.lineTo(xCoord, yCoord);
        this.canvasCtx.stroke();
    }

    eraseNoteLine(xCoord: number, yCoord: number) {
        this.canvasCtx.fillRect(xCoord - 2, yCoord, 4, this._height - yCoord + 1);
    }

    private convertCoordinateToSoundParameter(coordinateVal: number, coordinateMax: number,
        parameterMin: number, parameterMax: number) {

        var convertionRate = coordinateVal / coordinateMax;
        return (parameterMax - parameterMin) * convertionRate + parameterMin;
    }
}

export const PlotSynthComponentRoutes: Route[] = [{ path: 'plot-synth', component: PlotSynthComponent }];