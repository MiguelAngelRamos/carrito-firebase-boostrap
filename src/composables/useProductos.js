import {collection, doc, deleteDoc} from 'firebase/firestore'; // base de datos de firebase
import { ref as storageRef, deleteObject } from 'firebase/storage'; // servicio para subir archivos de firebase.
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'; // la implementación de firebase para vue

export default function useProductos() {

  const storage = useFirebaseStorage() // los archivos
  const db = useFirestore(); // es la base de datos
  const productosCollection = useCollection(collection(db, 'productos')); // recupero la colección
  console.log('useProductos');
  console.log(productosCollection);
  return {
    productosCollection
  }
}
