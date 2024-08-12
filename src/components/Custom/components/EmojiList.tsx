/* eslint-disable no-constant-condition */
/* eslint-disable multiline-ternary */
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

const EmojiList = (props: any, ref: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const selectItem = (index: any) => {
    const item = props.items[index];

    if (item) {
      props.command({
        name: item.name,
      });
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(
    ref,
    () => {
      return {
        onKeyDown: (x: any) => {
          if (x.event.key === 'ArrowUp') {
            upHandler();
            return true;
          }

          if (x.event.key === 'ArrowDown') {
            downHandler();
            return true;
          }

          if (x.event.key === 'Enter') {
            enterHandler();
            return true;
          }

          return false;
        },
      };
    },
    [upHandler, downHandler, enterHandler],
  );

  return (
    <div
      className='bg-white rounded-lg dark:bg-black shadow-sm border border-neutral-200 dark:border-neutral-800 text-black max-h-[min(80vh,24rem)] overflow-auto flex-wrap mb-8 p-1'
      ref={scrollContainer}
    >
      {props?.items?.length ? (
        <div className='grid grid-cols-1 gap-0.5 min-w-7'>
          {props.items.map((item: any, index: any) => (
            <button
              className={`text-left text-gray-800 dark:text-gray-100 p-[4px] rounded-[4px] ${
                index === selectedIndex ? 'bg-neutral-300 dark:bg-neutral-700' : ''
              }`}
              key={index}
              onClick={() => selectItem(index)}
            >
              {item.fallbackImage ? <img src={item.fallbackImage} alt='' /> : item.emoji}
              <span className='ml-[4px]'>:{item.name}:</span>
            </button>
          ))}
        </div>
      ) : (
        <div className='p-3'>
          <span className='text-xs text-gray-800 dark:text-gray-100'>Empty</span>
        </div>
      )}
    </div>
  );
};

export default forwardRef(EmojiList);
