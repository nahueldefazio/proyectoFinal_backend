import "./config.js";
import { ProductosModel } from '../../../models/productos.model.js';

export const productos = [
    {
        categ: "sillas",
        descrip: "descripcion del producto",
        img: "",
        nombre: "Silla Fija Apilable Con Apoyabrazos | Contado",
        precio: 70,
        sku: 21,
        created_at: new Date(),
        stock: 100
    },
    {
        categ: "sillas",
        descrip: "descripcion del producto",
        img: "",
        nombre: "Silla De Oficina Fija Diseño Fresa White | Contado",
        precio: 35,
        sku: 37,
        created_at: new Date(),
        stock: 10
    },
    {
        categ: "sillas",
        descrip: "descripcion del producto",
        img: "",
        nombre: "Silla Fija Tapizada | Contado",
        precio: 25,
        sku: 9,
        created_at: new Date(),
        stock: 40
    },
    {
        categ: "reposteria",
        descrip: "descripcion del producto",
        img: "",
        nombre: "Vara Luminosa Color 50 CM",
        precio: 357,
        sku: 6,
        created_at: new Date(),
        stock: 81
    },
    {
        categ: "escritorios",
        descrip: "descripcion del producto",
        img: "",
        nombre: "Escritorio Vitto Black Castaño",
        precio: 45,
        sku: 22,
        created_at: new Date(),
        stock: 410
    },
    {
        categ: "escritorios",
        descrip: "descripcion del producto",
        img: "",
        nombre: "Escritorio Vitto Black Grafito | Contado",
        precio: 498,
        sku: 32,
        created_at: new Date(),
        stock: 4510
    },
    {
        categ: "sillones",
        descrip: "Sillón Gamer Citiz | Contado",
        img: "",
        nombre: "Pelota Pelotero X1",
        precio: 18,
        sku: 18,
        created_at: new Date(),
        stock: 6852
    },
    {
        categ: "sillones",
        descrip: "Sillón Gamer Ps4",
        img: "",
        nombre: "Vara Luminosa Color 50 Cm",
        precio: 357,
        sku: 15,
        created_at: new Date(),
        stock: 48569
    },
    {
        categ: "sillones",
        descrip: "Sillón Gamer Roblox | Contado",
        img: "",
        nombre: "Gorro Egresado Plástico X1",
        precio: 341,
        sku: 21,
        created_at: new Date(),
        stock: 6778
    }
];

(async () => {
    try {        
        await ProductosModel.create(productos);
        logger.info('PRODUCTOS CREADOS CON ÉXITO.')
    } catch (error) {
        logger.error(error);
    }
})();