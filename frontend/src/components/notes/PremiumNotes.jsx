import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import TiptapEditor from "./TiptapEditor";
import NotesStatus from "./NotesStatus";

import {
  getLectureNote,
  saveLectureNote,
} from "../../services/operations/lectureAPI";

export default function PremiumNotes({ courseId, lectureId }) {
  const { token } = useSelector((state) => state.auth);

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);
  const [wordCount, setWordCount] = useState(0); // Track word count locally

  const saveTimer = useRef(null);

  /* -------------------------------
        Load Existing Notes
  -------------------------------- */
  useEffect(() => {
    if (!courseId || !lectureId || !token) return;
    loadNotes();
  }, [courseId, lectureId, token]);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const response = await getLectureNote(courseId, lectureId, token);
      if (response?.success) {
        setContent(response.data?.note || "");
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  /* -------------------------------
        Save Notes
  -------------------------------- */
  const saveNotes = async () => {
    if (!courseId || !lectureId) return;
    setSaving(true);
    try {
      const response = await saveLectureNote(
        {
          courseId,
          lectureId,
          note: content,
        },
        token
      );
      if (response?.success) {
        setSaved(true);
        setLastSaved(new Date());
      }
    } catch (err) {
      console.log(err);
    }
    setSaving(false);
  };

  /* -------------------------------
        Auto Save (Debounce)
  -------------------------------- */
  useEffect(() => {
    if (loading) return;

    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      if (!saved) {
        saveNotes();
      }
    }, 1500);

    return () => clearTimeout(saveTimer.current);
  }, [content]);

  /* -------------------------------
        Editor Handlers
  -------------------------------- */
  const handleContentChange = (html) => {
    setContent(html);
    setSaved(false);
  };

  const handleWordCountChange = (stats) => {
    setWordCount(stats.words);
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading notes data...</div>;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
      {/* Editor Component with correct props */}
      <TiptapEditor
        content={content}
        onChange={handleContentChange}
        onWordCount={handleWordCountChange}
      />

      {/* Footer Status Panel */}
      <div className="flex flex-col gap-4 border-t border-slate-200 mt-4 pt-4 md:flex-row md:items-center md:justify-between">
        <NotesStatus
          lastSaved={lastSaved}
          wordCount={wordCount}
          saving={saving}
        />

        <div className="flex items-center gap-3">
          <button
            onClick={saveNotes}
            disabled={saving}
            className="rounded-xl bg-violet-600 px-6 py-2.5 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? "Saving..." : "Save Notes"}
          </button>
        </div>
      </div>
    </div>
  );
}
