// Main JavaScript for Invoice Generator

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('invoiceDate').value = today;
    
    // Set due date (7 days from today)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);
    document.getElementById('dueDate').value = dueDate.toISOString().split('T')[0];
    
    // Generate initial invoice number
    generateInvoiceNumber();
    
    // Attach event listeners
    attachCalculationListeners();
    
    // Calculate initial totals
    calculateTotals();
});

// Generate unique invoice number
function generateInvoiceNumber() {
    const prefix = 'INV-';
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // Get last invoice number from localStorage
    let lastNumber = parseInt(localStorage.getItem('lastInvoiceNumber') || '0');
    lastNumber++;
    
    const invoiceNumber = `${prefix}${year}${month}${day}-${String(lastNumber).padStart(4, '0')}`;
    document.getElementById('invoiceNumber').value = invoiceNumber;
    
    // Save to localStorage
    localStorage.setItem('lastInvoiceNumber', lastNumber.toString());
}

// Add new row to items table
function addRow() {
    const tbody = document.getElementById('itemsTableBody');
    const rowCount = tbody.querySelectorAll('.item-row').length + 1;
    
    const newRow = document.createElement('tr');
    newRow.className = 'item-row';
    newRow.innerHTML = `
        <td class="serial">${rowCount}</td>
        <td><input type="text" class="item-name" placeholder="Product/Service Name"></td>
        <td><input type="text" class="item-description" placeholder="Description"></td>
        <td><input type="number" class="item-quantity" value="1" min="0" step="0.01"></td>
        <td><input type="number" class="item-price" value="0" min="0" step="0.01"></td>
        <td class="item-total">০.০০</td>
        <td class="no-print"><button onclick="deleteRow(this)" class="btn-delete">❌</button></td>
    `;
    
    tbody.appendChild(newRow);
    
    // Update serial numbers
    updateSerialNumbers();
    
    // Attach event listeners to new row
    attachCalculationListeners();
    
    // Calculate totals
    calculateTotals();
}

// Add row with existing data (for loading saved data)
function addRowWithData(item) {
    const tbody = document.getElementById('itemsTableBody');
    const rowCount = tbody.querySelectorAll('.item-row').length + 1;
    
    const newRow = document.createElement('tr');
    newRow.className = 'item-row';
    newRow.innerHTML = `
        <td class="serial">${rowCount}</td>
        <td><input type="text" class="item-name" value="${item.name || ''}" placeholder="Product/Service Name"></td>
        <td><input type="text" class="item-description" value="${item.description || ''}" placeholder="Description"></td>
        <td><input type="number" class="item-quantity" value="${item.quantity || 1}" min="0" step="0.01"></td>
        <td><input type="number" class="item-price" value="${item.price || 0}" min="0" step="0.01"></td>
        <td class="item-total">০.০০</td>
        <td class="no-print"><button onclick="deleteRow(this)" class="btn-delete">❌</button></td>
    `;
    
    tbody.appendChild(newRow);
    
    // Attach event listeners to new row
    attachCalculationListeners();
}

// Delete row from items table
function deleteRow(button) {
    const tbody = document.getElementById('itemsTableBody');
    const rows = tbody.querySelectorAll('.item-row');
    
    // Don't delete if it's the last row
    if (rows.length <= 1) {
        alert('⚠️ Cannot delete the last row / শেষ সারি মুছে ফেলা যাবে না');
        return;
    }
    
    const row = button.closest('.item-row');
    row.remove();
    
    // Update serial numbers
    updateSerialNumbers();
    
    // Recalculate totals
    calculateTotals();
}

// Update serial numbers after adding/deleting rows
function updateSerialNumbers() {
    const rows = document.querySelectorAll('.item-row');
    rows.forEach((row, index) => {
        row.querySelector('.serial').textContent = index + 1;
    });
}

// Print invoice
function printInvoice() {
    // Validate required fields
    if (!validateInvoice()) {
        return;
    }
    
    window.print();
}

// Download as PDF
function downloadPDF() {
    // Validate required fields
    if (!validateInvoice()) {
        return;
    }
    
    // Check if jsPDF is available
    if (typeof jsPDF !== 'undefined') {
        // Use jsPDF if available
        generatePDFWithLibrary();
    } else {
        // Fallback to browser print dialog
        alert('💡 Please use Print and save as PDF / প্রিন্ট করুন এবং PDF হিসেবে সংরক্ষণ করুন');
        window.print();
    }
}

// Generate PDF using jsPDF library (if available)
function generatePDFWithLibrary() {
    try {
        const doc = new jsPDF();
        const invoice = document.getElementById('invoice');
        
        doc.html(invoice, {
            callback: function(doc) {
                const invoiceNumber = document.getElementById('invoiceNumber').value;
                doc.save(`${invoiceNumber}.pdf`);
            },
            x: 10,
            y: 10,
            width: 190,
            windowWidth: 800
        });
    } catch (error) {
        console.error('PDF generation error:', error);
        alert('⚠️ Using browser print instead');
        window.print();
    }
}

// Clear form
function clearForm() {
    if (!confirm('Are you sure you want to clear the form? / ফর্ম মুছে ফেলতে চান?')) {
        return;
    }
    
    // Reset form fields
    document.getElementById('customerName').value = '';
    document.getElementById('customerCompany').value = '';
    document.getElementById('customerAddress').value = '';
    document.getElementById('customerPhone').value = '';
    document.getElementById('customerEmail').value = '';
    
    document.getElementById('paymentMethod').value = 'cash';
    document.getElementById('transactionId').value = '';
    document.getElementById('paymentStatus').value = 'unpaid';
    
    document.getElementById('discountValue').value = '0';
    document.getElementById('taxRate').value = '0';
    document.getElementById('shippingCharge').value = '0';
    document.getElementById('paidAmount').value = '0';
    
    // Clear items table
    const tbody = document.getElementById('itemsTableBody');
    tbody.innerHTML = '';
    addRow(); // Add one empty row
    
    // Reset dates
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('invoiceDate').value = today;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);
    document.getElementById('dueDate').value = dueDate.toISOString().split('T')[0];
    
    // Generate new invoice number
    generateInvoiceNumber();
    
    // Recalculate
    calculateTotals();
    
    alert('✅ Form cleared! / ফর্ম মুছে ফেলা হয়েছে!');
}

// Validate invoice before printing/saving
function validateInvoice() {
    const customerName = document.getElementById('customerName').value.trim();
    
    if (!customerName) {
        alert('⚠️ Please enter customer name / দয়া করে গ্রাহকের নাম লিখুন');
        document.getElementById('customerName').focus();
        return false;
    }
    
    // Check if at least one item has data
    const rows = document.querySelectorAll('.item-row');
    let hasValidItem = false;
    
    rows.forEach(row => {
        const name = row.querySelector('.item-name').value.trim();
        if (name) {
            hasValidItem = true;
        }
    });
    
    if (!hasValidItem) {
        alert('⚠️ Please add at least one item / অন্তত একটি পণ্য/সেবা যোগ করুন');
        return false;
    }
    
    return true;
}

// Preview mode (show/hide inputs)
function togglePreview() {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.classList.toggle('preview-mode');
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + P - Print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        printInvoice();
    }
    
    // Ctrl/Cmd + S - Save Draft
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveDraft();
    }
    
    // Ctrl/Cmd + L - Load Draft
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        loadDraft();
    }
    
    // Ctrl/Cmd + N - New/Clear Form
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        clearForm();
    }
    
    // Ctrl/Cmd + + - Add Row
    if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) {
        e.preventDefault();
        addRow();
    }
});

// Handle payment method change
document.getElementById('paymentMethod').addEventListener('change', function() {
    const transactionGroup = document.getElementById('transactionGroup');
    const value = this.value;
    
    // Show/hide transaction ID field based on payment method
    if (value === 'cash') {
        transactionGroup.style.display = 'none';
    } else {
        transactionGroup.style.display = 'block';
    }
});

// Auto-format phone numbers
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.startsWith('880')) {
        value = '+' + value;
    } else if (value.startsWith('0')) {
        value = '+880' + value.substring(1);
    }
    
    input.value = value;
}

document.getElementById('customerPhone').addEventListener('blur', function() {
    formatPhoneNumber(this);
});

document.getElementById('companyPhone').addEventListener('blur', function() {
    formatPhoneNumber(this);
});

// Handle logo upload (if you want to add this feature)
function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('companyLogo').src = e.target.result;
            // Save to localStorage
            localStorage.setItem('companyLogo', e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

// Load saved logo on page load
const savedLogo = localStorage.getItem('companyLogo');
if (savedLogo) {
    document.getElementById('companyLogo').src = savedLogo;
}

// Copy invoice to clipboard
function copyInvoiceToClipboard() {
    const invoice = document.getElementById('invoice');
    const text = invoice.innerText;
    
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Invoice copied to clipboard! / চালান ক্লিপবোর্ডে কপি হয়েছে!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Show invoice statistics
function showStatistics() {
    const history = getInvoiceHistory();
    
    if (history.length === 0) {
        alert('ℹ️ No invoice history found / কোনো চালান ইতিহাস পাওয়া যায়নি');
        return;
    }
    
    let totalRevenue = 0;
    let totalPaid = 0;
    let totalDue = 0;
    
    history.forEach(invoice => {
        // Calculate totals (simplified)
        totalRevenue += parseFloat(invoice.grandTotal || 0);
        totalPaid += parseFloat(invoice.paidAmount || 0);
    });
    
    totalDue = totalRevenue - totalPaid;
    
    const stats = `
📊 Invoice Statistics / চালান পরিসংখ্যান
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Invoices: ${history.length}
Total Revenue: ৳${totalRevenue.toFixed(2)}
Total Paid: ৳${totalPaid.toFixed(2)}
Total Due: ৳${totalDue.toFixed(2)}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `;
    
    alert(stats);
}

// Console log for debugging
console.log('✅ Talukder ICT Invoice Generator Loaded Successfully!');
console.log('📝 Version: 1.0.0');
console.log('📅 Date: ' + new Date().toLocaleDateString());
