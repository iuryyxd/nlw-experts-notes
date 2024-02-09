import { useState } from "react";
import { toast } from "sonner";
import Logo from "./assets/logo-nlw-experts.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

export interface INote {
  id: string;
  content: string;
  date: Date;
}

export function App() {
  const [notes, setNotes] = useState<INote[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }

    return [];
  });
  const [search, setSearch] = useState("");

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      content,
      date: new Date(),
    };

    const notesArray = [newNote, ...notes];

    setNotes(notesArray);
    localStorage.setItem("notes", JSON.stringify(notesArray));

    toast.success("Nota criada com sucesso!");
  }

  function onNoteDeleted(id: string) {
    const notesArray = notes.filter((note) => note.id !== id);

    setNotes(notesArray);
    localStorage.setItem("notes", JSON.stringify(notesArray));

    toast.success("Nota apagada com sucesso!");
  }

  const filteredNotes = search
    ? notes.filter((note) =>
        note.content.toLowerCase().includes(search.toLowerCase())
      )
    : notes;

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={Logo} alt="NLW Experts" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="h-px bg-slate-700"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
        ))}
      </div>
    </div>
  );
}
