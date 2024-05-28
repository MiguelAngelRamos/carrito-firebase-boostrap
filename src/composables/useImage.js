import { computed } from 'vue';
import { ref as storageRef, getDownloadURL } from 'firebase/storage'; // servicio para subir archivos de firebase.
import { useFirebaseStorage, useStorageFile} from 'vuefire'; // la implementación de firebase para vue
import { uid } from 'uid'; // id aleatorio

export default function useImage() {
  const storage = useFirebaseStorage(); // Servicio que vamos a utilizar para subir archivos a firebase 
  const storageRefPath = storageRef(storage, `/productos/${uid()}.webp`); // Ruta donde se va guardar la imagen


  const {
    url, // variable que nos va indicar la URL de la imagen una vez que se sube a firebase
    upload, // función que vamos a utilizar para subir la imagen
    uploadError, // Para manejar el error al subir la imagen
    uploadProgress // Para mostrar el progeso de la subida
  } = useStorageFile(storageRefPath);

  console.log('Generated URL:', url);

  async function uploadImage(event) {

    const data = event.target.files[0]; // Obtienes la imagen el input file
    console.log('Select file:', data);

    if(data) {
      try {
        await upload(data);
        const downloadUrl = await getDownloadURL(storageRefPath); // Obtener la url de descarga
        console.log('Image uploaded successfully: ', downloadUrl);
        url.value = downloadUrl;
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

  }

  const image = computed(() => {
    return url.value ? url.value: null;
  });


  return {
    url, // para poder guardar esta URL en la base de datos
    uploadImage,
    image,
    uploadError,
    uploadProgress
  }


}