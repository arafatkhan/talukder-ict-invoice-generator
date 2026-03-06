# 🧾 Talukder ICT Invoice Generator

একটি সম্পূর্ণ বাংলা-ইংরেজি দ্বিভাষিক Invoice Generator যা HTML, CSS এবং JavaScript দিয়ে তৈরি।  
A complete bilingual (Bengali-English) Invoice Generator built with HTML, CSS, and JavaScript.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## ✨ Features / বৈশিষ্ট্য

### 🎯 Core Features
- ✅ **Professional Invoice Layout** - Clean and modern design
- ✅ **Responsive Design** - Works on mobile, tablet, and desktop
- ✅ **Dynamic Row Management** - Add/delete product rows easily
- ✅ **Auto Calculations** - Real-time calculation of totals
- ✅ **Bengali Number Support** - Display amounts in Bengali numerals
- ✅ **Amount in Words** - Convert numbers to Bengali and English words
- ✅ **Print Friendly** - Optimized print layout
- ✅ **PDF Export** - Download invoice as PDF
- ✅ **Save & Load Drafts** - Save work and continue later
- ✅ **LocalStorage** - All data saved in browser (no server needed)
- ✅ **Invoice History** - Keep track of last 10 invoices
- ✅ **Auto Invoice Number** - Generate unique invoice numbers

### 💰 Payment Features
- Multiple payment methods (Cash, Bank Transfer, bKash, Nagad, Rocket)
- Payment status tracking (Paid, Unpaid, Partial)
- Transaction ID recording
- Due amount calculation

### 🧮 Calculation Features
- Subtotal calculation
- Discount (Percentage or Fixed amount)
- Tax/VAT (Percentage)
- Shipping charges
- Grand total with auto-update
- Paid and due amount tracking

### 🎨 Design Features
- Color-coded sections
- Bengali and English bilingual interface
- Professional company header with logo
- Terms & conditions section
- Signature areas
- Print optimization with separate CSS

## 📁 File Structure

```
talukde-ict-invoice-generator/
├── index.html              # Main HTML file
├── css/
│   ├── style.css          # Main styles
│   └── print.css          # Print-specific styles
├── js/
│   ├── main.js            # Core functionality
│   ├── calculator.js      # Calculation logic
│   └── storage.js         # LocalStorage handling
├── images/
│   └── logo.svg           # Company logo (SVG)
├── plan.md                # Project planning document
└── README.md              # This file
```

## 🚀 Getting Started / শুরু করুন

### Installation / ইনস্টলেশন

1. **Download or Clone** this repository
   ```bash
   git clone https://github.com/yourusername/talukde-ict-invoice-generator.git
   ```

2. **Open** `index.html` in your web browser

3. **Start creating invoices!** / চালান তৈরি শুরু করুন!

### No Installation Required! / কোনো ইনস্টলেশন লাগবে না!
- No server needed / সার্ভার লাগবে না
- No internet connection required / ইন্টারনেট কানেকশন লাগবে না
- Works completely offline / সম্পূর্ণ অফলাইনে কাজ করে
- All data stored in browser / সব ডেটা ব্রাউজারে সংরক্ষিত

## 📖 How to Use / কিভাবে ব্যবহার করবেন

### Creating an Invoice / চালান তৈরি করা

1. **Fill Company Details** (First time only)
   - Company name, address, phone, email
   - Upload company logo (optional)

2. **Enter Customer Information** / গ্রাহক তথ্য দিন
   - Customer name (required)
   - Company, address, phone, email

3. **Add Products/Services** / পণ্য/সেবা যোগ করুন
   - Click "Add Row" to add more items
   - Enter name, description, quantity, and price
   - Total is calculated automatically

4. **Set Payment Details** / পেমেন্ট তথ্য দিন
   - Select payment method
   - Enter transaction ID (if applicable)
   - Set payment status

5. **Apply Discounts/Tax** / ছাড়/কর প্রয়োগ করুন
   - Add discount (percentage or fixed)
   - Add tax/VAT rate
   - Add shipping charges
   - Grand total updates automatically

6. **Add Terms & Notes** / শর্ত ও নোট যোগ করুন
   - Customize terms and conditions
   - Add special notes or remarks

7. **Print or Download** / প্রিন্ট বা ডাউনলোড
   - Click "Print Invoice" to print
   - Click "Download PDF" to save as PDF

### Keyboard Shortcuts / কীবোর্ড শর্টকাট

- `Ctrl/Cmd + P` - Print Invoice
- `Ctrl/Cmd + S` - Save Draft
- `Ctrl/Cmd + L` - Load Draft
- `Ctrl/Cmd + N` - Clear/New Invoice
- `Ctrl/Cmd + +` - Add New Row

## 🎨 Customization / কাস্টমাইজেশন

### Change Company Information

Edit these fields in [index.html](index.html):

```html
<span id="companyAddress">Your Address</span>
<span id="companyPhone">Your Phone</span>
<span id="companyEmail">Your Email</span>
<span id="companyWebsite">Your Website</span>
<span id="tradeLicense">Your Trade License</span>
```

### Change Colors

Edit [css/style.css](css/style.css):

```css
/* Primary Color */
--primary-color: #3498db;

/* Success Color */
--success-color: #27ae60;

/* Danger Color */
--danger-color: #e74c3c;
```

### Change Logo

Replace [images/logo.svg](images/logo.svg) with your own logo (PNG, JPG, or SVG)

## 💾 Data Management / ডেটা ম্যানেজমেন্ট

### Save Draft / খসড়া সংরক্ষণ
- Click "Save Draft" button
- Data saved in browser's LocalStorage
- Automatically prompts to load on next visit

### Load Draft / খসড়া লোড
- Click "Load Draft" button
- Restores last saved invoice

### Invoice History / চালান ইতিহাস
- Automatically saves last 10 invoices
- Access through browser's LocalStorage
- Export as JSON for backup

### Export/Import Data
- Export invoice history as JSON
- Import previously exported data
- Backup and restore functionality

## 🖨️ Printing / প্রিন্টিং

### Best Practices for Printing:

1. **Use Chrome or Edge** for best results
2. **Print Settings:**
   - Paper Size: A4
   - Margins: Default
   - Scale: 100%
   - Background Graphics: ON

3. **Save as PDF:**
   - Select "Save as PDF" as destination
   - Enable background graphics
   - Click "Save"

## 📱 Browser Compatibility / ব্রাউজার সামঞ্জস্য

✅ **Fully Supported:**
- Google Chrome (Recommended)
- Microsoft Edge
- Firefox
- Safari
- Opera

✅ **Mobile Browsers:**
- Chrome Mobile
- Safari iOS
- Samsung Internet
- Firefox Mobile

## 🔒 Privacy / গোপনীয়তা

- ✅ **100% Client-Side** - No data sent to any server
- ✅ **No Registration** - No account needed
- ✅ **No Tracking** - No analytics or tracking
- ✅ **Offline First** - Works without internet
- ✅ **Local Storage Only** - All data stays in your browser

## 🛠️ Technologies Used / ব্যবহৃত প্রযুক্তি

- **HTML5** - Structure
- **CSS3** - Styling with Flexbox & Grid
- **JavaScript (ES6+)** - Functionality
- **LocalStorage API** - Data persistence
- **Print CSS** - Print optimization

## 📝 License / লাইসেন্স

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Developer / ডেভেলপার

**Talukder ICT Firm**
- Website: www.talukderict.com
- Email: info@talukderict.com
- Phone: +880 1XXX-XXXXXX

## 🤝 Contributing / অবদান

Contributions are welcome! / অবদান স্বাগত!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 🐛 Bug Reports / বাগ রিপোর্ট

Found a bug? Please open an issue with:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)

## 💡 Feature Requests

Have an idea? Open an issue with:
- Feature description
- Use case
- Benefits

## 📊 Changelog / পরিবর্তনলগ

### Version 1.0.0 (March 5, 2026)
- ✅ Initial release
- ✅ Basic invoice generation
- ✅ Bengali number support
- ✅ Print functionality
- ✅ Save/Load drafts
- ✅ LocalStorage integration
- ✅ Responsive design
- ✅ Multiple payment methods

## 🎯 Future Enhancements / ভবিষ্যৎ উন্নয়ন

- [ ] Dark mode / ডার্ক মোড
- [ ] Multiple currency support
- [ ] Email invoice functionality
- [ ] Invoice templates
- [ ] Database integration option
- [ ] User authentication
- [ ] Invoice tracking system
- [ ] Expense tracking
- [ ] Client management
- [ ] Product catalog
- [ ] Recurring invoices
- [ ] Multi-language support (more languages)

## 📞 Support / সহায়তা

Need help? / সাহায্য দরকার?

- 📧 Email: support@talukderict.com
- 📱 Phone: +880 1XXX-XXXXXX
- 🌐 Website: www.talukderict.com

## ⭐ Show Your Support

If you like this project, please give it a ⭐ on GitHub!

---

**Made with ❤️ in Bangladesh 🇧🇩**  
**বাংলাদেশে ভালোবাসা দিয়ে তৈরি 🇧🇩**

© 2026 Talukder ICT Firm. All rights reserved.
