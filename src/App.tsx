import React from 'react';

import Basic from '@/components/Basic/Basic';
import Custom from '@/components/Custom';

const App = () => {
  return (
    <>
      <a
        target='_blank'
        className='underline'
        href='https://github.com/reactjseditor255/reactjs-titap-editor-emoji'
        rel='noreferrer'
      >
        Source Code
      </a>
      <br />

      <h2>Basic</h2>
      <section>
        <Basic />
      </section>
      <br />
      <br />
      <br />
      <h2>Custom</h2>
      <section>
        <Custom />
      </section>
    </>
  );
};

export default App;
