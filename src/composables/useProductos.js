import {collection, doc, deleteDoc} from 'firebase/firestore'; // base de datos de firebase
import { ref as storageRef, deleteObject } from 'firebase/storage'; // servicio para subir archivos de firebase.
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'; // la implementación de firebase para vue

export default function useProductos() {

  const storage = useFirebaseStorage() // los archivos
  const db = useFirestore(); // es la base de datos
  const productosCollection = useCollection(collection(db, 'productos')); // recupero la colección

  // function para eliminar
  
  async function deleteItem(id, urlImage) {
    console.log('ey');
    if(confirm('¿Deseas eliminar este producto?')) {
        const docRef = doc(db, 'productos', id)
        const imageRef = storageRef(storage, urlImage)
        
        await Promise.all([
            deleteDoc(docRef),
            deleteObject(imageRef)
        ])
    }
}
  return {
    productosCollection,
    deleteItem
  }
}
