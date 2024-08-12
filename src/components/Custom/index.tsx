import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import EmojiActionButton from '@/components/Custom/components/EmojiActionButton';
import { Emoji } from '@/components/Custom/Emoji';
import { EmojiSuggesstion } from '@/components/Custom/EmojiSuggesstion';

function Custom() {
  const editor: any = useEditor({
    extensions: [
      StarterKit,
      Emoji.configure({
        enableEmoticons: true,
      }),
      EmojiSuggesstion,
    ],
    content: `
      <p>
        Custom emoji suggestion and emoji picker
      </p>

      <p>
        Try typing <code>:</code> to see the emoji suggestion
      </p>

    `,
  });

  return (
    <>
      <EmojiActionButton
        action={(emoji: string) => {
          editor.chain().focus().setEmoji(emoji).run();
        }}
      />
      <EditorContent editor={editor} />
    </>
  );
}

export default Custom;
