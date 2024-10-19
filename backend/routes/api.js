const express = require('express');
const XLSX = require('xlsx');
const path = require('path'); // Import path module
const router = express.Router();

// Sample function to read the Excel file
const readExcelData = () => {
    const filePath = path.join(__dirname, '../data/excelData.xlsx'); // Create an absolute path
    const workbook = XLSX.readFile(filePath); // Use the absolute path
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(firstSheet);
    return jsonData;
};

// API endpoint to get data
router.get('/data', (req, res) => {
    try {
        const data = readExcelData();
        res.json(data);
    } catch (error) {
        console.error('Error reading Excel file:', error); // Log the error for debugging
        res.status(500).json({ error: 'Error reading Excel file' });
    }
});

module.exports = router;
