// APS Calculator Logic
class APSCalculator {
    constructor() {
        this.subjects = [];
        this.apsScore = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSavedData();
    }

    setupEventListeners() {
        // Calculator button listeners
        document.getElementById('calculateBtn').addEventListener('click', () => this.calculateAPS());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetCalculator());
        document.getElementById('saveResultBtn').addEventListener('click', () => this.showLeadForm());
        
        // Lead form listeners
        document.getElementById('leadForm').addEventListener('submit', (e) => this.submitLeadForm(e));
        document.getElementById('newCalculationBtn').addEventListener('click', () => this.resetAll());

        // Real-time rating display
        for (let i = 1; i <= 7; i++) {
            const input = document.getElementById(`subject${i}`);
            input.addEventListener('input', (e) => this.updateRating(i, e.target.value));
        }
    }

    // Convert percentage to rating
    percentageToRating(percentage) {
        if (percentage === '' || percentage === null) return 0;
        const percent = parseFloat(percentage);
        
        if (percent >= 80 && percent <= 100) return 7;
        if (percent >= 70 && percent < 80) return 6;
        if (percent >= 60 && percent < 70) return 5;
        if (percent >= 50 && percent < 60) return 4;
        if (percent >= 40 && percent < 50) return 3;
        if (percent >= 30 && percent < 40) return 2;
        if (percent >= 0 && percent < 30) return 1;
        
        return 0;
    }

    // Update rating display in real-time
    updateRating(subjectNum, percentage) {
        const ratingElement = document.getElementById(`rating${subjectNum}`);
        if (percentage === '') {
            ratingElement.textContent = '';
            return;
        }

        const rating = this.percentageToRating(percentage);
        if (rating > 0) {
            ratingElement.textContent = `Rating: ${rating}`;
        } else {
            ratingElement.textContent = '';
        }
    }

    // Calculate APS
    calculateAPS() {
        this.subjects = [];
        
        // Collect all subject values
        for (let i = 1; i <= 7; i++) {
            const input = document.getElementById(`subject${i}`);
            const value = input.value.trim();
            
            if (value !== '') {
                const percentage = parseFloat(value);
                
                // Validate input
                if (isNaN(percentage) || percentage < 0 || percentage > 100) {
                    this.showError(`Subject ${i}: Please enter a valid percentage between 0 and 100`);
                    return;
                }
                
                const rating = this.percentageToRating(percentage);
                this.subjects.push({
                    number: i,
                    percentage: percentage,
                    rating: rating
                });
            }
        }

        // Validate minimum subjects
        if (this.subjects.length < 6) {
            this.showError('Please enter at least 6 subjects to calculate your APS');
            return;
        }

        // Sort by rating (descending) and take best 6
        this.subjects.sort((a, b) => b.rating - a.rating);
        const bestSix = this.subjects.slice(0, 6);
        
        // Calculate total APS
        this.apsScore = bestSix.reduce((sum, subject) => sum + subject.rating, 0);
        
        // Display results
        this.displayResults(bestSix);
        
        // Save to localStorage
        this.saveCalculation();
    }

    // Display results
    displayResults(bestSix) {
        const resultSection = document.getElementById('result');
        const apsScoreElement = document.getElementById('apsScore');
        const breakdownElement = document.getElementById('subjectBreakdown');
        const eligibilityElement = document.getElementById('eligibilityMessage');

        // Show APS score
        apsScoreElement.textContent = this.apsScore;

        // Show breakdown
        let breakdownHTML = '<h4 style="margin-bottom: 1rem; color: var(--secondary-color);">Best 6 Subjects Used:</h4>';
        bestSix.forEach((subject, index) => {
            breakdownHTML += `
                <div class="breakdown-item">
                    <span>Subject ${subject.number}: ${subject.percentage}%</span>
                    <span><strong>Rating: ${subject.rating}</strong></span>
                </div>
            `;
        });

        if (this.subjects.length > 6) {
            breakdownHTML += '<p style="margin-top: 1rem; color: var(--text-muted); font-style: italic;">* Only your best 6 subjects are used for APS calculation</p>';
        }

        breakdownElement.innerHTML = breakdownHTML;

        // Show eligibility message
        let eligibilityClass = '';
        let eligibilityText = '';

        if (this.apsScore >= 28) {
            eligibilityClass = 'high';
            eligibilityText = '🎉 Excellent! Your APS qualifies you for most Bachelor\'s degree programs at Eduvos.';
        } else if (this.apsScore >= 23) {
            eligibilityClass = 'medium';
            eligibilityText = '✓ Good! Your APS qualifies you for many Bachelor\'s degree programs at Eduvos.';
        } else if (this.apsScore >= 18) {
            eligibilityClass = 'medium';
            eligibilityText = '✓ Your APS qualifies you for Diploma programs at Eduvos. Some Bachelor\'s degrees may also be available.';
        } else {
            eligibilityClass = 'low';
            eligibilityText = 'Your APS may qualify you for certain certificate or foundation programs. Contact Eduvos admissions to explore your options.';
        }

        eligibilityElement.className = `eligibility ${eligibilityClass}`;
        eligibilityElement.textContent = eligibilityText;

        // Show result section
        resultSection.style.display = 'block';
        
        // Smooth scroll to results
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Show error message
    showError(message) {
        alert(message);
    }

    // Reset calculator
    resetCalculator() {
        for (let i = 1; i <= 7; i++) {
            document.getElementById(`subject${i}`).value = '';
            document.getElementById(`rating${i}`).textContent = '';
        }
        
        document.getElementById('result').style.display = 'none';
        this.subjects = [];
        this.apsScore = 0;
    }

    // Show lead capture form
    showLeadForm() {
        const leadSection = document.getElementById('leadSection');
        leadSection.style.display = 'block';
        leadSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Submit lead form
    submitLeadForm(event) {
        event.preventDefault();
        
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            interestedProgram: document.getElementById('interestedProgram').value,
            campus: document.getElementById('campus').value,
            apsScore: this.apsScore,
            subjects: this.subjects,
            timestamp: new Date().toISOString(),
            consent: document.getElementById('consent').checked
        };

        // Validate consent
        if (!formData.consent) {
            this.showError('Please provide consent to be contacted');
            return;
        }

        // Save lead
        this.saveLead(formData);

        // Show thank you message
        document.getElementById('leadForm').style.display = 'none';
        document.getElementById('thankYou').style.display = 'block';
    }

    // Save lead to localStorage
    saveLead(leadData) {
        try {
            // Get existing leads
            let leads = JSON.parse(localStorage.getItem('eduvosLeads') || '[]');
            
            // Add new lead
            leads.push(leadData);
            
            // Save back to localStorage
            localStorage.setItem('eduvosLeads', JSON.stringify(leads));
            
            // Also log to console for demo purposes
            console.log('Lead captured successfully:', leadData);
            
            // In a production environment, you would send this to a backend API
            // Example:
            // fetch('/api/leads', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(leadData)
            // });
            
        } catch (error) {
            console.error('Error saving lead:', error);
        }
    }

    // Save calculation to localStorage
    saveCalculation() {
        try {
            const calculation = {
                apsScore: this.apsScore,
                subjects: this.subjects,
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem('lastCalculation', JSON.stringify(calculation));
        } catch (error) {
            console.error('Error saving calculation:', error);
        }
    }

    // Load saved data
    loadSavedData() {
        try {
            const lastCalculation = localStorage.getItem('lastCalculation');
            if (lastCalculation) {
                // Could auto-populate if needed
                console.log('Previous calculation found');
            }
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }

    // Reset everything
    resetAll() {
        this.resetCalculator();
        document.getElementById('leadSection').style.display = 'none';
        document.getElementById('leadForm').style.display = 'block';
        document.getElementById('thankYou').style.display = 'none';
        document.getElementById('leadForm').reset();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Admin function to view captured leads (for demonstration)
function viewLeads() {
    try {
        const leads = JSON.parse(localStorage.getItem('eduvosLeads') || '[]');
        console.log('=== CAPTURED LEADS ===');
        console.log(`Total Leads: ${leads.length}`);
        console.table(leads);
        return leads;
    } catch (error) {
        console.error('Error retrieving leads:', error);
        return [];
    }
}

// Admin function to export leads as JSON
function exportLeads() {
    const leads = viewLeads();
    const dataStr = JSON.stringify(leads, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `eduvos-leads-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

// Admin function to clear all leads
function clearLeads() {
    if (confirm('Are you sure you want to clear all leads? This cannot be undone.')) {
        localStorage.removeItem('eduvosLeads');
        console.log('All leads cleared');
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new APSCalculator();
    
    // Make admin functions available in console
    window.viewLeads = viewLeads;
    window.exportLeads = exportLeads;
    window.clearLeads = clearLeads;
    
    console.log('%cEduvos APS Calculator Initialized', 'color: #15305d; font-size: 16px; font-weight: bold;');
    console.log('%cAdmin functions available: viewLeads(), exportLeads(), clearLeads()', 'color: #666; font-style: italic;');
});
