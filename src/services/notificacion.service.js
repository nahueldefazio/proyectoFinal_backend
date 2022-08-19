
import mailer from '../utils/mailer.js';
import dotenv from 'dotenv';
import { sms, wp } from '../utils/twilio.js';
dotenv.config();

const MAIL_ADMIN = process.env.MAIL_ADMIN;



const mailNuevoUsuario = (user) => {
    let html = `
    <h1>Se a Registrado un Nuevo Usuario en la WEB</h1>
    <br>
    <ul>
        <li>Nombre: ${user.nombre}</li>
        <li>Apellido: ${user.apellido}</li>
        <li>UserName: ${user.username}</li>
        <li>Domicilio: ${user.domicilio}</li>
        <li>Localidad: ${user.localidad}</li>
        <li>Provincia: ${user.provincia}</li>
        <li>E-Mail: ${user.email}</li>
        <li>DNI: ${user.dni}</li>
        <li>Télefono: ${user.codPais}-${user.tel}</li>
        <li>Fecha Alta: ${fecha.toLocaleDateString()}</li>
    </ul>
    `;
    mailer(MAIL_ADMIN, 'NEW USER', '', '', 'EC-Zipa', html)
}


const mailNuevaVenta = (orden) => {
    let html = `
        <h1>Nueva venta</h1>
        <br>
        <h5>Cliente: </h5>
        <ul>
            <li>ID de la orden: ${orden.id}</li>
            <li>Total: ${orden.total}</li>
            <li>Cantidad: ${orden.cantTotal}</li>
            <li>Nombre: ${orden.nombre}</li>
            <li>Apellido: ${orden.apellido}</li>
            <li>ordenName: ${orden.email}</li>
            <li>Domicilio: ${orden.domicilio}</li>
            <li>Localidad: ${orden.localidad}</li>
            <li>Provincia: ${orden.provincia}</li>
            <li>E-Mail: ${orden.email}</li>
            <li>DNI: ${orden.dni}</li>
            <li>Télefono: ${orden.tel}</li>

        </ul>
        <br>
        <h5>Datos de la Venta</h5>
        <table>
            <thead>
                <tr>
                    <th colspan="3">Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${orden.items.map(product => {
                    return `
                        <tr>
                            <td><img src="${product.img}" width="70" height="70"></td>
                            <td>${product.sku}</td>
                            <td>${product.nombre}</td>
                            <td>${product.cantidad}</td>
                            <td>${product.precio}</td>
                            <td>${product.total}</td>
                        </tr>
                    `;
                })}
            </tbody>
        </table>
    `;
    mailer(MAIL_ADMIN, `Nuevo Pedido de ${orden.nombre} ${orden.apellido} Mail: ${orden.email}`, ``, ``, `EC-Zipa`, html)
}

const wpNuevaVenta = (orden) => {
    wp( `Nuevo Pedido de ${orden.nombre} ${orden.apellido} Mail: ${orden.email}`, `${process.env.WS_ADMIN}`)
}

const smsNuevaVenta = (orden) => {
    const fecha = new Date();
    const body = `
                EC-Zipa te quiere informar que tu pedido con ID ${orden.id}
        A nombre de ${orden.nombre} ${orden.apellido}  - cuyo mail es: ${orden.email}
        con la siguiente fecha ${fecha.toLocaleDateString()},
        por un total de ${orden.total}, por ${orden.cantTotal} productos,
        Se a registrado de manera satisfactoria !!
        Apenas tengamos noticias lo estaremos notificando.
    `;
    const tel = `${orden.codPais}${orden.tel}`;
    sms( body, tel)
}

export { mailNuevaVenta, mailNuevoUsuario, smsNuevaVenta, wpNuevaVenta };
