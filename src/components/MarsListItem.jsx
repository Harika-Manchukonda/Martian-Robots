import React from 'react';

/*
 * extract rendering from MarsListItem; 
 * I don't get it but whatever
 * see: http://survivejs.com/react/getting-started/editing-notes/#extracting-rendering-from-note-
*/
export default ({children, ...props}) => (
  <div {...props}>
    {children}
  </div>
);
