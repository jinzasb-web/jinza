# JINZA Trading Corporate Website# JINZA Tr## Key Features



Official corporate website for **JINZA Trading Sdn. Bhd.**, Malaysia's authorized distributor of premium coating solutions.✨ **Corporate Presence**

- 🎨 Modern split-layout homepage highlighting company mission and partner brands

**Version**: 3.0.0 | **Type**: Corporate Showcase | **Status**: 🌐 Production Ready- 📱 Responsive grid for brand showcase and social links

- 💬 Built-in WeChat QR modal for quick contact

---

🚀 **Development & Testing** (NEW)

## 🏢 About JINZA Trading- 🧪 **dev-entry.html**: Beautiful development testing portal with 3 test accounts

- ⚡ Quick login simulation (Admin, Operations Manager, Accountant)

JINZA Trading Sdn. Bhd. is the authorized distributor for premium coating solutions in Malaysia, representing internationally recognized brands:- ⌨️ Keyboard shortcuts: Ctrl+Enter, Ctrl+1/2/3 for rapid testing

- 📖 Complete testing guide: [DEV_TESTING_GUIDE.md](DEV_TESTING_GUIDE.md)

- **3TREES** - Leading Chinese architectural coatings

- **CKS** - Professional industrial coatings🛠️ **Operations Suite Access**

- **Chenyang** - Water-based wood coatings- 📋 Modular ES6 architecture with Malaysian compliance built-in

- **Oriental Yuhong** - Waterproofing solutions- ✅ Inventory Service fully implemented (SST 6%, weighted average costing)

- 🚧 Purchase, Sales, and Accounting services in development

---- 📊 Interactive dashboards with bilingual interface (Chinese / English)

- 📄 Comprehensive documentation (Architecture, Compliance, API)te Site & Operations Suite

## ✨ Website Features

A single-page corporate presence with direct access to JINZA Trading&rsquo;s bilingual Inventory & Accounting operations suite. Built for Malaysian regulatory alignment and SST compliance.

### 🎨 Corporate Presence

- **Modern Design**: Split-layout homepage with brand storytelling**Last Updated**: 2025-11-21 | **Version**: 2.1.0 | **Status**: 🚀 Development Active

- **Brand Showcase**: Interactive grid displaying partner brands

- **Responsive Layout**: Mobile-first design for all devices## About JINZA & Partner Brands

- **Multilingual Support**: Chinese (中文) and English content

JINZA Trading Sdn. Bhd. is the authorized distributor for premium coating solutions in Malaysia, representing 3TREES, CKS, Chenyang, and Oriental Yuhong. The homepage introduces our brand story, core value propositions, and allows quick access to partner brand microsites.

### 📱 Social Integration

- **WeChat QR Code**: Instant contact modal## Key Features

- **Social Links**: Facebook, Instagram, TikTok, WhatsApp

- **Email Contact**: Direct business inquiry channel✨ **Corporate Presence**

- 🎨 Modern split-layout homepage highlighting company mission and partner brands

### 🌐 Brand Microsites- 📱 Responsive grid for brand showcase and social links

- Dedicated pages for each partner brand- � Built-in WeChat QR modal for quick contact

- Product information and specifications

- Brand heritage and values🛠️ **Operations Suite Access**

- Contact information for inquiries- 🔐 Login button on homepage with bilingual interface (Chinese / English)

- 🧾 Demo credentials for rapid evaluation: `admin@jinza.com / SST2025!`

---- � Inventory, Purchasing, Sales, and Accounting modules summarised against Malaysian SST & MFRS requirements

- � Functional items display bilingual labels; data entry fields remain in English to match statutory filings

## 📂 Website Structure- 📊 Interactive dashboards: searchable stock, purchase, sales tables plus ledger & trial balance snapshots



```## Website Structure

jinza-web/

├── index.html              # Homepage - company introduction```

├── brand1.html             # 3TREES brand micrositejinza-web/

├── brand2.html             # CKS brand microsite├── index.html                  # Corporate landing page (login removed)

├── brand3.html             # Chenyang brand microsite├── system.html                 # Operations suite (requires authentication)

├── brand4.html             # Oriental Yuhong brand microsite├── dev-entry.html             # 🆕 Development testing portal (recommended)

│├── DEV_TESTING_GUIDE.md       # 🆕 Complete testing documentation

├── css/│

│   └── style.css          # Global stylesheet├── css/

││   └── style.css              # Global stylesheet

├── js/│

│   └── script.js          # Interactive features├── js/

││   ├── script.js              # Landing page interactions

├── images/│   ├── system-app.js          # System main entry (ES6 modules)

│   ├── jinza-logo.png     # Company logo│   ├── config/

│   └── [brand-assets]/    # Brand images and resources│   │   ├── constants.js       # System configuration

││   │   └── chartOfAccounts.js # 39 Malaysian MFRS accounts

├── videos/│   ├── services/

│   └── hero-video.mp4     # Homepage background video│   │   ├── inventory.service.js  # ✅ Inventory service (complete)

││   │   ├── purchase.service.js   # 🚧 Purchase service (planned)

└── docs/│   │   ├── sales.service.js      # 🚧 Sales service (planned)

    ├── IMAGE-SETUP.md     # Image configuration guide│   │   └── accounting.service.js # 🚧 Accounting service (planned)

    └── VIDEO-SETUP.md     # Video setup instructions│   └── utils/

```│       └── demoData.js        # Demo data initialization

│

---├── docs/

│   ├── ARCHITECTURE.md              # System architecture design

## 🎯 Page Sections│   ├── MALAYSIAN_COMPLIANCE.md      # Compliance documentation

│   ├── CLEANUP_REPORT.md            # Code cleanup report

### Homepage (index.html)│   └── LOGIN_MODULE_REMOVAL.md      # Login removal details

│

1. **Hero Section**├── images/                    # Image resources

   - Company introduction with background video├── videos/                    # Video resources

   - Mission statement and core values└── README.md                  # This document

   - Call-to-action buttons```



2. **About JINZA**## Page Sections

   - Company background and history

   - Product offerings and services1. **About JINZA** &ndash; Mission, differentiators, and compliance note

   - Competitive advantages2. **Partner Brands Grid** &ndash; Four-card navigation to brand detail pages

3. **Social Footer** &ndash; Facebook, Instagram, TikTok, WhatsApp, WeChat, Email

3. **Partner Brands Grid**4. **WeChat Modal** &ndash; QR code popup for direct contact

   - Four brand cards with navigation5. **Operations Suite Login** &ndash; Bilingual button fixed at top-right corner opening the secure login modal

   - Brand logos and descriptions

   - Links to brand microsites## Quick Start



4. **Contact Section**### Open Directly

   - Social media links

   - WeChat QR code modal1. **Direct Open**

   - Business inquiry form   - Double-click the `index.html` file to open in browser



### Brand Pages (brand1-4.html)2. **Using Local Server (Recommended)**

   ```bash

- Brand introduction and heritage   # If Python 3 is installed

- Product categories and applications   python -m http.server 8000

- Technical specifications   

- Contact and inquiry information   # If Python 2 is installed

   python -m SimpleHTTPServer 8000

---   

   # If Node.js and http-server are installed

## 🚀 Deployment   npx http-server

   ```

### Vercel Deployment (Recommended)   Then visit `http://localhost:8000` in your browser



This website is optimized for **Vercel** deployment:3. **Using VS Code Live Server**

   - Install Live Server extension

```bash   - Right-click `index.html` and select "Open with Live Server"

# Install Vercel CLI

npm install -g vercel### Customization



# Deploy1. **Update Company Information**

vercel   - Open `index.html`

```   - Update contact information, addresses, etc.

   - Modify product descriptions as needed

**Configuration**: `vercel.json`

- Static site deployment2. **Replace Images**

- Optimized routing   - Place your images in the `images` folder

- CDN distribution   - Refer to `images/README.md` for required images

   - Your JINZA logo should be saved as `jinza-logo.png`

### Alternative Hosting

3. **Add Background Video**

Compatible with any static hosting service:   - Place your video file in the `videos` folder

- **Netlify**: Drag & drop deployment   - Name it `hero-video.mp4` (and optionally `hero-video.webm`)

- **GitHub Pages**: Free hosting for repositories   - Recommended: 1920x1080, under 10MB, 10-30 seconds

- **AWS S3 + CloudFront**: Enterprise-grade hosting   - See `videos/README.md` for detailed video specifications

- **Traditional Web Hosting**: Upload via FTP   - Video will autoplay, loop, and mute automatically



---4. **Change Color Theme**

   - Open `css/style.css`

## 🛠️ Local Development   - Modify CSS variables in `:root`

   ```css

### Prerequisites   :root {

- Modern web browser (Chrome, Firefox, Safari, Edge)       --primary-color: #667eea;    /* Primary color */

- Code editor (VS Code recommended)       --secondary-color: #764ba2;  /* Secondary color */

- Optional: Local web server (Live Server, http-server)       --accent-color: #f093fb;     /* Accent color */

   }

### Setup   ```



1. **Clone the repository**4. **Add More Content**

   ```bash   - Copy existing section structures in HTML

   git clone https://github.com/jinzasb-web/jinza.git   - Adjust content and styles as needed

   cd jinza

   ```## Operations Suite Login & Compliance Notes



2. **Open in browser**1. **Launch the Login Modal**

   - Double-click `index.html`   - On `index.html`, click the button `企业系统登录 / Business Login`

   - Or use Live Server in VS Code   - Modal highlights bilingual features while keeping form inputs in English



3. **Edit content**2. **Test Accounts**

   - Update text in HTML files   - Administrator &ndash; `admin@jinza.com` / `SST2025!`

   - Modify styles in `css/style.css`   - Operations Manager &ndash; `ops.manager@jinza.com` / `IMS2025!`

   - Add images to `images/` folder

3. **Post-login Experience (`system.html`)**

---   - **Inventory Operations**: Stock, Purchase, and Sales cards mapped to Malaysian SST workflow requirements

   - **Accounting Ledger**: Journal, Reporting, and Audit Trail summaries referencing MFRS and LHDN expectations

## 📝 Content Management   - **Compliance Guide**: Quick reference for Companies Act 2016, SST Act 2018, and LHDN e-Invoice mandates

   - **Interactive Grids**: Searchable bilingual tables for stock, purchase, sales, ledger, trial balance, and compliance calendar

### Updating Company Information   - **Metric Cards**: Snapshot tiles for on-hand units, inbound shipments, pending fulfilment, debit/credit totals, and compliance workload



**Homepage Content** (`index.html`):4. **Data Entry Policy**

- Lines 20-50: Hero section text   - All functional headings and buttons present both Chinese and English

- Lines 60-100: About section   - Data capture fields remain English-only to match statutory filings, audit trails, and SST submissions

- Lines 110-150: Brand cards

5. **Session Handling**

### Adding Images   - Demo login profile stored in `localStorage` under `jinzaUser`

   - Use the `退出 / Logout` button in the suite header to clear the profile and return to the homepage

1. Place images in `images/` folder

2. Update image paths in HTML:## Technology Stack

   ```html

   <img src="images/your-image.jpg" alt="Description">- **HTML5** - Semantic markup

   ```- **CSS3** - Modern styling and animations

3. Refer to `docs/IMAGE-SETUP.md` for guidelines  - Flexbox and Grid layout

  - CSS variables

### Adding Videos  - Gradients and transitions

- **JavaScript (ES6+)** - Interactive features

1. Place video files in `videos/` folder  - Slider control

2. Update video paths in HTML:  - Scroll animations

   ```html  - Form handling

   <video src="videos/your-video.mp4"></video>  - Intersection Observer API

   ```- **Font Awesome 6** - Icon library

3. Refer to `docs/VIDEO-SETUP.md` for specifications

## Browser Compatibility

---

✅ Chrome (Latest)

## 🎨 Customization✅ Firefox (Latest)

✅ Safari (Latest)

### Brand Colors✅ Edge (Latest)

⚠️ IE11 (Some features may not be supported)

Edit CSS variables in `css/style.css`:

## Responsive Breakpoints

```css

:root {- 📱 Mobile: < 480px

    --primary-color: #667eea;    /* Primary brand color */- 📱 Large Mobile/Tablet: 481px - 768px

    --secondary-color: #764ba2;  /* Secondary accent */- 💻 Tablet/Small Desktop: 769px - 968px

    --text-dark: #1a202c;        /* Dark text */- 🖥️ Desktop: > 968px

    --text-light: #718096;       /* Light text */

}## Performance Optimization Tips

```

1. **Image Optimization**

### Fonts   - Compress all images (recommend using TinyPNG)

   - Use appropriate image formats (JPEG/PNG/WebP)

Current font stack:   - Consider using lazy loading

```css

font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;2. **Code Optimization**

```   - Minify CSS and JavaScript (production)

   - Load external libraries from CDN

To change fonts, update CSS and add font imports.   - Enable browser caching



### Layout3. **Loading Speed**

   - Optimize font loading

- Modify grid layouts in CSS   - Reduce HTTP requests

- Adjust breakpoints for responsive design   - Use async loading

- Update section spacing and padding

## Deployment

---

### GitHub Pages

## 📱 Responsive Design1. Push files to GitHub repository

2. Enable GitHub Pages in repository settings

### Breakpoints3. Select main branch as source



- **Mobile**: < 768px### Netlify

- **Tablet**: 768px - 1024px1. Drag and drop project to Netlify

- **Desktop**: > 1024px2. Or connect Git repository for automatic deployment



### Mobile Optimizations### Traditional Server

1. Upload all files to server

- Touch-friendly navigation2. Ensure server supports static file hosting

- Optimized image sizes3. Configure domain and SSL certificate

- Simplified layouts

- Fast loading times## Future Development Suggestions



---### Architecture & Documentation

✅ **Completed**: Full system architecture design with Malaysian compliance

## 🔍 SEO Optimization- ✅ Comprehensive compliance documentation (Companies Act 2016, SST Act 2018, MFRS, LHDN)

- ✅ Complete chart of accounts (MFRS-aligned)

### Current Optimizations- ✅ System constants and configuration files

- ✅ Modular ES6+ architecture design

- ✅ Semantic HTML5 markup

- ✅ Meta descriptions and keywords### Short-term (1-2 weeks)

- ✅ Open Graph tags for social sharing- [ ] Complete core business services (Purchase, Sales, Accounting)

- ✅ Optimized image alt texts- [ ] Implement basic UI for inventory, purchase, sales modules

- ✅ Mobile-friendly design- [ ] Develop role-based access control (RBAC)

- ✅ Fast loading performance

### Mid-term (2-3 weeks)

### Improvement Recommendations- [ ] Build accounting engine with trial balance

- [ ] Implement SST compliance features (SST-02 generation)

- Add structured data (JSON-LD)- [ ] Create reporting system (inventory, financial, SST reports)

- Implement sitemap.xml

- Add robots.txt configuration### Long-term (3-4 weeks)

- Optimize Core Web Vitals- [ ] Integrate MyInvois API for e-Invoice submission

- Submit to Google Search Console- [ ] Complete audit system with anomaly detection

- [ ] Backend API development and database setup

---- [ ] Production deployment preparation



## 🌐 Browser Compatibility## System Architecture



### Supported Browsers### Modular Design

本系统采用现代化的 ES6+ 模块架构，完全符合马来西亚商业法规：

| Browser | Version | Status |

|---------|---------|--------|```

| Chrome  | Latest  | ✅ Full |js/

| Firefox | Latest  | ✅ Full |├── config/                    # Configuration layer

| Safari  | Latest  | ✅ Full |│   ├── constants.js          # System constants (SST, status, permissions)

| Edge    | Latest  | ✅ Full |│   └── chartOfAccounts.js    # MFRS-aligned chart of accounts

| Opera   | Latest  | ✅ Full |├── models/                    # Data model layer

├── services/                  # Business logic layer

### Legacy Support│   ├── inventory.service.js  # ✅ Inventory management

│   ├── purchase.service.js   # ⏳ Purchase management

- IE11: ⚠️ Limited (basic functionality only)│   ├── sales.service.js      # ⏳ Sales management

- Older browsers: Consider polyfills if needed│   └── accounting.service.js # ⏳ Accounting engine

├── controllers/               # Controller layer

---└── utils/                     # Utility functions

```

## 📊 Performance

### Compliance Features

### Lighthouse Scores (Target)

✅ **Companies Act 2016**: Audit trail, double-entry bookkeeping  

- **Performance**: 95+✅ **SST Act 2018**: Auto SST calculation, SST-02 generation  

- **Accessibility**: 100✅ **MFRS**: Weighted average costing, revenue recognition  

- **Best Practices**: 100✅ **LHDN**: e-Invoice ready, complete transaction logs  

- **SEO**: 100

## Documentation

### Optimization Tips

📘 [Malaysian Compliance Guide](docs/MALAYSIAN_COMPLIANCE.md)  

1. Compress images (WebP format recommended)📗 [System Architecture](docs/ARCHITECTURE.md)  

2. Minify CSS and JavaScript📙 [Refactoring Progress](docs/REFACTORING_PROGRESS.md)  

3. Enable browser caching

4. Use CDN for static assets

5. Lazy load images below the fold## Important Note



---**This website is operated by the authorized distributor of 3TREES Group for Malaysia. All content related to 3TREES brand is used with proper authorization.**



## 🔒 Security## Contact



### Best Practices ImplementedFor inquiries about 3TREES products in Malaysia, please use the contact form on the website or reach out through the provided contact information.



- HTTPS enforced (via Vercel)---

- Content Security Policy headers

- XSS protection**Last Updated:** November 21, 2025  

- No sensitive data in client code**Version:** 2.0.0 (Architecture Refactoring)  

- Secure contact forms**Authorized Distributor:** Malaysia Region  

**Compliance Status:** Fully aligned with Companies Act 2016, SST Act 2018, MFRS, LHDN

---

## 📞 Contact & Support

### JINZA Trading Sdn. Bhd.

- **Website**: [Your production URL]
- **Email**: info@jinzatrading.com
- **WeChat**: Scan QR code on website
- **Phone**: [Your contact number]

### Technical Support

- **Repository**: https://github.com/jinzasb-web/jinza
- **Branch**: jinza-web
- **Issues**: Submit via GitHub Issues

---

## 📄 License

© 2025 JINZA Trading Sdn. Bhd. All rights reserved.

This website is proprietary software. Unauthorized copying, distribution, or modification is prohibited.

---

## 🗓️ Version History

### Version 3.0.0 (2025-11-21)
- 🎯 **Major**: Separated website from system modules
- 🌐 Pure corporate showcase website
- 📱 Optimized for production deployment
- 🚀 Enhanced performance and SEO

### Version 2.x (Archived)
- System modules moved to separate repository
- Development features archived in `system-backup-archive` branch

### Version 1.x (Initial Release)
- Basic corporate website with brand pages
- Social media integration
- Responsive design implementation

---

## 🚧 Roadmap

### Planned Enhancements

- [ ] Multi-language support (Malay, Tamil)
- [ ] Product catalog integration
- [ ] Online inquiry form with backend
- [ ] Customer testimonials section
- [ ] News and updates blog
- [ ] Enhanced SEO and analytics

---

## 🙏 Acknowledgments

- **Design Inspiration**: Modern corporate web trends
- **Framework**: Pure HTML5, CSS3, JavaScript
- **Hosting**: Vercel Platform
- **Fonts**: Inter Font Family
- **Icons**: Font Awesome

---

**Built with ❤️ for JINZA Trading Sdn. Bhd.**

*Empowering Malaysia with premium coating solutions*

---

For questions or support, please contact the web development team or submit an issue on GitHub.
