import { NoteWithName } from './noteWithName.model';
import { Note } from './note.model';
import { Injectable } from '@angular/core';

@Injectable()
export class NotesFrequenciesBinder {
    notesDictionary: NoteWithName;

    getNotesMapping(): NoteWithName {
        if (this.notesDictionary == null) {
            this.notesDictionary = {};

            this.notesDictionary["C0"] = new Note(261.626);
            this.notesDictionary["C#0"] = new Note(277.183);
            this.notesDictionary["D0"] = new Note(293.665);
            this.notesDictionary["D#0"] = new Note(311.127);
            this.notesDictionary["E0"] = new Note(329.628);
            this.notesDictionary["F0"] = new Note(349.228);
            this.notesDictionary["F#0"] = new Note(369.994);
            this.notesDictionary["G0"] = new Note(391.995);
            this.notesDictionary["G#0"] = new Note(415.305);
            this.notesDictionary["A0"] = new Note(440);
            this.notesDictionary["A#0"] = new Note(466.164);
            this.notesDictionary["H0"] = new Note(493.883);

            this.notesDictionary["C1"] = new Note(2 * this.notesDictionary["C0"].frequency);
            this.notesDictionary["C#1"] = new Note(2 * this.notesDictionary["C#0"].frequency);
            this.notesDictionary["D1"] = new Note(2 * this.notesDictionary["D0"].frequency);
            this.notesDictionary["D#1"] = new Note(2 * this.notesDictionary["D#0"].frequency);
            this.notesDictionary["E1"] = new Note(2 * this.notesDictionary["E0"].frequency);
            this.notesDictionary["F1"] = new Note(2 * this.notesDictionary["F0"].frequency);
            this.notesDictionary["F#1"] = new Note(2 * this.notesDictionary["F#0"].frequency);
            this.notesDictionary["G1"] = new Note(2 * this.notesDictionary["G0"].frequency);
            this.notesDictionary["G#1"] = new Note(2 * this.notesDictionary["G#0"].frequency);
            this.notesDictionary["A1"] = new Note(2 * this.notesDictionary["A0"].frequency);
            this.notesDictionary["A#1"] = new Note(2 * this.notesDictionary["A#0"].frequency);
            this.notesDictionary["H1"] = new Note(2 * this.notesDictionary["H0"].frequency);

            this.notesDictionary["C2"] = new Note(2 * this.notesDictionary["C1"].frequency);
            this.notesDictionary["C#2"] = new Note(2 * this.notesDictionary["C#1"].frequency);
            this.notesDictionary["D2"] = new Note(2 * this.notesDictionary["D1"].frequency);
            this.notesDictionary["D#2"] = new Note(2 * this.notesDictionary["D#1"].frequency);
            this.notesDictionary["E2"] = new Note(2 * this.notesDictionary["E1"].frequency);
            this.notesDictionary["F2"] = new Note(2 * this.notesDictionary["F1"].frequency);
            this.notesDictionary["F#2"] = new Note(2 * this.notesDictionary["F#1"].frequency);
            this.notesDictionary["G2"] = new Note(2 * this.notesDictionary["G1"].frequency);
            this.notesDictionary["G#2"] = new Note(2 * this.notesDictionary["G#1"].frequency);
            this.notesDictionary["A2"] = new Note(2 * this.notesDictionary["A1"].frequency);
            this.notesDictionary["A#2"] = new Note(2 * this.notesDictionary["A#1"].frequency);
            this.notesDictionary["H2"] = new Note(2 * this.notesDictionary["H1"].frequency);

            for (let key in this.notesDictionary) {
                this.notesDictionary[key].isBlackPianoKey = key.indexOf('#') > -1;
            }
        }

        return this.notesDictionary;
    }
}