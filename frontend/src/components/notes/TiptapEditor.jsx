import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import Link from "@tiptap/extension-link";

import { useEffect } from "react";

import NotesToolbar from "./NotesToolbar";

export default function TiptapEditor({ content, onChange, onWordCount }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),

      Underline,

      Highlight.configure({
        multicolor: true,
      }),

      Placeholder.configure({
        placeholder: "Start writing your notes here...",
      }),

      CharacterCount,

      Link.configure({
        openOnClick: false,
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    content,

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none min-h-[450px] focus:outline-none px-8 py-8",
      },
    },

    onUpdate({ editor }) {
      const html = editor.getHTML();

      // Only execute if the functions were successfully provided as props
      if (typeof onChange === "function") {
        onChange(html);
      }

      if (typeof onWordCount === "function") {
        onWordCount({
          words: editor.storage.characterCount.words(),
          characters: editor.storage.characterCount.characters(),
        });
      }
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className="flex min-h-[450px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
        <div className="text-slate-500">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Toolbar */}

      <div className="border-b border-slate-200 bg-slate-50">
        <NotesToolbar editor={editor} />
      </div>

      {/* Editor */}

      <EditorContent editor={editor} className="min-h-[450px] bg-white" />

      {/* Bottom Status */}

      <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-3">
        <div className="text-sm text-slate-500">
          Supports rich text, headings, code, links and highlights.
        </div>

        <div className="text-xs text-slate-400">Auto Save Enabled</div>
      </div>
    </div>
  );
}
