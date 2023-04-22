export interface NotesFetchedDateState {
  notesCardDay: string;
  notesCardMonth: string;
  notesCardYear: string;
}

export const NotesFetchedDate = (cardDate: number): NotesFetchedDateState => {
  const notesCardDay = new Date(cardDate).toLocaleString('default', {
    day: 'numeric',
  });
  const notesCardMonth = new Date(cardDate).toLocaleString('default', {
    month: 'short',
  });
  const notesCardYear = new Date(cardDate).toLocaleString('default', {
    year: 'numeric',
  });
  const notesCardCompleteDate = {
    notesCardDay,
    notesCardMonth,
    notesCardYear,
  };
  return notesCardCompleteDate;
};
