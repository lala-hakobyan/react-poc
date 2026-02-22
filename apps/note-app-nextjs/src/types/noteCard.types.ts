import { Note } from '@/types/note.types';

export type NoteCardProps = {
    noteCard: NoteCardConfig;
    onEdit?: () => void;
    onDelete?: () => void;
}

export type NoteCardConfig = {
    note: Note;
    dataId?: string;
    showImage?: boolean;
    showActions?: boolean;
    isReadonly?: boolean;
}
