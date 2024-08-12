import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';

interface IProps {
  action?: any;
}

const EmojiActionButton = (props: IProps) => {
  function onChange(emoji: any) {
    props.action?.(emoji?.id);
  }

  return (
    <Popover>
      <PopoverTrigger>
        <button className='text-sm flex justify-center items-center'>Select Emoji</button>
      </PopoverTrigger>

      <PopoverContent hideWhenDetached>
        <Picker theme={'dark'} data={data} onEmojiSelect={onChange} />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiActionButton;
