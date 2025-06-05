export interface Invoice {
  id: string;
  fileName: string;
  fileSize: number;
  clientName: string;
  amount: number;
  uploadDate: Date;
  status: "Pending" | "Processing" | "Processed" | "Failed";
  filePath: string;
  processingStartTime?: Date;
  processingEndTime?: Date;
}

// In-memory storage for invoices
export const invoices = new Map<string, Invoice>();
