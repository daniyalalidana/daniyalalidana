# Portfolio Images

This directory is for storing your portfolio images.

## Recommended Images

### 1. Profile Picture
- **Filename**: `profile.jpg` or `profile.png`
- **Recommended size**: 400x400px or larger (square)
- **Format**: JPG or PNG
- **Usage**: Replace the placeholder icon in the hero section

### 2. Project Screenshots
- **Naming convention**: `project-[name].jpg` or `project-[name].png`
- **Recommended size**: 1200x630px (landscape) or as needed
- **Format**: JPG or PNG
- **Usage**: Add visual representations of your projects

### 3. Certificate Images (Optional)
- **Naming convention**: `cert-[name].jpg` or `cert-[name].png`
- **Recommended size**: Various (actual certificate size)
- **Format**: JPG or PNG
- **Usage**: Display IBM certificates visually

## How to Add Images

1. Place your images in this `/images/` directory
2. Reference them in the HTML using relative paths:
   ```html
   <img src="images/profile.jpg" alt="Daniyal Ali Dana">
   ```

## Current Setup

The portfolio currently uses Font Awesome icons as placeholders. To add your actual images:

1. **Profile Picture**: Replace the `.profile-placeholder` section in `portfolio.html` with:
   ```html
   <img src="images/profile.jpg" alt="Daniyal Ali Dana" class="profile-image">
   ```

2. **Project Images**: Add image elements to `.project-card` sections:
   ```html
   <div class="project-image">
       <img src="images/project-ml-algorithms.jpg" alt="ML Project">
   </div>
   ```

## Tips

- Optimize images before uploading (use tools like TinyPNG or ImageOptim)
- Use descriptive alt text for accessibility
- Keep file sizes reasonable for fast loading (under 500KB each)
- Use consistent aspect ratios for a professional look
