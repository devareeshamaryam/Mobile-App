

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { forwardRef, useImperativeHandle } from "react";

function EditorToolbar({ editor }: { editor: any }) {
  if (!editor) return null;
  const btn = (action: () => boolean, label: string, active?: boolean) => (
    <button
      type="button"
      onClick={action}
      className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
        active ? "bg-[#1e3a8a] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
  return (
    <div className="flex flex-wrap gap-1.5 p-2.5 border-b border-gray-200 bg-gray-50 rounded-t-lg">
      {btn(() => editor.chain().focus().toggleBold().run(),                "B",       editor.isActive("bold"))}
      {btn(() => editor.chain().focus().toggleItalic().run(),              "I",       editor.isActive("italic"))}
      {btn(() => editor.chain().focus().toggleStrike().run(),              "S̶",      editor.isActive("strike"))}
      {btn(() => editor.chain().focus().toggleHeading({ level: 2 }).run(), "H2",      editor.isActive("heading", { level: 2 }))}
      {btn(() => editor.chain().focus().toggleHeading({ level: 3 }).run(), "H3",      editor.isActive("heading", { level: 3 }))}
      {btn(() => editor.chain().focus().toggleBulletList().run(),          "• List",  editor.isActive("bulletList"))}
      {btn(() => editor.chain().focus().toggleOrderedList().run(),         "1. List", editor.isActive("orderedList"))}
      {btn(() => editor.chain().focus().toggleBlockquote().run(),          "❝",       editor.isActive("blockquote"))}
      {btn(() => editor.chain().focus().setHorizontalRule().run(),         "——",      false)}
      {btn(() => editor.chain().focus().undo().run(),                      "↩",       false)}
      {btn(() => editor.chain().focus().redo().run(),                      "↪",       false)}
    </div>
  );
}

export interface TipTapHandle {
  getHTML: () => string;
  clearContent: () => void;
}

const TipTapEditor = forwardRef<TipTapHandle>((_, ref) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Mobile ki description likhein... (features, highlights, etc.)",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[160px] px-4 py-3 focus:outline-none text-gray-800",
      },
    },
  });

  useImperativeHandle(ref, () => ({
    getHTML: () => editor?.getHTML() ?? "",
    clearContent: () => { editor?.commands.clearContent(); },
  }));

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:border-[#1e3a8a] focus-within:ring-2 focus-within:ring-blue-100 transition">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
});

TipTapEditor.displayName = "TipTapEditor";
export default TipTapEditor;