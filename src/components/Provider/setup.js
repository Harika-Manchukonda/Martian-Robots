import storage from '../../libs/storage';
import persist from '../../libs/persist';
import MarsStore from '../../stores/MarsStore';

export default alt => {
  alt.addStore('MarsStore', MarsStore);

  persist(alt, storage(localStorage), 'app');
};
