import { X } from "lucide-react";
import { COLOR_OPTIONS } from "../utils/constants";

const CreateNoteModal = ({ isOpen, onClose, newNote, setNewNote, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-lg bg-white/80 rounded-3xl p-8 w-full max-w-md border border-white/40 shadow-2xl transform animate-in zoom-in duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Create New Note
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200/50 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <input
          type="text"
          placeholder="Enter note title..."
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          className="w-full p-4 backdrop-blur-lg bg-white/50 border border-white/50 rounded-2xl mb-4 focus:outline-none focus:ring-4 focus:ring-purple-200/50 text-gray-700 placeholder-gray-500"
        />

        <textarea
          placeholder="Write your beautiful note here..."
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          className="w-full p-4 backdrop-blur-lg bg-white/50 border border-white/50 rounded-2xl mb-4 h-32 resize-none focus:outline-none focus:ring-4 focus:ring-purple-200/50 text-gray-700 placeholder-gray-500"
        />

        {/* Color Picker */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Choose Color Theme
          </label>
          <div className="grid grid-cols-4 gap-3">
            {COLOR_OPTIONS.map((option, index) => (
              <button
                key={index}
                onClick={() =>
                  setNewNote({ ...newNote, color: option.gradient })
                }
                className={`relative h-12 rounded-xl ${
                  option.bg
                } border-2 transition-all duration-200 hover:scale-110 ${
                  newNote.color === option.gradient
                    ? "border-gray-600 shadow-lg scale-110"
                    : "border-white/50"
                }`}
                title={option.name}
              >
                {newNote.color === option.gradient && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onSave}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Create Note
          </button>
          <button
            onClick={onClose}
            className="flex-1 backdrop-blur-lg bg-gray-200/50 text-gray-700 py-3 px-6 rounded-2xl hover:bg-gray-300/50 transition-all duration-200 font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNoteModal;
