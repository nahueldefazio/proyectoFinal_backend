export class MensajeriaDAO {
    async guardarYMostrar(socketId, data, res) {
        throw new Error("Guardar y Mostrar NO Implementada");
    }

    async Mostrar() {
        throw new Error("Guardar y Mostrar NO Implementada");
    }
}

export class OrdenesDAO {
    async generarOrden(carrito, total, cantidad, usuario, res) {
        throw new Error("Generar Orden NO Implementada");
    }

    async getById(id, res) {
        throw new Error("Get By ID. NO Implementada");
    }

    async getByUs(us, res) {
        throw new Error("Get By Usuario NO Implementada");
    }

    async deleteById(id, res) {
        throw new Error("Delete By ID NO Implementada");
    }
}

export class ProductosDAO {
    async save(producto, res) {
        throw new Error("Save NO Implementada.");
    }

    async modi(producto, res) {
        throw new Error("Modificar NO Implementada.");
    }

    async getById(sku, res) {
        throw new Error("Get By ID NO Implementada.");
    }

    async getByCat(categoria, res) {
        throw new Error("Get BY ID NO Implementada.");
    }

    async getAll(res) {
        throw new Error("GetAll NO Implementada.");
    }

   async deleteById(sku) {
        throw new Error("Delete By ID NO Implementada.");
   }

}

export class UsuariosDAO {
    async altaUsuario(usuario, res) {
        throw new Error("Funcionalidad Alta NO Implementada.");
    }

    async modiUsuario(usuario, res) {ç
        throw new Error("Funcionalidad Modificar NO Implementada.");
    }

    async getById(id, res) {
        throw new Error("Funcionalidad Get By ID NO Implementada.");  
    }

    async getByMail(email, pass, res) {
        throw new Error("Funcionalidad Get By Mail NO Implementada.");        
    }

    async deleteById(id, res) {
        throw new Error("Funcionalidad Delete By ID NO Implementada.");  
    }
}