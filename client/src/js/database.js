import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT request to database being created, one moment please');
  const jateDB = await openDB('jate', 1);
  const text = jateDB.transaction('jate','readwrite');
  const store = text.objectStore('jate');
  const request = store.put({id: 1, value: content});
  const result = await request;
  console.log('Saved to Database ', result.value);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET request from database in the works');
  const jateDB = await openDB('jate', 1);
  const text = jateDB.transaction('jate', 'readonly');
  const store = text.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  if(result){
    console.log('data retrieved from database', result.value);
  }else{
    console.log('data not found in database, try harder');
  }
  return result.value;
}

initdb();
