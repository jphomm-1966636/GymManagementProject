import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";

function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/invoices") // Backend API for invoices
      .then((res) => res.json())
      .then((data) => setInvoices(data))
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <Container>
      <Typography variant="h4" style={{ margin: "20px 0" }}>Invoices</Typography>
      {invoices.map((invoice) => (
        <Card key={invoice.InvoiceID} style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h5">Invoice #{invoice.InvoiceID}</Typography>
            <Typography variant="h6">Customer ID: {invoice.CustomerID}</Typography>
            <Typography variant="h6">Amount: ${invoice.Amount}</Typography>
            <Typography variant="h6">Due Date: {invoice.InvoiceDueDate}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Invoices;
