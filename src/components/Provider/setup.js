import storage from '../../libs/storage';
import persist from '../../libs/persist';
import MarsStore from '../../stores/MarsStore';

/*
 * Reference
 * http://survivejs.com/react/implementing-kanban/implementing-store-and-actions/#setting-up-a-notestore-
 */
export default alt => {
  alt.addStore('MarsStore', MarsStore);

  persist(alt, storage(localStorage), 'app');
};
