import { useState, useEffect } from "react";
import { Edit2, Trash2, Save, X } from "lucide-react";
import { COLOR_OPTIONS } from "../utils/constants";

const NoteCard = ({ note, isEditing, onEdit, onDelete, onSave, onCancel }) => {
  const [editData, setEditData] = useState({
    title: note.title,
    content: note.content,
    color: note.color,
  });

  useEffect(() => {
    if (isEditing) {
      setEditData({
        title: note.title,
        content: note.content,
        color: note.color,
      });
    }
  }, [isEditing, note]);

  const handleSave = () => {
    onSave(editData);
  };

  if (isEditing) {
    return (
      <div
        className={`backdrop-blur-lg bg-gradient-to-br ${editData.color}/80 p-6 rounded-3xl border-2 border-purple-300/50 shadow-2xl transform scale-105 transition-all duration-300`}
      >
        <input
          type="text"
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          className="w-full bg-white/50 backdrop-blur-lg border border-white/50 rounded-2xl p-3 text-lg font-semibold mb-4 focus:outline-none focus:ring-4 focus:ring-purple-200/50"
        />

        <textarea
          value={editData.content}
          onChange={(e) =>
            setEditData({ ...editData, content: e.target.value })
          }
          className="w-full bg-white/50 backdrop-blur-lg border border-white/50 rounded-2xl p-3 text-sm mb-4 h-24 resize-none focus:outline-none focus:ring-4 focus:ring-purple-200/50"
        />

        {/* Color Picker */}
        <div className="mb-4">
          <div className="grid grid-cols-4 gap-2">
            {COLOR_OPTIONS.map((option, index) => (
              <button
                key={index}
                onClick={() =>
                  setEditData({ ...editData, color: option.gradient })
                }
                className={`h-8 rounded-xl ${
                  option.bg
                } border-2 transition-all duration-200 hover:scale-110 ${
                  editData.color === option.gradient
                    ? "border-gray-600 scale-110"
                    : "border-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center space-x-2 bg-green-400/80 hover:bg-green-500/80 backdrop-blur-lg text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border border-white/30"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>

          <button
            onClick={onCancel}
            className="flex-1 flex items-center justify-center space-x-2 bg-gray-400/80 hover:bg-gray-500/80 backdrop-blur-lg text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border border-white/30"
          >
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group backdrop-blur-lg bg-gradient-to-br ${note.color}/60 hover:${note.color}/80 p-6 rounded-3xl border border-white/40 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg text-gray-800 line-clamp-2 leading-tight">
          {note.title}
        </h3>

        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-2 bg-blue-400/80 hover:bg-blue-500/80 backdrop-blur-lg text-white rounded-xl transition-all duration-200 border border-white/30 hover:scale-110"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 bg-red-400/80 hover:bg-red-500/80 backdrop-blur-lg text-white rounded-xl transition-all duration-200 border border-white/30 hover:scale-110"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-4 leading-relaxed">
        {note.content}
      </p>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-600 bg-white/30 backdrop-blur-lg px-3 py-1 rounded-full border border-white/40">
          {note.date}
        </div>
        <div className="w-2 h-2 bg-white/60 rounded-full"></div>
      </div>
    </div>
  );
};

export default NoteCard;
