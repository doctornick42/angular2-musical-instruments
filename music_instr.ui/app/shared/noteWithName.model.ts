import { Note } from './note.model';

export interface NoteWithName {
    [name: string]: Note;
}