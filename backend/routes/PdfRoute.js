import express from "express";
import generatePDF from "../utils/GeneratePdf.js"; // Assuming GeneratePdf is an ES module
import fs from "fs"; // To delete the temp file after download

const router = express.Router();

router.get('/generate-pdf', (req, res) => {
    const order = {
        orderNumber: '#INV-P',
        orderDate: '02/13/2018',
        name: 'Chloe Altree',
        email: 'scastelo@cisco.com',
        phone: '(283) 945-7293',
        address: '90043 Steenslan\nHayward, Ca, 94544', // Use \n for newlines in address
        paymentMethod: 'Credit Card',
        remarks: 'Duis consequat dui nec nisi vol...', // Your remarks text here
        items: [
            { description: 'Notebook x3', price: 4.00, quantity: 3 },
            { description: 'Pencil case', price: 6.00, quantity: 1 },
            { description: 'Scissors', price: 3.00, quantity: 1 },
        ],
        total: 21.00, // This can be calculated dynamically if needed
    };

    // Generate PDF for the order
    generatePDF(order, (err, filePath) => {
        if (err) {
            console.error("PDF Generation Error:", err);
            return res.status(500).send('Error generating PDF');
        }

        // Send the generated PDF as a download
        res.download(filePath, "order_invoice.pdf", (downloadErr) => {
            if (downloadErr) {
                console.error("Download Error:", downloadErr);
                return res.status(500).send('Error downloading PDF');
            }

            // Delete the temporary PDF file after download
            fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr) {
                    console.error("File Cleanup Error:", unlinkErr);
                }
            });
        });
    });
});

export default router;
