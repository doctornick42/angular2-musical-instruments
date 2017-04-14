import { KeyboardNote } from './keyboardNote.model';
import { Injectable } from '@angular/core';

@Injectable()
export class PianoKeysKeyboardBinder {
    keyboardNotes: KeyboardNote;

    getKeyboardMapping(): KeyboardNote {
        if (this.keyboardNotes == null) {
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
        }

        return this.keyboardNotes;
    }
}