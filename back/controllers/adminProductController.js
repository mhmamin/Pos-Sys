import Product from "../models/Product.js"; // السطر السحري الناقص اللي بيحل المشكلة

export const createProduct = async (req, res) => {
  try {
    const { name, price, sellingPrice, qty, stock, purchasePrice } = req.body;

    const finalPrice = price !== undefined ? price : sellingPrice;
    const finalQty = qty !== undefined ? qty : stock;
    const finalPurchasePrice =
      purchasePrice !== undefined ? purchasePrice : finalPrice;

    if (!name || finalPrice === undefined || finalQty === undefined) {
      return res
        .status(400)
        .json({ message: "برجاء إدخال الاسم، السعر، والكمية بشكل صحيح." });
    }

    const parsedSellingPrice = parseFloat(finalPrice) || 0;
    const parsedPurchasePrice = parseFloat(finalPurchasePrice) || 0;
    const parsedStock = parseInt(finalQty, 10) || 0;

    const product = await Product.create({
      name: name.trim(),
      sellingPrice: parsedSellingPrice,
      purchasePrice: parsedPurchasePrice,
      stock: parsedStock,
      category: req.body.category || "General",
      minStock: req.body.minStock || 5,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
