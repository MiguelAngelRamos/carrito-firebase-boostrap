export const loginSchema = {
  email(value) {
    if(!value) {
      return 'Este campo es obligatorio!';
    }

    // validar si es un email con formato
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(!regex.test(value)) {
      return 'Email no valido';
    }
    return true;
  },
  password(value) {  
    if(value) return true;
    return 'El password es obligatorio';

    // if(!value) return 'La password es un campo obligatorio';
    // if(value.length >= 6 ) return true;
    // return 'La password debe ser mayor a 6 caracteres';
    // validar la contraseña que tenga un longitud superior 
   
  }
}