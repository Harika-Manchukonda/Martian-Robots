import Alt from 'alt';

import makeFinalStore from 'alt-utils/lib/makeFinalStore';


/*
 * Reference
 * http://survivejs.com/react/implementing-kanban/implementing-persistency/#persisting-the-application-using-finalstore-
 * 
 */
class Flux extends Alt {
  constructor(config) {
    super(config);

    this.FinalStore = makeFinalStore(this);
  }
}

const flux = new Flux();

export default flux;
