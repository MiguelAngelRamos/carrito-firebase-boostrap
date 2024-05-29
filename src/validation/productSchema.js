import *  as yup from 'yup';

export const productSchema = yup.object({
  nombre: yup.string().required('El nombre del producto es obligatorio').min(3, 'El nombre debe tener al menos 3 caracteres'),
  imagen: yup.mixed().required('La imagen del producto es obligatoria'),
  precio: yup.number().required('El producto es obligatorio').positive('El precio del producto debe ser un numero positivo').integer('El precio debe ser un numero entero'),
  stock: yup.number().required('El stock es obligatorio').min(0, 'El stock no puede ser un numero negativo').integer('El stock debe ser un número entero')
});