# GitHub Pages Setup Instructions

## Current Status
✅ GitHub Actions workflow configured (`.github/workflows/deploy.yml`)  
✅ `.nojekyll` file created to prevent Jekyll processing  
⚠️ **Action Required**: GitHub Pages needs to be enabled in repository settings

## Enable GitHub Pages

To complete the deployment, follow these steps:

### Step 1: Enable GitHub Pages in Repository Settings

1. **Go to Repository Settings**
   - Navigate to: https://github.com/oatswrldwide/apsvos/settings/pages
   - Or: Repository → Settings → Pages (in left sidebar)

2. **Configure Source**
   - Under "Build and deployment"
   - Select Source: **GitHub Actions**
   - Click Save (if prompted)

3. **Wait for Deployment**
   - The workflow will automatically trigger
   - Check deployment status at: https://github.com/oatswrldwide/apsvos/actions
   - Wait for the green checkmark (usually 1-2 minutes)

4. **Access Your Site**
   - Once deployed, visit: **https://oatswrldwide.github.io/apsvos/**
   - The URL will also be shown in the repository settings

### Step 2: Verify Deployment

After GitHub Pages is enabled and the workflow completes:

1. Visit: https://oatswrldwide.github.io/apsvos/
2. Test the APS calculator:
   - Enter subject percentages
   - Calculate APS
   - Fill out lead form
   - Verify all functionality works

### Troubleshooting

#### If the workflow shows "action_required"
- Go to Settings → Pages
- Ensure "GitHub Actions" is selected as the source
- Re-run the workflow from the Actions tab

#### If the page shows 404
- Wait a few minutes after deployment completes
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Check that index.html is in the root directory

#### If styles/scripts don't load
- Check browser console for errors
- Verify all files are committed (index.html, styles.css, script.js)
- Ensure relative paths are correct in HTML

## Automatic Updates

Once GitHub Pages is enabled, the site will automatically update when:
- Changes are pushed to `main` branch
- Changes are pushed to `copilot/create-aps-calculator` branch
- Workflow is manually triggered from Actions tab

## Custom Domain (Optional)

To use a custom domain (e.g., aps.eduvos.com):

1. **In GitHub Settings**
   - Go to Settings → Pages
   - Enter your custom domain in "Custom domain" field
   - Click Save

2. **Configure DNS**
   Add these DNS records with your domain provider:
   
   For apex domain (eduvos.com):
   ```
   A     @     185.199.108.153
   A     @     185.199.109.153
   A     @     185.199.110.153
   A     @     185.199.111.153
   ```
   
   For subdomain (aps.eduvos.com):
   ```
   CNAME aps   oatswrldwide.github.io
   ```

3. **Enable HTTPS**
   - After DNS propagates (up to 24 hours)
   - GitHub will automatically provision SSL certificate
   - Enable "Enforce HTTPS" in Settings → Pages

## Workflow Details

The GitHub Actions workflow (`.github/workflows/deploy.yml`):
- Triggers on push to main or copilot/create-aps-calculator branches
- Can be manually triggered from Actions tab
- Uses official GitHub Pages actions for deployment
- Deploys all files from repository root
- Sets proper permissions for Pages deployment

## Next Steps

1. ✅ Complete Step 1: Enable GitHub Pages in settings
2. ✅ Verify deployment at https://oatswrldwide.github.io/apsvos/
3. ✅ Share the URL with stakeholders
4. ✅ Monitor lead captures via admin functions
5. ✅ Consider backend integration for production use

---

**Need Help?**
- Check workflow status: https://github.com/oatswrldwide/apsvos/actions
- GitHub Pages docs: https://docs.github.com/en/pages
- Contact repository maintainers if issues persist
