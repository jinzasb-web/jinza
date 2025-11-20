# JINZA Trading Corporate Site & Operations Suite

A single-page corporate presence with direct access to JINZA Trading&rsquo;s bilingual Inventory & Accounting operations suite. Built for Malaysian regulatory alignment and SST compliance.

## About JINZA & Partner Brands

JINZA Trading Sdn. Bhd. is the authorized distributor for premium coating solutions in Malaysia, representing 3TREES, CKS, Chenyang, and Oriental Yuhong. The homepage introduces our brand story, core value propositions, and allows quick access to partner brand microsites.

## Key Features

✨ **Corporate Presence**
- 🎨 Modern split-layout homepage highlighting company mission and partner brands
- 📱 Responsive grid for brand showcase and social links
- � Built-in WeChat QR modal for quick contact

🛠️ **Operations Suite Access**
- 🔐 Login button on homepage with bilingual interface (Chinese / English)
- 🧾 Demo credentials for rapid evaluation: `admin@jinza.com / SST2025!`
- � Inventory, Purchasing, Sales, and Accounting modules summarised against Malaysian SST & MFRS requirements
- � Functional items display bilingual labels; data entry fields remain in English to match statutory filings
- 📊 Interactive dashboards: searchable stock, purchase, sales tables plus ledger & trial balance snapshots

## Website Structure

```
jinza web/
├── index.html          # Corporate landing page with login entry
├── system.html         # Inventory & Accounting operations suite (post-login)
├── css/
│   └── style.css      # Stylesheet
├── js/
│   ├── script.js      # Landing page interactions & login modal
│   └── system.js      # Operations suite navigation & form handling
├── images/            # Image resources folder
│   ├── jinza-logo.png # Company logo
│   └── README.md      # Image documentation
├── videos/            # Video resources folder
│   ├── hero-video.mp4 # Background video (add your video here)
│   └── README.md      # Video setup guide
└── README.md          # This document
```

## Page Sections

1. **About JINZA** &ndash; Mission, differentiators, and compliance note
2. **Partner Brands Grid** &ndash; Four-card navigation to brand detail pages
3. **Social Footer** &ndash; Facebook, Instagram, TikTok, WhatsApp, WeChat, Email
4. **WeChat Modal** &ndash; QR code popup for direct contact
5. **Operations Suite Login** &ndash; Bilingual button fixed at top-right corner opening the secure login modal

## Quick Start

### Open Directly

1. **Direct Open**
   - Double-click the `index.html` file to open in browser

2. **Using Local Server (Recommended)**
   ```bash
   # If Python 3 is installed
   python -m http.server 8000
   
   # If Python 2 is installed
   python -m SimpleHTTPServer 8000
   
   # If Node.js and http-server are installed
   npx http-server
   ```
   Then visit `http://localhost:8000` in your browser

3. **Using VS Code Live Server**
   - Install Live Server extension
   - Right-click `index.html` and select "Open with Live Server"

### Customization

1. **Update Company Information**
   - Open `index.html`
   - Update contact information, addresses, etc.
   - Modify product descriptions as needed

2. **Replace Images**
   - Place your images in the `images` folder
   - Refer to `images/README.md` for required images
   - Your JINZA logo should be saved as `jinza-logo.png`

3. **Add Background Video**
   - Place your video file in the `videos` folder
   - Name it `hero-video.mp4` (and optionally `hero-video.webm`)
   - Recommended: 1920x1080, under 10MB, 10-30 seconds
   - See `videos/README.md` for detailed video specifications
   - Video will autoplay, loop, and mute automatically

4. **Change Color Theme**
   - Open `css/style.css`
   - Modify CSS variables in `:root`
   ```css
   :root {
       --primary-color: #667eea;    /* Primary color */
       --secondary-color: #764ba2;  /* Secondary color */
       --accent-color: #f093fb;     /* Accent color */
   }
   ```

4. **Add More Content**
   - Copy existing section structures in HTML
   - Adjust content and styles as needed

## Operations Suite Login & Compliance Notes

1. **Launch the Login Modal**
   - On `index.html`, click the button `企业系统登录 / Business Login`
   - Modal highlights bilingual features while keeping form inputs in English

2. **Test Accounts**
   - Administrator &ndash; `admin@jinza.com` / `SST2025!`
   - Operations Manager &ndash; `ops.manager@jinza.com` / `IMS2025!`

3. **Post-login Experience (`system.html`)**
   - **Inventory Operations**: Stock, Purchase, and Sales cards mapped to Malaysian SST workflow requirements
   - **Accounting Ledger**: Journal, Reporting, and Audit Trail summaries referencing MFRS and LHDN expectations
   - **Compliance Guide**: Quick reference for Companies Act 2016, SST Act 2018, and LHDN e-Invoice mandates
   - **Interactive Grids**: Searchable bilingual tables for stock, purchase, sales, ledger, trial balance, and compliance calendar
   - **Metric Cards**: Snapshot tiles for on-hand units, inbound shipments, pending fulfilment, debit/credit totals, and compliance workload

4. **Data Entry Policy**
   - All functional headings and buttons present both Chinese and English
   - Data capture fields remain English-only to match statutory filings, audit trails, and SST submissions

5. **Session Handling**
   - Demo login profile stored in `localStorage` under `jinzaUser`
   - Use the `退出 / Logout` button in the suite header to clear the profile and return to the homepage

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling and animations
  - Flexbox and Grid layout
  - CSS variables
  - Gradients and transitions
- **JavaScript (ES6+)** - Interactive features
  - Slider control
  - Scroll animations
  - Form handling
  - Intersection Observer API
- **Font Awesome 6** - Icon library

## Browser Compatibility

✅ Chrome (Latest)
✅ Firefox (Latest)
✅ Safari (Latest)
✅ Edge (Latest)
⚠️ IE11 (Some features may not be supported)

## Responsive Breakpoints

- 📱 Mobile: < 480px
- 📱 Large Mobile/Tablet: 481px - 768px
- 💻 Tablet/Small Desktop: 769px - 968px
- 🖥️ Desktop: > 968px

## Performance Optimization Tips

1. **Image Optimization**
   - Compress all images (recommend using TinyPNG)
   - Use appropriate image formats (JPEG/PNG/WebP)
   - Consider using lazy loading

2. **Code Optimization**
   - Minify CSS and JavaScript (production)
   - Load external libraries from CDN
   - Enable browser caching

3. **Loading Speed**
   - Optimize font loading
   - Reduce HTTP requests
   - Use async loading

## Deployment

### GitHub Pages
1. Push files to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select main branch as source

### Netlify
1. Drag and drop project to Netlify
2. Or connect Git repository for automatic deployment

### Traditional Server
1. Upload all files to server
2. Ensure server supports static file hosting
3. Configure domain and SSL certificate

## Future Development Suggestions

### Architecture & Documentation
✅ **Completed**: Full system architecture design with Malaysian compliance
- ✅ Comprehensive compliance documentation (Companies Act 2016, SST Act 2018, MFRS, LHDN)
- ✅ Complete chart of accounts (MFRS-aligned)
- ✅ System constants and configuration files
- ✅ Modular ES6+ architecture design

### Short-term (1-2 weeks)
- [ ] Complete core business services (Purchase, Sales, Accounting)
- [ ] Implement basic UI for inventory, purchase, sales modules
- [ ] Develop role-based access control (RBAC)

### Mid-term (2-3 weeks)
- [ ] Build accounting engine with trial balance
- [ ] Implement SST compliance features (SST-02 generation)
- [ ] Create reporting system (inventory, financial, SST reports)

### Long-term (3-4 weeks)
- [ ] Integrate MyInvois API for e-Invoice submission
- [ ] Complete audit system with anomaly detection
- [ ] Backend API development and database setup
- [ ] Production deployment preparation

## System Architecture

### Modular Design
本系统采用现代化的 ES6+ 模块架构，完全符合马来西亚商业法规：

```
js/
├── config/                    # Configuration layer
│   ├── constants.js          # System constants (SST, status, permissions)
│   └── chartOfAccounts.js    # MFRS-aligned chart of accounts
├── models/                    # Data model layer
├── services/                  # Business logic layer
│   ├── inventory.service.js  # ✅ Inventory management
│   ├── purchase.service.js   # ⏳ Purchase management
│   ├── sales.service.js      # ⏳ Sales management
│   └── accounting.service.js # ⏳ Accounting engine
├── controllers/               # Controller layer
└── utils/                     # Utility functions
```

### Compliance Features

✅ **Companies Act 2016**: Audit trail, double-entry bookkeeping  
✅ **SST Act 2018**: Auto SST calculation, SST-02 generation  
✅ **MFRS**: Weighted average costing, revenue recognition  
✅ **LHDN**: e-Invoice ready, complete transaction logs  

## Documentation

📘 [Malaysian Compliance Guide](docs/MALAYSIAN_COMPLIANCE.md)  
📗 [System Architecture](docs/ARCHITECTURE.md)  
📙 [Refactoring Progress](docs/REFACTORING_PROGRESS.md)  


## Important Note

**This website is operated by the authorized distributor of 3TREES Group for Malaysia. All content related to 3TREES brand is used with proper authorization.**

## Contact

For inquiries about 3TREES products in Malaysia, please use the contact form on the website or reach out through the provided contact information.

---

**Last Updated:** November 21, 2025  
**Version:** 2.0.0 (Architecture Refactoring)  
**Authorized Distributor:** Malaysia Region  
**Compliance Status:** Fully aligned with Companies Act 2016, SST Act 2018, MFRS, LHDN
