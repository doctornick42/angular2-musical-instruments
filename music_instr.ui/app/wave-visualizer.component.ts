import { Component, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'wave-visualizer',
    template: '<canvas id="canvas" #canvas></canvas>'
})
export class WaveVisualizerComponent {
    canvasCtx: CanvasRenderingContext2D;

    private _height: number = 0;
    private _width: number = 0;

    @Input() waveAnalyser: AnalyserNode;

    // get the element with the #canvas on it
    @ViewChild("canvas") canvas: ElementRef;

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

        setInterval(() => {
            requestAnimationFrame(() => this.draw(this.waveAnalyser, this.canvasCtx));
        }, 50);
    };

    draw(waveAnalyser: AnalyserNode, canvasContext: CanvasRenderingContext2D) {
        waveAnalyser.fftSize = 2048;
        var bufferLength = waveAnalyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);

        waveAnalyser.getByteTimeDomainData(dataArray);

        canvasContext.fillStyle = 'rgb(200, 200, 200)';
        canvasContext.fillRect(0, 0, this._width, this._height);

        canvasContext.lineWidth = 2;
        canvasContext.strokeStyle = 'rgb(0, 0, 0)';

        canvasContext.beginPath();

        var sliceWidth = this._width * 1.0 / bufferLength;
        var x = 0;

        for (var i = 0; i < bufferLength; i++) {

            var v = dataArray[i] / 128.0;
            var y = v * this._height / 2;

            if (i === 0) {
                canvasContext.moveTo(x, y);
            } else {
                canvasContext.lineTo(x, y);
            }

            x += sliceWidth;
        }

        canvasContext.lineTo(this._width, this._height / 2);
        canvasContext.stroke();
    }
}