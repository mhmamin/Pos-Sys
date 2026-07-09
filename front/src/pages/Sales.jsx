import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@mui/material";
import API from "../api/axios";

const Sales = () => {
  const [product, setProduct] = useState([]);
  const [card, setCard] = useState([]);
  const [text, setText] = useState(5);
  const [discount, setDiscount] = useState(0);

  const LoandProduct = async () => {
    const { data } = await API.get("/products");
    setProduct(data);
  };

  const addToCard = (products) => {
    setCard((priv) => [...priv, { ...product, quantity: 1 }]);
  };
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const finalTotal = total + (total * tax) / 100 - discount;

  const checkout = async () => {
    try {
      await API.post("/invoice", { item: cart, tax, discount });
      alert("Invoice Created!");
      setCard([]);
      setDiscount(0);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    LoandProduct();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" mb={2}>
        Sales
      </Typography>
      <Typography variant="h6">Product</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Add</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.map((p) => {
            <TableRow key={p._id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.price}</TableCell>
              <TableCell>
                <Button onClick={() => addToCard(p)}>Add</Button>
              </TableCell>
            </TableRow>;
          })}
        </TableBody>
      </Table>

      <Typography variant="h6" mt={3}>
        Cart
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantoty</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {card.map((c, i) => {
            <TableRow key={i}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.price}</TableCell>
              <TableCell>{c.quantoty}</TableCell>
            </TableRow>;
          })}
        </TableBody>
      </Table>

      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <TextField
          label="tax %"
          type="number"
          value={tax}
          onChange={(e) => setTax(Number(e.target.value))}
        />
        <TextField
          label="discount"
          type="number"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
        />
      </Box>

      <Typography variant="h6" mt={2}>
        Total : {finalTotal}
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={checkout}>
        Checkout
      </Button>
    </Box>
  );
};

export default Sales;
