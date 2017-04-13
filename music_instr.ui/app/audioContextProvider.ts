import { Injectable } from '@angular/core';

@Injectable()
export class AudioContextProvider {
    audioContext: AudioContext;

    getAudioContext(): AudioContext {
        if (this.audioContext == null) {
            this.audioContext = new AudioContext();
        }

        return this.audioContext;
    }
}