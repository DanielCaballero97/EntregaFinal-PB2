import { ticketModel } from "./models/ticket.model.js";

class TicketDao {

     // Método para obtener todos los Tickets
  async getAll() {
    const tickets = await ticketModel.find();
    return tickets;
  }

     //Método para obtener por ID
  async getById(id) {
    const ticket = await ticketModel.findById(id);
    return ticket;
  }

    //Método para obtener por Email
  async getByEmail(email) {
    const ticket = await ticketModel.findOne({ email });
    return ticket;
  }

    //Método para crear con la data recibida
  async create(data) {
    const ticket = await ticketModel.create(data);
    return ticket;
  }

  //Método para actualizar info de un producto ya creado
  async update(id, data) {
    const ticketUpdate = await ticketModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return ticketUpdate;
  }

    //Método para borrar el producto con el id recibido
  async deleteOne(id) {
    const ticket = await ticketModel.deleteOne({ _id: id });
    return ticket;
  }
}

export const ticketDao = new TicketDao();
