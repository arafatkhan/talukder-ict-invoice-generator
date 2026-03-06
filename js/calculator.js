// Calculator Functions for Invoice Generator

// Bengali number conversion
const bengaliNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

function toBengaliNumber(num) {
    return num.toString().split('').map(digit => {
        return digit === '.' ? '.' : bengaliNumbers[parseInt(digit)] || digit;
    }).join('');
}

// Format currency in Bengali style
function formatCurrency(amount) {
    const formatted = parseFloat(amount).toFixed(2);
    return toBengaliNumber(formatted);
}

// Calculate row total
function calculateRowTotal(row) {
    const quantity = parseFloat(row.querySelector('.item-quantity').value) || 0;
    const price = parseFloat(row.querySelector('.item-price').value) || 0;
    const total = quantity * price;
    row.querySelector('.item-total').textContent = formatCurrency(total);
    return total;
}

// Calculate all totals
function calculateTotals() {
    let subtotal = 0;
    
    // Calculate subtotal from all rows
    const rows = document.querySelectorAll('.item-row');
    rows.forEach(row => {
        subtotal += calculateRowTotal(row);
    });
    
    // Display subtotal
    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    
    // Calculate discount
    const discountType = document.getElementById('discountType').value;
    const discountValue = parseFloat(document.getElementById('discountValue').value) || 0;
    let discountAmount = 0;
    
    if (discountType === 'percentage') {
        discountAmount = (subtotal * discountValue) / 100;
    } else {
        discountAmount = discountValue;
    }
    
    document.getElementById('discountAmount').textContent = formatCurrency(discountAmount);
    
    // Calculate after discount
    const afterDiscount = subtotal - discountAmount;
    
    // Calculate tax/VAT
    const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
    const taxAmount = (afterDiscount * taxRate) / 100;
    document.getElementById('taxAmount').textContent = formatCurrency(taxAmount);
    
    // Get shipping charge
    const shippingCharge = parseFloat(document.getElementById('shippingCharge').value) || 0;
    document.getElementById('shippingAmount').textContent = formatCurrency(shippingCharge);
    
    // Calculate grand total
    const grandTotal = afterDiscount + taxAmount + shippingCharge;
    document.getElementById('grandTotal').textContent = formatCurrency(grandTotal);
    
    // Convert to words
    document.getElementById('amountInWords').textContent = numberToWords(grandTotal);
    
    // Calculate due amount
    calculateDue();
}

// Calculate due amount
function calculateDue() {
    const grandTotal = parseFloat(document.getElementById('grandTotal').textContent.replace(/[০-৯।]/g, 
        match => bengaliNumbers.indexOf(match) >= 0 ? bengaliNumbers.indexOf(match) : match)) || 0;
    const paidAmount = parseFloat(document.getElementById('paidAmount').value) || 0;
    const dueAmount = grandTotal - paidAmount;
    
    document.getElementById('dueAmount').textContent = formatCurrency(dueAmount);
}

// Convert number to words in English and Bengali
function numberToWords(amount) {
    const num = Math.floor(amount);
    const decimal = Math.round((amount - num) * 100);
    
    if (num === 0 && decimal === 0) {
        return 'Zero Taka Only / শূন্য টাকা মাত্র';
    }
    
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    
    const onesBn = ['', 'এক', 'দুই', 'তিন', 'চার', 'পাঁচ', 'ছয়', 'সাত', 'আট', 'নয়'];
    const tensBn = ['', '', 'বিশ', 'ত্রিশ', 'চল্লিশ', 'পঞ্চাশ', 'ষাট', 'সত্তর', 'আশি', 'নব্বই'];
    const teensBn = ['দশ', 'এগারো', 'বারো', 'তেরো', 'চৌদ্দ', 'পনেরো', 'ষোলো', 'সতেরো', 'আঠারো', 'উনিশ'];
    
    function convertBelowThousand(n, lang = 'en') {
        if (n === 0) return '';
        
        const o = lang === 'en' ? ones : onesBn;
        const t = lang === 'en' ? tens : tensBn;
        const te = lang === 'en' ? teens : teensBn;
        const hundred = lang === 'en' ? 'Hundred' : 'শত';
        
        let result = '';
        
        if (n >= 100) {
            result += o[Math.floor(n / 100)] + ' ' + hundred + ' ';
            n %= 100;
        }
        
        if (n >= 20) {
            result += t[Math.floor(n / 10)] + ' ';
            n %= 10;
        } else if (n >= 10) {
            result += te[n - 10] + ' ';
            n = 0;
        }
        
        if (n > 0) {
            result += o[n] + ' ';
        }
        
        return result.trim();
    }
    
    function convertToWords(n, lang = 'en') {
        if (n === 0) return lang === 'en' ? 'Zero' : 'শূন্য';
        
        const billion = Math.floor(n / 1000000000);
        const million = Math.floor((n % 1000000000) / 1000000);
        const thousand = Math.floor((n % 1000000) / 1000);
        const remainder = n % 1000;
        
        let result = '';
        
        if (billion > 0) {
            result += convertBelowThousand(billion, lang) + (lang === 'en' ? ' Billion ' : ' বিলিয়ন ');
        }
        if (million > 0) {
            result += convertBelowThousand(million, lang) + (lang === 'en' ? ' Million ' : ' মিলিয়ন ');
        }
        if (thousand > 0) {
            result += convertBelowThousand(thousand, lang) + (lang === 'en' ? ' Thousand ' : ' হাজার ');
        }
        if (remainder > 0) {
            result += convertBelowThousand(remainder, lang);
        }
        
        return result.trim();
    }
    
    let english = convertToWords(num, 'en') + ' Taka';
    let bengali = convertToWords(num, 'bn') + ' টাকা';
    
    if (decimal > 0) {
        english += ' and ' + convertToWords(decimal, 'en') + ' Paisa';
        bengali += ' ' + convertToWords(decimal, 'bn') + ' পয়সা';
    }
    
    english += ' Only';
    bengali += ' মাত্র';
    
    return english + ' / ' + bengali;
}

// Add event listeners to all quantity and price inputs
function attachCalculationListeners() {
    document.querySelectorAll('.item-quantity, .item-price').forEach(input => {
        input.removeEventListener('input', calculateTotals);
        input.addEventListener('input', calculateTotals);
    });
}

// Initialize calculations on page load
document.addEventListener('DOMContentLoaded', function() {
    attachCalculationListeners();
    calculateTotals();
});
