import ProductosDTO from '../services/DTO/productos.DTO.js';
import logger from '../utils/logger.js';
import Productos from '../services/DAO/productos.service.js';
import Mensajes from '../services/DAO/mensajeria.service.js';
import Usuarios from '../services/DAO/usuarios.service.js';


const prod = Productos.initInstancia();
const mensajes = Mensajes.initInstancia();
const usuarios = Usuarios.initInstancia();

export const productos = async () => {
    return await prod.getAll();
}

export const producto = async ({ sku }) => {
    return await prod.getById(sku);
}

export const productoCat = async ({ categ }) => {
    return await prod.getByCat(categ);
}

export const mensajesGet = async () => {
    const mensajes = await mensajes.mostrar();
    return mensajes;
}

export const usuarioGet = async () => {
    return await usuarios.getByMail(email);
}


export const createProducto = async ({ producto }) => {
    const { nombre, descripcion, categoria, img, precio, stock, sku } = producto;
    const productoNuevo = {
        categoria,
        descripcion,
        nombre,
        img,
        precio,
        sku,
        stock
    }
    logger.info(`Post Productos/ Producto: ${JSON.stringify(productoNuevo)} `);
    const produc = await  prod.save(productoNuevo);
    return ProductosDTO(produc);
}

export const updateProducto = async ({ sku, producto }) => {
    const { nombre, descripcion, categoria, img, precio, stock } = producto;
    const productoNuevo = {
        categoria,
        descripcion,
        nombre,
        img,
        precio,
        sku,
        stock
    }
    logger.info(`Put Productos/ Producto: ${JSON.stringify(productoNuevo)}`);
    const produc = await  prod.update(sku, productoNuevo);
    return ProductosDTO(produc);
}

export const deleteProducto = async ({ sku }) => {
    logger.info(`Delete Productos/ Producto: ${sku}`);
    return await prod.deleteById(sku);
}

export const createMensaje = async ({ mensaje }) => {
    const { socketId, nombre, apellido, edad, alias, avatar, fh, text } = mensaje;
    const mensajeNuevo = {
        socketId,
        nombre,
        apellido,
        edad,
        alias,
        avatar,
        fh,
        text
    }
    logger.info(`Post Mensajes/ Mensaje: ${JSON.stringify(mensajeNuevo)}`);
    return await mensajes.guardarYMostrar(socketId, mensajeNuevo);
}

export const createUsuario = async ({ usuario }) => {
    const { username, nombre, apellido, domicilio, localidad, provincia, email, dni, codPais, tel, password, img } = usuario;
    const usuarioNuevo = {
        username,
        nombre,
        apellido,
        domicilio,
        localidad,
        provincia,
        email,
        dni,
        codPais,
        tel,
        password,
        img
    }
    logger.info(`Post Usuarios/ Usuario: ${JSON.stringify(usuarioNuevo)} `);
    return await usuarios.altaUsuario(usuarioNuevo);
}
export const updateUsuario = async ({ email, usuario }) => {
    const { username, nombre, apellido, domicilio, localidad, provincia, dni, codPais, tel, password, img } = usuario;
    const usuarioNuevo = {
        username,
        nombre,
        apellido,
        domicilio,
        localidad,
        provincia,
        email,
        dni,
        codPais,
        tel,
        password,
        img
    }
    logger.info(`Put Usuarios/ Usuario: ${JSON.stringify(usuarioNuevo)}`);
    return await usuarios.modiUsuario(usuarioNuevo);
}

export const deleteUsuario = async ({ email }) => {
    logger.info(`Delete Usuarios/ Usuario: ${email}`);
    return await usuarios.deleteById(id);
}
