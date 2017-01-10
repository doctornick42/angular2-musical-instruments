export class Note {
    frequency: number;
    isBlackPianoKey: boolean;

    constructor(frequency: number, isBlackPianoKey?: boolean) {
        this.frequency = frequency;

        if (isBlackPianoKey != undefined) {
            this.isBlackPianoKey = isBlackPianoKey;
        }
    }
}