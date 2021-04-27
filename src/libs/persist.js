/*
 * Reference
 * http://survivejs.com/react/implementing-kanban/implementing-persistency/
 * http://alt.js.org/docs/stores/
 */
export default function(alt, storage, storageName) {
  try {
    alt.bootstrap(storage.get(storageName));
  }
  catch(e) {
    console.log('Failed to bootstrap data', e);
  }

  alt.FinalStore.listen(() => {
    if(!storage.get('debug')) {
      storage.set(storageName, alt.takeSnapshot());
    }
  });
}
