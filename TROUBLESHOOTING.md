# 🔧 Troubleshooting Guide / সমস্যা সমাধান গাইড

## ⚠️ Buttons Not Working? / বাটন কাজ করছে না?

যদি 🖨️ Print Invoice, 📥 Download PDF, 💾 Save Draft, 📂 Load Draft, 🗑️ Clear Form বাটনগুলো কাজ না করে:

### Solution 1: Hard Refresh / হার্ড রিফ্রেশ করুন
**Windows:**
- Press `Ctrl + F5` or `Ctrl + Shift + R`
- This clears cache and reloads everything

**Mac:**
- Press `Cmd + Shift + R`

### Solution 2: Check Browser Console / ব্রাউজার কনসোল চেক করুন

1. Open the page in browser
2. Press `F12` or `Ctrl + Shift + I`
3. Go to "Console" tab
4. Look for any RED errors
5. Take a screenshot and share if you see errors

### Solution 3: Reopen File / ফাইল আবার খুলুন

1. Close the browser completely
2. Right-click `index.html`
3. Open with → Google Chrome or Microsoft Edge
4. Try the buttons again

### Solution 4: Check File Paths / ফাইল পাথ চেক করুন

Make sure these files exist in correct locations:
```
talukde-ict-invoice-generator/
├── index.html               ✓ Must be here
├── css/
│   ├── style.css           ✓ Must exist
│   └── print.css           ✓ Must exist
├── js/
│   ├── main.js             ✓ Must exist (contains button functions)
│   ├── calculator.js       ✓ Must exist
│   └── storage.js          ✓ Must exist
└── images/
    └── talukder-ict.jpg    ⚠️ Add your logo here
```

### Solution 5: Test in Different Browser / অন্য ব্রাউজারে টেস্ট করুন

Try opening in:
- ✅ Google Chrome (Recommended)
- ✅ Microsoft Edge (Recommended)
- ✅ Firefox
- ⚠️ Avoid Internet Explorer (outdated)

---

## 🧪 Quick Test / দ্রুত টেস্ট

### Test if JavaScript is Working:
1. Open `index.html` in browser
2. Press `F12` to open Developer Tools
3. Go to "Console" tab
4. Type: `printInvoice()`
5. Press Enter
6. If print dialog opens → **JavaScript is working!** ✅
7. If you see error → **Problem detected!** ❌

---

## 📱 Common Issues & Fixes / সাধারণ সমস্যা ও সমাধান

### Issue 1: Print Dialog Not Opening
**Fix:** 
- Check if pop-up blocker is blocking it
- Allow pop-ups for this page
- Try keyboard shortcut: `Ctrl + P`

### Issue 2: PDF Download Not Working
**Fix:**
- The app uses browser's print feature
- Click "Print Invoice" → Choose "Save as PDF"
- This is the standard way to create PDF

### Issue 3: Save Draft Not Saving
**Fix:**
- Make sure LocalStorage is enabled in browser
- Check if browser is in "Incognito/Private" mode
- Private mode may block LocalStorage
- Use normal browser window

### Issue 4: Logo Not Showing
**Fix:**
- Add `talukder-ict.jpg` to `images/` folder
- Or temporarily use: `logo.svg` (already exists)
- Edit line 26 in `index.html` if needed

### Issue 5: Bengali Text Not Showing
**Fix:**
- Make sure browser encoding is UTF-8
- In Chrome: Settings → Languages → Add Bengali
- Refresh the page

---

## ✅ Expected Behavior / প্রত্যাশিত আচরণ

### 🖨️ Print Invoice Button:
- **Should:** Open browser print dialog
- **Then:** You can print or save as PDF

### 📥 Download PDF Button:
- **Should:** Either open print dialog OR generate PDF
- **Note:** Uses browser print → Save as PDF

### 💾 Save Draft Button:
- **Should:** Show alert "✅ Draft saved successfully!"
- **Saves:** All invoice data to browser LocalStorage

### 📂 Load Draft Button:
- **Should:** Ask "Do you want to load it?"
- **Loads:** Previously saved invoice data

### 🗑️ Clear Form Button:
- **Should:** Ask "Are you sure?"
- **Then:** Reset all fields to default values

---

## 🆘 Still Not Working? / এখনও কাজ করছে না?

### Method 1: Reinstall
1. Delete the entire folder
2. Extract/copy fresh files again
3. Open `index.html`

### Method 2: Check File Integrity
Run this in PowerShell (in project folder):
```powershell
Get-ChildItem -Recurse -File | Select-Object Name, Length
```

Expected files:
- index.html (≈12KB)
- style.css (≈8KB)
- print.css (≈3KB)
- main.js (≈13KB)
- calculator.js (≈7KB)
- storage.js (≈9KB)

### Method 3: Manual Test
Create a simple test file:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Test</title>
</head>
<body>
    <button onclick="alert('Working!')">Click Me</button>
    
    <script src="js/main.js"></script>
    <script src="js/calculator.js"></script>
    <script src="js/storage.js"></script>
    
    <script>
        console.log('Scripts loaded:', typeof printInvoice);
    </script>
</body>
</html>
```

Save as `test.html` in same folder and open it.
- If alert works → Basic JavaScript OK ✅
- Check console for "function" message

---

## 📞 Need More Help? / আরও সাহায্য দরকার?

1. **Take Screenshot** of any error messages (Red text in Console)
2. **Note** which browser you're using
3. **Share** the screenshot
4. **Email:** arafatkhanju@gmail.com

---

## 🔍 Debug Info / ডিবাগ তথ্য

When reporting issues, include:
- ✅ Browser name and version
- ✅ Operating System (Windows 10/11, etc.)
- ✅ Screenshot of Console (F12 → Console tab)
- ✅ Which button is not working
- ✅ Any error messages

---

**Last Updated:** March 5, 2026  
**Version:** 1.0.0
