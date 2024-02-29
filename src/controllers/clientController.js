import { json } from "express";
import { responseData } from "../helpers/response.js";
import { Client } from "../models/Client.js";

export const getClients = async (req, res) => {
  try {
    const clients = await Client.find().select("-__v");
    res.json(responseData(true, "exito", clients));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseData(false, error.message, {}));
  }
};

export const getClientById = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Client.findById(id);
    res.json(responseData(true, "exito", client));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseData(false, error.message, {}));
  }
};

export const createClient = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.lastname ||
      !req.body.document ||
      !req.body.email ||
      !req.body.phone
    )
      return res
        .status(500)
        .json(responseData(false, "solo status no es obligatorio", {}));

    const clientExist = await Client.findOne({ email: req.body.email });

    if (clientExist) {
      return res
        .status(404)
        .json(responseData(false, "el email ya existe, intenta con otro", {}));
    }

    const documentExist = await Client.findOne({ document: req.body.document });

    if (documentExist) {
      return res
        .status(404)
        .json(
          responseData(false, "el documento ya existe, intenta con otro", {})
        );
    }
    const client = new Client(req.body);
    await client.save();

    res.json(responseData(true, "exito", client));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseData(false, error.message, {}));
  }
};

export const updateClient = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Client.findById(id);

    if (!client)
      return res
        .status(404)
        .json(responseData(false, "el cliente no existe", {}));

    client.name = req.body.name ?? client.name;
    client.lastname = req.body.lastname ?? client.lastname;
    client.document = req.body.document ?? client.document;
    client.email = req.body.email ?? client.email;
    client.phone = req.body.phone ?? client.phone;
    client.status = req.body.status ?? client.status;

    await client.save();

    res.json(responseData(true, "exito", client));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseData(false, error.message, {}));
  }
};

export const deleteClient = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Client.findById(id);

    if (!client)
      return res
        .status(404)
        .json(responseData(false, "el cliente no existe", {}));

    await client.deleteOne();

    res.json(responseData(true, "exito", client));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseData(false, error.message, {}));
  }
};
