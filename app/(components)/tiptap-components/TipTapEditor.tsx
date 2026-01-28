/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";
import { useEditor, EditorContent } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Type,
} from "lucide-react";
import { useState, useEffect } from "react";

// Define available font families
const fontFamilies = [
  { name: "Default", fontFamily: "" },
  { name: "Arial", fontFamily: "Arial, sans-serif" },
  { name: "Times New Roman", fontFamily: '"Times New Roman", serif' },
  { name: "Helvetica", fontFamily: "Helvetica, Arial, sans-serif" },
  { name: "Courier New", fontFamily: '"Courier New", monospace' },
  { name: "Georgia", fontFamily: "Georgia, serif" },
  { name: "Verdana", fontFamily: "Verdana, sans-serif" },
];

// Configure FontFamily extension BEFORE using it
const FontFamilyExtension = FontFamily.configure({
  types: ["textStyle"],
});

const Tiptap = () => {
  const [currentFont, setCurrentFont] = useState<{
    name: string;
    fontFamily: string;
  }>({ name: "Default", fontFamily: "" });

  // Helper function to get the current font name and family
  const updateFontDisplay = (editorInstance: any) => {
    if (!editorInstance) return;

    const currentFontFamily =
      editorInstance.getAttributes("textStyle")?.fontFamily;
    if (!currentFontFamily) {
      setCurrentFont({ name: "Default", fontFamily: "" });
      return;
    }
    // Match the current font family to our fontFamilies array
    const matchedFont = fontFamilies.find(
      (font) => font.fontFamily === currentFontFamily,
    );
    setCurrentFont(
      matchedFont
        ? { name: matchedFont.name, fontFamily: matchedFont.fontFamily }
        : { name: currentFontFamily, fontFamily: currentFontFamily },
    );
  };

  const editor = useEditor({
    extensions: [StarterKit, TextStyle, FontFamilyExtension],
    immediatelyRender: false,
    content: "",
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      updateFontDisplay(editor);
    },
    onSelectionUpdate: ({ editor }) => {
      updateFontDisplay(editor);
    },
  });

  // Update font display when editor is ready
  useEffect(() => {
    if (editor) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      updateFontDisplay(editor);
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className=" rounded-lg overflow-hidden">
        <div className="border rounded-3xl shadow-md border-gray-300 dark:border-gray-700 p-2 flex flex-wrap items-center gap-1 bg-gray-50 dark:bg-gray-800">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-200 duration-300 dark:hover:bg-gray-700 ${
              editor.isActive("bold") ? "bg-gray-300 dark:bg-gray-600" : ""
            }`}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-200 duration-300 dark:hover:bg-gray-700 ${
              editor.isActive("italic") ? "bg-gray-300 dark:bg-gray-600" : ""
            }`}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={`p-2 rounded hover:bg-gray-200 duration-300 dark:hover:bg-gray-700 ${
              editor.isActive("strike") ? "bg-gray-300 dark:bg-gray-600" : ""
            }`}
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={`p-2 rounded hover:bg-gray-200 duration-300 dark:hover:bg-gray-700 ${
              editor.isActive("code") ? "bg-gray-300 dark:bg-gray-600" : ""
            }`}
            title="Code"
          >
            <Code className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />

          {/* Font Family Selector */}
          <div className="relative group">
            <button
              className="p-2 rounded hover:bg-gray-200 duration-300 dark:hover:bg-gray-700 flex items-center gap-1.5 px-3"
              title="Font Family"
            >
              <Type className="w-4 h-4" />
              <span
                className="text-xs font-medium min-w-[100px] text-left"
                style={{
                  fontFamily: currentFont.fontFamily || "inherit",
                }}
              >
                {currentFont.name}
              </span>
            </button>
            <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {fontFamilies.map((font) => (
                <button
                  key={font.name}
                  onClick={() => {
                    if (font.fontFamily === "") {
                      // Remove font family (reset to default)
                      editor.chain().focus().unsetFontFamily().run();
                    } else {
                      editor
                        .chain()
                        .focus()
                        .setFontFamily(font.fontFamily)
                        .run();
                    }
                    // Update display immediately
                    setTimeout(() => updateFontDisplay(editor), 0);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                  style={{
                    fontFamily: font.fontFamily || "inherit",
                  }}
                >
                  {font.name}
                </button>
              ))}
            </div>
          </div>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />

          {/* Headings */}
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`p-2 rounded hover:bg-gray-200 duration-300 dark:hover:bg-gray-700 ${
              editor.isActive("heading", { level: 1 })
                ? "bg-gray-300 dark:bg-gray-600"
                : ""
            }`}
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`p-2 rounded hover:bg-gray-200 duration-300 dark:hover:bg-gray-700 ${
              editor.isActive("heading", { level: 2 })
                ? "bg-gray-300 dark:bg-gray-600"
                : ""
            }`}
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`p-2 rounded hover:bg-gray-200 duration-300 dark:hover:bg-gray-700 ${
              editor.isActive("heading", { level: 3 })
                ? "bg-gray-300 dark:bg-gray-600"
                : ""
            }`}
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />

          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-200 duration-300 dark:hover:bg-gray-700 ${
              editor.isActive("bulletList")
                ? "bg-gray-300 dark:bg-gray-600"
                : ""
            }`}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-200 duration-300 dark:hover:bg-gray-700 ${
              editor.isActive("orderedList")
                ? "bg-gray-300 dark:bg-gray-600"
                : ""
            }`}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded hover:bg-gray-200 duration-300 dark:hover:bg-gray-700 ${
              editor.isActive("blockquote")
                ? "bg-gray-300 dark:bg-gray-600"
                : ""
            }`}
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />

          {/* Undo/Redo */}
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className="p-2 rounded hover:bg-gray-200 duration-300 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className="p-2 rounded hover:bg-gray-200 duration-300 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>

        {/* Editor Content */}
        <div className="p-4 min-h-[500px]">
          <EditorContent editor={editor} />
        </div>

        {/* Bubble Menu - appears when text is selected */}
        <BubbleMenu
          editor={editor}
          className="flex gap-1 bg-gray-800 px-3 text-white p-1 rounded-xl shadow-lg"
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-700 duration-300 ${
              editor.isActive("bold") ? "bg-gray-600" : ""
            }`}
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-700 duration-300 ${
              editor.isActive("italic") ? "bg-gray-600" : ""
            }`}
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded hover:bg-gray-700 duration-300 ${
              editor.isActive("strike") ? "bg-gray-600" : ""
            }`}
          >
            <Strikethrough className="w-4 h-4" />
          </button>
        </BubbleMenu>

        {/* Floating Menu - appears when starting a new line */}
        <FloatingMenu
          editor={editor}
          className="flex gap-1 bg-gray-800 text-white p-1 rounded shadow-lg"
        >
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className="p-2 rounded hover:bg-gray-700"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className="p-2 rounded hover:bg-gray-700"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="p-2 rounded hover:bg-gray-700"
          >
            <List className="w-4 h-4" />
          </button>
        </FloatingMenu>
      </div>
    </div>
  );
};

export default Tiptap;
