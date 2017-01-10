import { Note } from './note';

export interface NoteWithName {
    [name: string]: Note;
}