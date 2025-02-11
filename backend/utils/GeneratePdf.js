import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get current module's directory since __dirname is not available in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generatePDF = (order, callback) => {
    const receiptsDir = path.join(__dirname, "../receipts");
    if (!fs.existsSync(receiptsDir)) fs.mkdirSync(receiptsDir);

    const fileName = `invoice_${order.orderNumber}.pdf`;
    const filePath = path.join(receiptsDir, fileName);

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // --- Color Definitions ---
    const primaryColor = '#007bff'; // Example: Bootstrap primary blue
    const grayColor = '#6c757d'; // Example: Bootstrap gray
    const lightGray = '#f8f9fa'; // Example: Bootstrap light gray
    const darkGray = '#343a40'; // Example: Bootstrap dark gray

    // --- Header ---
    doc.rect(0, 0, 612, 80).fill(primaryColor); // Colored header background
    doc.fontSize(20).fillColor('white').text('GAC Order Invoice', 50, 25);
    doc.fontSize(14).fillColor('white').text(`Order Date: ${order.orderDate}`, { align: 'right', x: 562, y: 25 }); // Adjusted x position
    doc.fontSize(14).fillColor('white').text(`Order Number: ${order.orderNumber}`, { align: 'right', x: 562, y: 50 }); // Adjusted x position
    doc.moveDown(1);

    // --- Customer Information Box ---
    doc.lineJoin('round')
        .rect(50, 100, 500, 140) // Adjusted height
        .stroke(grayColor); // Gray border
    doc.fontSize(12).fillColor(darkGray); // Dark gray text

    doc.text(`Customer: ${order.name}`, 70, 115);
    doc.text(`Email: ${order.email}`, 70, 130);
    doc.text(`Phone: ${order.phone}`, 70, 145);
    doc.text(`Address: ${order.address}`, 70, 160);

    // --- Remarks Box ---
    doc.fontSize(12).text('Remarks/Special Instructions:', 70, 250); // Adjusted y position
    doc.rect(70, 270, 460, 50).stroke(grayColor); // Gray border
    doc.fontSize(12).text(`${order.remarks}`, 80, 275, { width: 440, height: 40 }); // Text wrapping

    doc.moveDown(1); // Reduced move down

    // --- Product List ---
    doc.fontSize(14).fillColor(darkGray).text('Product List', { underline: true });
    doc.moveDown(0.5);

    // Table headers
    doc.fontSize(12).fillColor(darkGray).text('Description', 70, doc.y);
    doc.text('Price', 350, doc.y, { align: 'right' });
    doc.text('Quantity', 450, doc.y, { align: 'right' });
    doc.text('Total', 500, doc.y, { align: 'right' });

    doc.lineWidth(0.5).moveTo(70, doc.y + 10).lineTo(550, doc.y + 10).stroke(); // Underline header row
    doc.moveDown(1);

    // Product List Items
    order.items.forEach((item, index) => {
        const total = item.price * item.quantity;
        doc.text(item.description, 70, doc.y);
        doc.text(`INR${item.price.toFixed(2)}`, 350, doc.y, { align: 'right' });
        doc.text(`${item.quantity}`, 450, doc.y, { align: 'right' });
        doc.text(`INR${total.toFixed(2)}`, 500, doc.y, { align: 'right' });
        doc.moveDown(0.5);
    });

    // --- Total Amount ---
    doc.fontSize(14).fillColor(darkGray).text('Total', 400, doc.y, { align: 'right' });
    doc.fontSize(14).fillColor(darkGray).text(`$${order.total.toFixed(2)}`, 450, doc.y, { align: 'right' });

    // Footer
    doc.moveDown(2);
    doc.fontSize(10).fillColor(grayColor).text('Thank you for shopping with us!', 70, doc.y);

    doc.end();

    stream.on("finish", () => callback(null, filePath));
    stream.on("error", (err) => callback(err, null));
};

export default generatePDF;
