import { invoices } from "../models/Invoice";

// Simulated processing function
export const simulateProcessing = (invoiceId: string) => {
  const invoice = invoices.get(invoiceId);
  if (!invoice) return;

  console.log(
    `[${new Date().toISOString()}] Starting processing for invoice ${invoiceId} (${
      invoice.fileName
    })`
  );
  invoice.status = "Processing";
  invoice.processingStartTime = new Date();

  const processingTime =
    Math.floor(Math.random() * (45000 - 15000 + 1)) + 15000; // Random time between 15s and 45s
  const success = Math.random() < 0.8; // 80% chance of success

  setTimeout(() => {
    invoice.status = success ? "Processed" : "Failed";
    invoice.processingEndTime = new Date();
    console.log(
      `[${new Date().toISOString()}] Invoice ${invoiceId} (${
        invoice.fileName
      }) ${success ? "processed successfully" : "failed"}`
    );
  }, processingTime);
};
