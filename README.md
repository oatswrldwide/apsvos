# Eduvos APS Calculator

A comprehensive Admission Point Score (APS) calculator designed for prospective Eduvos students. This tool helps students calculate their APS based on their National Senior Certificate (NSC) results and captures leads for admissions counseling.

## Features

### 🎯 APS Calculation
- Calculate APS based on NSC rating scale (1-7)
- Automatically uses the best 6 subjects (excluding Life Orientation)
- Support for up to 7 subjects
- Real-time rating display as percentages are entered
- Detailed breakdown of subjects used in calculation

### 📊 Rating Scale
- 80-100%: Rating 7
- 70-79%: Rating 6
- 60-69%: Rating 5
- 50-59%: Rating 4
- 40-49%: Rating 3
- 30-39%: Rating 2
- 0-29%: Rating 1

### 📝 Lead Capture
- Collects student information (name, email, phone)
- Program interest selection
- Campus preference selection
- Stores leads locally (localStorage)
- GDPR-compliant consent mechanism

### 💡 Additional Features
- Responsive design (mobile, tablet, desktop)
- Eligibility guidance based on APS score
- FAQ section
- Information about Eduvos admission requirements
- Clean, professional UI

## Usage

### For Students
1. Open `index.html` in a web browser
2. Enter your subject percentages (minimum 6 subjects)
3. Click "Calculate APS" to see your score
4. Review your eligibility for different programs
5. Click "Save & Get More Info" to submit your details
6. Fill out the lead form to get personalized admission guidance

### For Administrators
The application stores captured leads in the browser's localStorage. To access leads:

1. Open the browser's developer console (F12)
2. Use these commands:
   - `viewLeads()` - View all captured leads
   - `exportLeads()` - Download leads as JSON file
   - `clearLeads()` - Clear all stored leads

### Lead Data Structure
```json
{
  "firstName": "Student Name",
  "lastName": "Student Surname",
  "email": "student@example.com",
  "phone": "0123456789",
  "interestedProgram": "it",
  "campus": "midrand",
  "apsScore": 32,
  "subjects": [...],
  "timestamp": "2026-03-13T12:00:00.000Z",
  "consent": true
}
```

## Deployment

### Static Hosting
Deploy to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront

### Simple HTTP Server
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# Then visit http://localhost:8000
```

## Backend Integration

To integrate with a backend API, modify the `saveLead()` function in `script.js`:

```javascript
saveLead(leadData) {
    // Send to your backend API
    fetch('https://your-api.com/leads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify(leadData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Lead saved successfully:', data);
    })
    .catch(error => {
        console.error('Error saving lead:', error);
    });
}
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Responsive design with CSS Grid and Flexbox
- **Vanilla JavaScript** - No frameworks required
- **localStorage** - Client-side data persistence

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #004c99;
    --accent-color: #00a651;
    /* ... */
}
```

### Programs and Campuses
Edit the select options in `index.html`:
```html
<select id="interestedProgram">
    <option value="business">Business Management</option>
    <!-- Add more programs -->
</select>
```

## Security Considerations

- Input validation on all form fields
- Client-side data storage (no sensitive data exposed)
- HTTPS recommended for production deployment
- Consent checkbox required before submission
- Ready for GDPR/POPIA compliance

## Future Enhancements

- Backend API integration for lead management
- Email notifications to admissions team
- SMS notifications to students
- PDF report generation
- Multi-language support
- Integration with CRM systems
- Advanced analytics and reporting

## License

This project is provided as-is for educational purposes.

## Support

For questions or issues, please contact the development team or visit [www.eduvos.com](https://www.eduvos.com) for official admissions information.

---

**Note**: This is an unofficial calculator tool. For official admissions information and APS verification, please contact Eduvos directly. 
