import {Note} from '@/types/note.types';

export type NoteCardProps = {
    noteCard: NoteCardConfig;
    onEdit?: () => void;
    onDelete?: () => void;
}

export type NoteCardConfig = {
    note: Note;
    showImage?: boolean;
    showActions?: boolean;
}