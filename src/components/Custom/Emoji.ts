/* eslint-disable no-sequences */
/* eslint-disable indent */
/* eslint-disable no-void */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import { TiptapExtensionEmoji } from 'tiptap-editor-extension-emoji';

import { listEmoji } from './emoji.constant';

// Contact the author to get a license key and unique identifier

const EmojiExtension = TiptapExtensionEmoji({
  licenseKey: process.env.VITE_TIPTAP_EMOJI_LICENSEKEY,
  uniqueIdentifier: process.env.VITE_TIPTAP_EMOJI_UNIQUEIDENTIFIER,
  domain: process.env.VITE_TIPTAP_EMOJI_DOMAIN,
});

export const Emoji = EmojiExtension.extend({
  addOptions() {
    return {
      // @ts-ignore
      ...this.parent?.(),
      HTMLAttributes: {},
      emojis: listEmoji,
      enableEmoticons: false,
      forceFallbackImages: false,
    };
  },
});
