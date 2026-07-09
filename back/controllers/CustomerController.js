import Customer from "../models/Customer.js";

export const createCustomer = async (req, res) => {
  const customer = await Customer.create(req.body);
  res.json(customer);
};

export const getCustomers = async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
};

export const updateCustomer = async (req, res) => {
  const update = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(update);
};

export const deleteCustomer = async (req, res) => {
  try {
    const cleanId = req.params.id ? req.params.id.trim() : null;

    await Customer.findByIdAndDelete(cleanId);
    res.json({ message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
