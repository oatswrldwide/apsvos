# Deployment Guide

## Quick Start

### Local Development
1. Clone the repository
2. Open `index.html` in a web browser, or
3. Start a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx http-server
   
   # PHP
   php -S localhost:8000
   ```
4. Visit `http://localhost:8000`

## Deployment Options

### Option 1: GitHub Pages (Current Deployment) ⭐
**Live URL**: [https://oatswrldwide.github.io/apsvos/](https://oatswrldwide.github.io/apsvos/)

This repository is configured with automatic GitHub Pages deployment via GitHub Actions.

#### Automatic Deployment
- The site automatically deploys when changes are pushed to `main` or `copilot/create-aps-calculator` branches
- GitHub Actions workflow: `.github/workflows/deploy.yml`
- No manual steps required after pushing code

#### Manual GitHub Pages Setup (if needed)
1. Go to repository Settings → Pages
2. Select Source: "GitHub Actions"
3. The workflow will automatically deploy on the next push
4. Your site will be available at: `https://oatswrldwide.github.io/apsvos/`

#### Custom Domain (Optional)
1. Go to repository Settings → Pages
2. Add your custom domain (e.g., `aps.eduvos.com`)
3. Configure DNS records as instructed by GitHub
4. Enable HTTPS

### Option 2: Netlify
1. Sign up at netlify.com
2. Click "New site from Git"
3. Connect to GitHub repository
4. Set build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
5. Click "Deploy site"

### Option 3: Vercel
1. Sign up at vercel.com
2. Click "Import Project"
3. Connect to GitHub repository
4. Click "Deploy"

### Option 4: Traditional Web Hosting
1. Upload all files to your web server via FTP/SFTP
2. Ensure `index.html` is in the root directory
3. Point your domain to the hosting directory

## Backend Integration

To integrate with a backend API for lead management:

### 1. Update `script.js` - `saveLead()` function:

```javascript
saveLead(leadData) {
    // Save to localStorage (keep as backup)
    try {
        let leads = JSON.parse(localStorage.getItem('eduvosLeads') || '[]');
        leads.push(leadData);
        localStorage.setItem('eduvosLeads', JSON.stringify(leads));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
    
    // Send to backend API
    fetch('https://your-api-endpoint.com/api/leads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify(leadData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('API request failed');
        }
        return response.json();
    })
    .then(data => {
        console.log('Lead saved to backend successfully:', data);
    })
    .catch(error => {
        console.error('Error saving lead to backend:', error);
        // Lead is still saved in localStorage as backup
    });
}
```

### 2. Backend API Requirements

Your backend should accept POST requests with this structure:

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string (email format)",
  "phone": "string",
  "interestedProgram": "string",
  "campus": "string",
  "apsScore": "number (0-42)",
  "subjects": [
    {
      "number": "number (1-7)",
      "percentage": "number (0-100)",
      "rating": "number (1-7)"
    }
  ],
  "timestamp": "ISO 8601 string",
  "consent": "boolean"
}
```

### 3. Recommended Backend Solutions

**Serverless Functions:**
- AWS Lambda + API Gateway
- Google Cloud Functions
- Azure Functions
- Netlify Functions
- Vercel Functions

**Backend Frameworks:**
- Node.js with Express
- Python with Flask/Django
- PHP with Laravel
- Ruby on Rails

**Database Options:**
- PostgreSQL (recommended for structured data)
- MongoDB (for flexible schema)
- Google Sheets API (for simple needs)
- Airtable API
- Supabase (PostgreSQL with realtime)

## Email Notifications

To send email notifications when leads are captured:

### Using SendGrid (Node.js example):

```javascript
// In your backend
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/api/leads', async (req, res) => {
    const leadData = req.body;
    
    // Save to database
    await db.leads.insert(leadData);
    
    // Send email to admissions team
    const msg = {
        to: 'admissions@eduvos.com',
        from: 'notifications@yourdomain.com',
        subject: `New APS Calculator Lead - ${leadData.firstName} ${leadData.lastName}`,
        html: `
            <h2>New Lead Captured</h2>
            <p><strong>Name:</strong> ${leadData.firstName} ${leadData.lastName}</p>
            <p><strong>Email:</strong> ${leadData.email}</p>
            <p><strong>Phone:</strong> ${leadData.phone}</p>
            <p><strong>APS Score:</strong> ${leadData.apsScore}</p>
            <p><strong>Program Interest:</strong> ${leadData.interestedProgram}</p>
            <p><strong>Campus Preference:</strong> ${leadData.campus}</p>
        `
    };
    
    await sgMail.send(msg);
    
    res.json({ success: true });
});
```

## CRM Integration

To integrate with popular CRM systems:

### Salesforce
Use the Salesforce REST API to create Lead records

### HubSpot
Use the HubSpot Forms API or Contacts API

### Zoho CRM
Use the Zoho CRM API v2

### Example: HubSpot Integration

```javascript
fetch('https://api.hsforms.com/submissions/v3/integration/submit/PORTAL_ID/FORM_GUID', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        fields: [
            { name: 'firstname', value: leadData.firstName },
            { name: 'lastname', value: leadData.lastName },
            { name: 'email', value: leadData.email },
            { name: 'phone', value: leadData.phone },
            { name: 'aps_score', value: leadData.apsScore },
            { name: 'program_interest', value: leadData.interestedProgram },
            { name: 'campus_preference', value: leadData.campus }
        ]
    })
});
```

## Analytics

Add Google Analytics or similar:

```html
<!-- Add before closing </head> tag in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Track lead submissions:

```javascript
// Add to script.js after lead submission
gtag('event', 'lead_captured', {
    'aps_score': leadData.apsScore,
    'program': leadData.interestedProgram,
    'campus': leadData.campus
});
```

## Security Considerations

1. **HTTPS**: Always use HTTPS in production
2. **CORS**: Configure proper CORS headers on your API
3. **Rate Limiting**: Implement rate limiting to prevent abuse
4. **Input Validation**: Validate all inputs on the backend
5. **API Keys**: Never expose API keys in client-side code
6. **GDPR/POPIA**: Ensure compliance with data protection regulations

## Monitoring

Monitor lead capture success:
- Check localStorage regularly (admin functions)
- Monitor backend API logs
- Set up alerts for failed submissions
- Track conversion rates in analytics

## Support

For issues or questions:
1. Check README.md for documentation
2. Review SCREENSHOTS.md for UI reference
3. Check browser console for errors
4. Test admin functions: `viewLeads()`, `exportLeads()`

---

**Note**: This calculator is ready for production use with localStorage. Backend integration is optional but recommended for production deployments.
