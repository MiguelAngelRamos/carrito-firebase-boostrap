import { computed, ref } from 'vue';
import { ref as storageRef, getDownloadURL } from 'firebase/storage'; // servicio para subir archivos de firebase.
import { useFirebaseStorage, useStorageFile } from 'vuefire'; // la implementación de firebase para vue
import { uid } from 'uid'; // id aleatorio

export default function useImage() {
  const storage = useFirebaseStorage(); // Servicio que vamos a utilizar para subir archivos a firebase

  let storageRefPath;
  const url = ref(null);
  const uploadError = ref(null);
  const uploadProgress = ref(0);

  async function uploadImage(event) {
    const data = event.target.files[0]; // Obtienes la imagen del input file
    console.log('Select file:', data);

    if (data) {
      const fileExtension = data.name.split('.').pop(); // Obtiene la extensión del archivo
      storageRefPath = storageRef(storage, `/productos/${uid()}.${fileExtension}`); // Ruta donde se va guardar la imagen con la extensión correcta
      console.log(storageRefPath);

      const {
        upload, // función que vamos a utilizar para subir la imagen
        uploadError: ue,
        uploadProgress: up
      } = useStorageFile(storageRefPath);

      try {
        await upload(data);
        const downloadUrl = await getDownloadURL(storageRefPath); // Obtener la URL de descarga
        console.log('Image uploaded successfully: ', downloadUrl);
        url.value = downloadUrl;
        uploadError.value = null;
        uploadProgress.value = 100;
      } catch (error) {
        console.error('Error uploading image:', error);
        uploadError.value = ue;
        uploadProgress.value = up;
      }
    }
  }

  const image = computed(() => {
    return url.value ? url.value : null;
  });

  return {
    url, // para poder guardar esta URL en la base de datos
    uploadImage,
    image,
    uploadError,
    uploadProgress
  };
}
