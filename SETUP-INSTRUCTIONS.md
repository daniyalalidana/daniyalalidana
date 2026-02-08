# Setup Instructions for Portfolio

## 🔧 Formspree Setup (Contact Form)

Your contact form is configured to use Formspree. Follow these steps:

1. **Sign up for Formspree**:
   - Go to https://formspree.io/
   - Create a free account (allows 50 submissions/month)

2. **Create a new form**:
   - Click "New Form"
   - Name it "Portfolio Contact Form"
   - Copy the form endpoint URL

3. **Update your HTML**:
   - Open `index.html`
   - Find line with: `action="https://formspree.io/f/YOUR_FORM_ID"`
   - Replace `YOUR_FORM_ID` with your actual form ID
   - Example: `action="https://formspree.io/f/xyzabc123"`

4. **Test the form**:
   - Submit a test message
   - Check your email for confirmation

## 📊 Google Analytics (Optional)

To track visitors:

1. Go to https://analytics.google.com/
2. Create an account and property
3. Get your Measurement ID (looks like `G-XXXXXXXXXX`)
4. Add before `</head>` in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🖼️ PWA Icons

Create these icon sizes and place in `/images/` folder:

- `icon-192x192.png` (192x192 pixels)
- `icon-512x512.png` (512x512 pixels)
- `favicon.png` (32x32 pixels)
- `apple-touch-icon.png` (180x180 pixels)

You can use tools like:
- https://realfavicongenerator.net/
- https://favicon.io/

## ✅ Post-Deployment Checklist

After pushing to GitHub:

1. **Verify Formspree**: Replace `YOUR_FORM_ID` in index.html
2. **Test contact form**: Submit a test message
3. **Check mobile responsiveness**: Test on phone
4. **Verify all links**: GitHub, LinkedIn, Upwork
5. **Submit sitemap to Google**:
   - Go to Google Search Console
   - Add property: `daniyalalidana.github.io`
   - Submit sitemap: `https://daniyalalidana.github.io/sitemap.xml`

## 🚀 Performance Tips

Your portfolio is now optimized with:
- ✅ SEO meta tags (Open Graph, Twitter Cards)
- ✅ Structured data (JSON-LD)
- ✅ Accessibility improvements
- ✅ PWA capabilities
- ✅ Loading screen
- ✅ Form validation
- ✅ 404 error page
- ✅ Robots.txt & Sitemap

## 📝 Maintenance

**Update these regularly**:
- Add new projects to Projects section
- Update certificates when earned
- Refresh sitemap.xml dates
- Keep skills section current

## 🆘 Troubleshooting

**Contact form not working?**
- Check if you replaced `YOUR_FORM_ID`
- Verify Formspree account is active
- Check browser console for errors

**PWA not installing?**
- Ensure all icon files exist
- Check manifest.json paths
- Verify HTTPS (GitHub Pages auto-provides this)

---

**Need help?** Check the browser console (F12) for any errors.
