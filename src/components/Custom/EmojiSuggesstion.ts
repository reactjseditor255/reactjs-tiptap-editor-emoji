/* eslint-disable import/named */
/* eslint-disable indent */
/* eslint-disable unicorn/consistent-destructuring */
/* eslint-disable no-void */
/* eslint-disable unicorn/no-null */

import { Editor, Extension, Range } from '@tiptap/core';
import { PluginKey } from '@tiptap/pm/state';
import { ReactRenderer } from '@tiptap/react';
import Suggestion, { SuggestionProps, SuggestionKeyDownProps } from '@tiptap/suggestion';
import tippy from 'tippy.js';

import EmojiList from '@/components/Custom/components/EmojiList';

const extensionName = 'emojiSuggestion';
let popup: any;
const EmojiSuggesstion = Extension.create({
  name: extensionName,
  priority: 200,
  onCreate() {
    popup = tippy('body', {
      interactive: true,
      trigger: 'manual',
      placement: 'bottom-start',
      theme: 'emoji-command',
      maxWidth: '16rem',
      offset: [16, 8],
      popperOptions: {
        strategy: 'fixed',
        modifiers: [
          {
            name: 'flip',
            enabled: false,
          },
        ],
      },
    });
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        char: ':',
        pluginKey: new PluginKey(extensionName),
        allow: ({ state, range }: any) => {
          const e = state.doc.resolve(range.from);
          const s = state.schema.nodes.emoji;

          return !!e.parent.type.contentMatch.matchType(s);
        },
        command: ({ editor, range, props }: { editor: Editor; range: Range; props: any }) => {
          let r;
          const s = editor.view.state.selection.$to.nodeAfter;
          ((r = s == null ? void 0 : s.text) == null ? void 0 : r.startsWith(' ')) &&
            (range.to += 1);

          // @ts-ignore
          editor.chain().focus().deleteRange(range).setEmoji(props.name).run();
        },
        items: ({ editor, query }: { query: string; editor: Editor }) => {
          return editor.storage.emoji.emojis
            .filter(({ shortcodes, tags }: any) => {
              return (
                shortcodes.find((shortcode: any) => shortcode.startsWith(query.toLowerCase())) ||
                tags.find((tag: any) => tag.startsWith(query.toLowerCase()))
              );
            })
            .slice(0, 5);
        },
        render: () => {
          let component: any;
          let scrollHandler: (() => void) | null = null;
          return {
            onStart: (props: SuggestionProps) => {
              component = new ReactRenderer(EmojiList, {
                props,
                editor: props.editor,
              });
              const { view } = props.editor;
              // const editorNode = view.dom as HTMLElement;
              const getReferenceClientRect = () => {
                if (!props.clientRect) {
                  return props.editor.storage[extensionName].rect;
                }

                const rect = props.clientRect();

                if (!rect) {
                  return props.editor.storage[extensionName].rect;
                }

                let yPos = rect.y;

                if (rect.top + component.element.offsetHeight + 40 > window.innerHeight) {
                  const diff = rect.top + component.element.offsetHeight - window.innerHeight + 40;
                  yPos = rect.y - diff;
                }

                // Account for when the editor is bound inside a container that doesn't go all the way to the edge of the screen
                // const editorXOffset = editorNode.getBoundingClientRect().x;
                return new DOMRect(rect.x, yPos, rect.width, rect.height);
              };

              scrollHandler = () => {
                popup?.[0].setProps({
                  getReferenceClientRect,
                });
              };

              view.dom.parentElement?.addEventListener('scroll', scrollHandler);

              popup?.[0].setProps({
                getReferenceClientRect,
                appendTo: () => document.body,
                content: component.element,
              });

              popup?.[0].show();
            },

            onUpdate(props: SuggestionProps) {
              component.updateProps(props);

              const { view } = props.editor;

              // const editorNode = view.dom as HTMLElement;

              const getReferenceClientRect = () => {
                if (!props.clientRect) {
                  return props.editor.storage[extensionName].rect;
                }

                const rect = props.clientRect();

                if (!rect) {
                  return props.editor.storage[extensionName].rect;
                }

                // Account for when the editor is bound inside a container that doesn't go all the way to the edge of the screen
                return new DOMRect(rect.x, rect.y, rect.width, rect.height);
              };

              const scrollHandler = () => {
                popup?.[0].setProps({
                  getReferenceClientRect,
                });
              };

              view.dom.parentElement?.addEventListener('scroll', scrollHandler);

              // eslint-disable-next-line no-param-reassign
              props.editor.storage[extensionName].rect = props.clientRect
                ? getReferenceClientRect()
                : {
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                  };
              popup?.[0].setProps({
                getReferenceClientRect,
              });
            },

            onKeyDown(props: SuggestionKeyDownProps) {
              if (props.event.key === 'Escape') {
                popup?.[0].hide();

                return true;
              }

              if (!popup?.[0].state.isShown) {
                popup?.[0].show();
              }

              return component.ref?.onKeyDown(props);
            },

            onExit(props: any) {
              popup?.[0].hide();
              if (scrollHandler) {
                const { view } = props.editor;
                view.dom.parentElement?.removeEventListener('scroll', scrollHandler);
              }
              component.destroy();
            },
          };
        },
      }),
    ];
  },

  addStorage() {
    return {
      rect: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    };
  },
});

export { EmojiSuggesstion };
