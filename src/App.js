import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import Header from "./components/Header";
import NoteCard from "./components/NoteCard";
import CreateNoteModal from "./components/CreateNoteModal";
import { useLocalStorage } from "./hooks/useLocalStorage";

const App = () => {
  const [notes, setNotes] = useLocalStorage("evernotes", [
    {
      id: Date.now(),
      title: "Welcome to Evernotes",
      content:
        "Start creating beautiful notes with our modern interface! Your notes are automatically saved to local storage.",
      date: new Date().toLocaleDateString(),
      color: "from-pink-200 to-purple-200",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    color: "from-pink-200 to-purple-200",
  });

  // Filter notes based on search term
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Create new note
  const handleCreateNote = () => {
    if (newNote.title.trim() || newNote.content.trim()) {
      const note = {
        id: Date.now(),
        title: newNote.title || "Untitled Note",
        content: newNote.content,
        date: new Date().toLocaleDateString(),
        color: newNote.color,
      };
      setNotes([note, ...notes]);
      setNewNote({
        title: "",
        content: "",
        color: "from-pink-200 to-purple-200",
      });
      setIsCreating(false);
    }
  };

  // Delete note
  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Edit note
  const handleEditNote = (id) => {
    setEditingId(id);
  };

  // Save edited note
  const handleSaveNote = (id, updatedNote) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, ...updatedNote, date: new Date().toLocaleDateString() }
          : note
      )
    );
    setEditingId(null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 sm:p-6 lg:p-8">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-96 right-10 w-72 h-72 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onCreateNote={() => setIsCreating(true)}
        />

        <CreateNoteModal
          isOpen={isCreating}
          onClose={() => setIsCreating(false)}
          newNote={newNote}
          setNewNote={setNewNote}
          onSave={handleCreateNote}
        />

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              isEditing={editingId === note.id}
              onEdit={() => handleEditNote(note.id)}
              onDelete={() => handleDeleteNote(note.id)}
              onSave={(updatedNote) => handleSaveNote(note.id, updatedNote)}
              onCancel={handleCancelEdit}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredNotes.length === 0 && (
          <div className="text-center py-16">
            <div className="backdrop-blur-lg bg-white/20 rounded-3xl p-12 border border-white/30 max-w-md mx-auto">
              <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {searchTerm ? "No notes found" : "No notes yet"}
              </div>
              <div className="text-gray-600">
                {searchTerm
                  ? "Try a different search term"
                  : "Create your first beautiful note to get started"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
