import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code2,
  Undo2,
  Redo2,
} from "lucide-react";

export default function NotesToolbar({ editor }) {
  if (!editor) return null;

  const buttonStyle = (active) =>
    `flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-200
     ${
       active
         ? "border-blue-600 bg-blue-600 text-white"
         : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
     }`;

  return (
    <div className="flex flex-wrap items-center gap-2 border-b bg-slate-50 p-3">

      {/* Undo */}

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className={buttonStyle(false)}
      >
        <Undo2 size={18} />
      </button>

      {/* Redo */}

      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className={buttonStyle(false)}
      >
        <Redo2 size={18} />
      </button>

      <div className="mx-2 h-6 w-px bg-slate-300" />

      {/* Bold */}

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonStyle(editor.isActive("bold"))}
      >
        <Bold size={18} />
      </button>

      {/* Italic */}

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonStyle(editor.isActive("italic"))}
      >
        <Italic size={18} />
      </button>

      {/* Underline */}

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={buttonStyle(editor.isActive("underline"))}
      >
        <Underline size={18} />
      </button>

      <div className="mx-2 h-6 w-px bg-slate-300" />

      {/* Heading 1 */}

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        className={buttonStyle(
          editor.isActive("heading", { level: 1 })
        )}
      >
        <Heading1 size={18} />
      </button>

      {/* Heading 2 */}

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className={buttonStyle(
          editor.isActive("heading", { level: 2 })
        )}
      >
        <Heading2 size={18} />
      </button>

      <div className="mx-2 h-6 w-px bg-slate-300" />

      {/* Bullet List */}

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleBulletList().run()
        }
        className={buttonStyle(editor.isActive("bulletList"))}
      >
        <List size={18} />
      </button>

      {/* Ordered List */}

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleOrderedList().run()
        }
        className={buttonStyle(editor.isActive("orderedList"))}
      >
        <ListOrdered size={18} />
      </button>

      {/* Quote */}

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleBlockquote().run()
        }
        className={buttonStyle(editor.isActive("blockquote"))}
      >
        <Quote size={18} />
      </button>

      {/* Code */}

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleCodeBlock().run()
        }
        className={buttonStyle(editor.isActive("codeBlock"))}
      >
        <Code2 size={18} />
      </button>
    </div>
  );
}