import { v4 as uuidv4 } from "uuid";
import { Invoice, invoices } from "../models/Invoice";

// Function to generate dummy data
export const generateDummyData = () => {
  const clients = [
    "Acme Corp",
    "Globex Industries",
    "Initech",
    "Umbrella Corp",
    "Stark Industries",
  ];
  const statuses: Invoice["status"][] = [
    "Pending",
    "Processing",
    "Processed",
    "Failed",
  ];

  for (let i = 0; i < 20; i++) {
    const id = uuidv4();
    const clientName = clients[Math.floor(Math.random() * clients.length)];
    const amount = Math.floor(Math.random() * 10000) + 100;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const uploadDate = new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ); // Random date within last 30 days

    const invoice: Invoice = {
      id,
      fileName: `invoice_${i + 1}.pdf`,
      fileSize: Math.floor(Math.random() * 1000000) + 10000, // Random size between 10KB and 1MB
      clientName,
      amount,
      uploadDate,
      status,
      filePath: `/uploads/invoice_${i + 1}.pdf`,
      processingStartTime:
        status !== "Pending"
          ? new Date(uploadDate.getTime() + 1000)
          : undefined,
      processingEndTime:
        status !== "Pending" && status !== "Processing"
          ? new Date(uploadDate.getTime() + 30000)
          : undefined,
    };

    invoices.set(id, invoice);
  }
};
