import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Card } from "@/components/ui/card";
import { Code, Highlighter, ListBullets, ListNumbers, Paragraph, Quotes, TextB, TextHOne, TextHThree, TextHTwo, TextItalic, TextStrikethrough, TextSubscript, TextSuperscript, TextUnderline } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Underline } from "@tiptap/extension-underline";
import { Separator } from "@/components/ui/separator";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";

export function TiptapEditor() {
  const extensions = [StarterKit, Underline, Highlight, Subscript, Superscript];
  const content = "";

  return (
    <div className="max-w-full overflow-y-auto">
      <EditorProvider slotBefore={<MenuBar/>} extensions={extensions} content={content}></EditorProvider>
    </div>
  );
}

function MenuBar() {
  const {editor} = useCurrentEditor();

  if (!editor) return null;

  const toolbar_items = {
    font_extensions: [
      {
        tooltip: "Párrafo",
        icon: Paragraph,
        action: () => editor.chain().focus().setParagraph().run(),
        isActive: editor.isActive("paragraph"),
        isDisabled: false,
      },
      {
        tooltip: "Encabezado 1",
        icon: TextHOne,
        action: () => editor.chain().focus().toggleHeading({level: 1}).run(),
        isActive: editor.isActive("heading", {level: 1}),
        isDisabled: false,
      },
      {
        tooltip: "Encabezado 2",
        icon: TextHTwo,
        action: () => editor.chain().focus().toggleHeading({level: 2}).run(),
        isActive: editor.isActive("heading", {level: 2}),
        isDisabled: false,
      },
      {
        tooltip: "Encabezado 3",
        icon: TextHThree,
        action: () => editor.chain().focus().toggleHeading({level: 3}).run(),
        isActive: editor.isActive("heading", {level: 3}),
        isDisabled: false,
      },
    ],
    basic_extensions: [
      {
        tooltip: "Negritas",
        icon: TextB,
        action: () => editor.chain().focus().toggleBold().run(),
        isActive: editor.isActive("bold"),
        isDisabled: !editor.can().chain().focus().toggleBold().run(),
      },
      {
        tooltip: "Cursiva",
        icon: TextItalic,
        action: () => editor.chain().focus().toggleItalic().run(),
        isActive: editor.isActive("italic"),
        isDisabled: !editor.can().chain().focus().toggleItalic().run(),
      },
      {
        tooltip: "Subrayado",
        icon: TextUnderline,
        action: () => editor.chain().focus().toggleUnderline().run(),
        isActive: editor.isActive("underline"),
        isDisabled: !editor.can().chain().focus().toggleUnderline().run(),
      },
      {
        tooltip: "Tachado",
        icon: TextStrikethrough,
        action: () => editor.chain().focus().toggleStrike().run(),
        isActive: editor.isActive("strike"),
        isDisabled: !editor.can().chain().focus().toggleStrike().run(),
      },
    ],
    list_extensions: [
      {
        tooltip: "Lista desordenada",
        icon: ListBullets,
        action: () => editor.chain().focus().toggleBulletList().run(),
        isActive: editor.isActive("bulletList"),
        isDisabled: !editor.can().chain().focus().toggleBulletList().run(),
      },
      {
        tooltip: "Lista ordenada",
        icon: ListNumbers,
        action: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: editor.isActive("orderedList"),
        isDisabled: !editor.can().chain().focus().toggleOrderedList().run(),
      },
    ],
    decoration_extensions: [
      {
        tooltip: "Resaltar",
        icon: Highlighter,
        action: () => editor.chain().focus().toggleHighlight().run(),
        isActive: editor.isActive("highlight"),
        isDisabled: !editor.can().chain().focus().toggleHighlight().run(),
      },
      {
        tooltip: "Subíndice",
        icon: TextSubscript,
        action: () => editor.chain().focus().toggleSubscript().run(),
        isActive: editor.isActive("subscript"),
        isDisabled: !editor.can().chain().focus().toggleSubscript().run(),
      },
      {
        tooltip: "Superíndice",
        icon: TextSuperscript,
        action: () => editor.chain().focus().toggleSuperscript().run(),
        isActive: editor.isActive("superscript"),
        isDisabled: !editor.can().chain().focus().toggleSuperscript().run(),
      },
    ],
    insert_extensions: [
      {
        tooltip: "Cita textual",
        icon: Quotes,
        action: () => editor.chain().focus().toggleBlockquote().run(),
        isActive: editor.isActive("blockquote"),
        isDisabled: !editor.can().chain().focus().toggleBlockquote().run(),
      },
      {
        tooltip: "Bloque de código",
        icon: Code,
        action: () => editor.chain().focus().toggleCodeBlock().run(),
        isActive: editor.isActive("codeBlock"),
        isDisabled: !editor.can().chain().focus().toggleCodeBlock().run(),
      },
    ],
  };

  return (
    <Card className="sticky top-0 flex gap-1 p-1 max-w-full overflow-x-auto z-10 rounded-b-none">
      {Object.entries(toolbar_items).map(([key, item]) => (
        <div key={key} className="flex items-center gap-1">
          {item.map((item, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="button" size="icon" variant={item.isActive ? "secondary" : "ghost"} onClick={item.action} disabled={item.isDisabled}>
                    <item.icon/>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{item.tooltip}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
          {key !== Object.keys(toolbar_items)[Object.keys(toolbar_items).length - 1] && <Separator orientation="vertical" className="h-6 mx-1"/>}
        </div>
      ))}
    </Card>
  );
}
