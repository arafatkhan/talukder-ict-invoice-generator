// LocalStorage Management for Invoice Generator

// Save draft to localStorage
function saveDraft() {
    const invoiceData = {
        // Invoice details
        invoiceNumber: document.getElementById('invoiceNumber').value,
        invoiceDate: document.getElementById('invoiceDate').value,
        dueDate: document.getElementById('dueDate').value,
        paymentStatus: document.getElementById('paymentStatus').value,
        
        // Customer details
        customerName: document.getElementById('customerName').value,
        customerCompany: document.getElementById('customerCompany').value,
        customerAddress: document.getElementById('customerAddress').value,
        customerPhone: document.getElementById('customerPhone').value,
        customerEmail: document.getElementById('customerEmail').value,
        
        // Items
        items: [],
        
        // Payment info
        paymentMethod: document.getElementById('paymentMethod').value,
        transactionId: document.getElementById('transactionId').value,
        
        // Calculations
        discountType: document.getElementById('discountType').value,
        discountValue: document.getElementById('discountValue').value,
        taxRate: document.getElementById('taxRate').value,
        shippingCharge: document.getElementById('shippingCharge').value,
        paidAmount: document.getElementById('paidAmount').value,
        
        // Terms and notes
        terms: document.getElementById('terms').value,
        notes: document.getElementById('notes').value,
        
        // Timestamp
        savedAt: new Date().toISOString()
    };
    
    // Get all items
    const rows = document.querySelectorAll('.item-row');
    rows.forEach(row => {
        const item = {
            name: row.querySelector('.item-name').value,
            description: row.querySelector('.item-description').value,
            quantity: row.querySelector('.item-quantity').value,
            price: row.querySelector('.item-price').value
        };
        invoiceData.items.push(item);
    });
    
    // Save to localStorage
    try {
        localStorage.setItem('invoiceDraft', JSON.stringify(invoiceData));
        
        // Also save to history
        saveToHistory(invoiceData);
        
        alert('✅ Draft saved successfully! / খসড়া সফলভাবে সংরক্ষিত হয়েছে!');
    } catch (error) {
        alert('❌ Error saving draft: ' + error.message);
    }
}

// Load draft from localStorage
function loadDraft() {
    try {
        const savedData = localStorage.getItem('invoiceDraft');
        
        if (!savedData) {
            alert('ℹ️ No saved draft found / কোনো খসড়া পাওয়া যায়নি');
            return;
        }
        
        const invoiceData = JSON.parse(savedData);
        
        // Load invoice details
        document.getElementById('invoiceNumber').value = invoiceData.invoiceNumber || '';
        document.getElementById('invoiceDate').value = invoiceData.invoiceDate || '';
        document.getElementById('dueDate').value = invoiceData.dueDate || '';
        document.getElementById('paymentStatus').value = invoiceData.paymentStatus || 'unpaid';
        
        // Load customer details
        document.getElementById('customerName').value = invoiceData.customerName || '';
        document.getElementById('customerCompany').value = invoiceData.customerCompany || '';
        document.getElementById('customerAddress').value = invoiceData.customerAddress || '';
        document.getElementById('customerPhone').value = invoiceData.customerPhone || '';
        document.getElementById('customerEmail').value = invoiceData.customerEmail || '';
        
        // Load payment info
        document.getElementById('paymentMethod').value = invoiceData.paymentMethod || 'cash';
        document.getElementById('transactionId').value = invoiceData.transactionId || '';
        
        // Load calculations
        document.getElementById('discountType').value = invoiceData.discountType || 'percentage';
        document.getElementById('discountValue').value = invoiceData.discountValue || '0';
        document.getElementById('taxRate').value = invoiceData.taxRate || '0';
        document.getElementById('shippingCharge').value = invoiceData.shippingCharge || '0';
        document.getElementById('paidAmount').value = invoiceData.paidAmount || '0';
        
        // Load terms and notes
        document.getElementById('terms').value = invoiceData.terms || '';
        document.getElementById('notes').value = invoiceData.notes || '';
        
        // Clear existing items and load saved items
        const tbody = document.getElementById('itemsTableBody');
        tbody.innerHTML = '';
        
        if (invoiceData.items && invoiceData.items.length > 0) {
            invoiceData.items.forEach(item => {
                addRowWithData(item);
            });
        } else {
            addRow(); // Add at least one empty row
        }
        
        // Recalculate totals
        calculateTotals();
        
        alert('✅ Draft loaded successfully! / খসড়া সফলভাবে লোড হয়েছে!');
    } catch (error) {
        alert('❌ Error loading draft: ' + error.message);
    }
}

// Save to history (keep last 10 invoices)
function saveToHistory(invoiceData) {
    try {
        let history = JSON.parse(localStorage.getItem('invoiceHistory') || '[]');
        
        // Add current invoice to history
        history.unshift(invoiceData);
        
        // Keep only last 10 invoices
        if (history.length > 10) {
            history = history.slice(0, 10);
        }
        
        localStorage.setItem('invoiceHistory', JSON.stringify(history));
    } catch (error) {
        console.error('Error saving to history:', error);
    }
}

// Get invoice history
function getInvoiceHistory() {
    try {
        return JSON.parse(localStorage.getItem('invoiceHistory') || '[]');
    } catch (error) {
        console.error('Error getting history:', error);
        return [];
    }
}

// Clear all localStorage data
function clearStorage() {
    if (confirm('Are you sure you want to clear all saved data? / সব সংরক্ষিত ডেটা মুছে ফেলতে চান?')) {
        localStorage.removeItem('invoiceDraft');
        localStorage.removeItem('invoiceHistory');
        alert('✅ All data cleared! / সব ডেটা মুছে ফেলা হয়েছে!');
    }
}

// Export data as JSON
function exportData() {
    try {
        const history = getInvoiceHistory();
        const dataStr = JSON.stringify(history, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(dataBlob);
        downloadLink.download = 'invoice-history-' + new Date().toISOString().split('T')[0] + '.json';
        downloadLink.click();
        
        alert('✅ Data exported successfully! / ডেটা সফলভাবে এক্সপোর্ট হয়েছে!');
    } catch (error) {
        alert('❌ Error exporting data: ' + error.message);
    }
}

// Import data from JSON
function importData(event) {
    const file = event.target.files[0];
    
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            if (Array.isArray(importedData)) {
                localStorage.setItem('invoiceHistory', JSON.stringify(importedData));
                alert('✅ Data imported successfully! / ডেটা সফলভাবে ইমপোর্ট হয়েছে!');
            } else {
                alert('❌ Invalid data format / অবৈধ ডেটা ফরম্যাট');
            }
        } catch (error) {
            alert('❌ Error importing data: ' + error.message);
        }
    };
    
    reader.readAsText(file);
}

// Auto-save functionality (optional)
let autoSaveTimer;
function enableAutoSave() {
    // Clear existing timer
    if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
    }
    
    // Save every 2 minutes
    autoSaveTimer = setTimeout(() => {
        saveDraft();
        enableAutoSave(); // Re-enable for next save
    }, 120000);
}

// Initialize storage on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if there's a recent draft
    const savedData = localStorage.getItem('invoiceDraft');
    if (savedData) {
        const data = JSON.parse(savedData);
        const savedDate = new Date(data.savedAt);
        const now = new Date();
        const hoursDiff = (now - savedDate) / (1000 * 60 * 60);
        
        // If saved within last 24 hours, notify user
        if (hoursDiff < 24) {
            if (confirm('Found a recent draft. Do you want to load it? / সাম্প্রতিক খসড়া পাওয়া গেছে। লোড করতে চান?')) {
                loadDraft();
            }
        }
    }
    
    // Enable auto-save (optional)
    // enableAutoSave();
});
