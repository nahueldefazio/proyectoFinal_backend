import { format } from "date-fns";

const productosDTO = (producto) => {
    const { nombre, descripcion, categoria, img, precio, stock, sku, created_at, updated_at } = producto;
    return {
        id: producto.id || producto._id,
        nombre: nombre || "",
        descripcion: descripcion || "",
        categoria: categoria || "",
        img: img || "",
        precio: precio || 0,
        stock: stock || 0,
        sku: sku || "",
        created_at: created_at || "",
        updated_at: updated_at || ""
    }
};

export default productosDTO;