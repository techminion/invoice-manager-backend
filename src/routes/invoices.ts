import { Request, Response, Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { upload } from "../config/upload";
import { Invoice, invoices } from "../models/Invoice";
import { simulateProcessing } from "../utils/processing";

const router = Router();

// POST /api/invoices/upload
router.post("/upload", (req: Request, res: Response) => {
  const uploadHandler = upload.any();

  uploadHandler(req, res, (err) => {
    if (err) {
      console.error(`[${new Date().toISOString()}] Upload error:`, err.message);
      return res.status(400).json({ error: err.message });
    }

    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      console.log(`[${new Date().toISOString()}] No files uploaded`);
      return res.status(400).json({ error: "No files uploaded" });
    }

    console.log(
      `[${new Date().toISOString()}] Processing ${
        req.files.length
      } uploaded files`
    );
    const createdInvoices: string[] = [];

    req.files.forEach((file: Express.Multer.File) => {
      const invoiceId = uuidv4();
      const invoice: Invoice = {
        id: invoiceId,
        fileName: file.originalname,
        fileSize: file.size,
        clientName: req.body.clientName || "Unknown",
        amount: parseFloat(req.body.amount) || 0,
        uploadDate: new Date(),
        status: "Pending",
        filePath: file.path,
      };

      invoices.set(invoiceId, invoice);
      createdInvoices.push(invoiceId);
      console.log(
        `[${new Date().toISOString()}] Created invoice ${invoiceId} for file ${
          file.originalname
        }`
      );

      // Start simulated processing
      simulateProcessing(invoiceId);
    });

    res.status(201).json({ invoiceIds: createdInvoices });
  });
});

// GET /api/invoices
router.get("/", (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const sortBy = (req.query.sortBy as keyof Invoice) || "uploadDate";
  const sortOrder = (req.query.sortOrder as "asc" | "desc") || "desc";
  const status = req.query.status as Invoice["status"];
  const search = req.query.search as string;

  console.log(
    `[${new Date().toISOString()}] GET /api/invoices - Page: ${page}, Limit: ${limit}, Status: ${status}, Search: ${search}`
  );

  let filteredInvoices = Array.from(invoices.values());

  // Apply status filter
  if (status) {
    filteredInvoices = filteredInvoices.filter(
      (invoice) => invoice.status === status
    );
  }

  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase();
    filteredInvoices = filteredInvoices.filter(
      (invoice) =>
        invoice.fileName.toLowerCase().includes(searchLower) ||
        invoice.clientName.toLowerCase().includes(searchLower)
    );
  }

  // Apply sorting
  filteredInvoices.sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (aValue === undefined || bValue === undefined) return 0;
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedInvoices = filteredInvoices.slice(startIndex, endIndex);

  console.log(
    `[${new Date().toISOString()}] Returning ${
      paginatedInvoices.length
    } invoices out of ${filteredInvoices.length} total`
  );

  res.json({
    invoices: paginatedInvoices,
    total: filteredInvoices.length,
    page,
    limit,
  });
});

// GET /api/invoices/:id
router.get("/:id", (req: Request, res: Response) => {
  const invoiceId = req.params.id;
  const invoice = invoices.get(invoiceId);

  console.log(`[${new Date().toISOString()}] GET /api/invoices/${invoiceId}`);

  if (!invoice) {
    console.log(`[${new Date().toISOString()}] Invoice ${invoiceId} not found`);
    res.status(404).json({ error: "Invoice not found" });
    return;
  }

  console.log(
    `[${new Date().toISOString()}] Returning invoice ${invoiceId} with status ${
      invoice.status
    }`
  );
  res.json(invoice);
});

export default router;
