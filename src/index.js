import React from 'react';
import ReactDOM from 'react-dom';
import './css/foundation.min.css';
import './css/index.css';

import App from './App';
import Provider from './components/Provider';

const Root = () => {
  return (    
      <div>
        <App/>      
      </div>    
  )
}

ReactDOM.render(<Provider><Root/></Provider>, document.getElementById('root'));
