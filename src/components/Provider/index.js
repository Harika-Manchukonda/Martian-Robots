/*
 * Reference
 * http://survivejs.com/react/implementing-kanban/react-and-flux/#setting-up-a-provider-
 */
if(process.env.NODE_ENV === 'production') {
  module.exports = require('./Provider.prod');
}
else {
  module.exports = require('./Provider.dev');
}
