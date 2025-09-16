// Recipe Reviews page JavaScript functionality
class FeedbackManager {
    constructor() {
        this.apiBaseUrl = window.location.origin; // Use same origin as the frontend
        this.form = document.getElementById('feedbackForm');
        this.successMessage = document.getElementById('successMessage');
        this.errorMessage = document.getElementById('errorMessage');
        this.feedbackList = document.getElementById('feedbackList');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadRecentFeedback();
    }

    setupEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Success message buttons
        document.getElementById('sendAnother').addEventListener('click', () => {
            this.showForm();
        });
        
        // Error message buttons
        document.getElementById('retryButton').addEventListener('click', () => {
            this.showForm();
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const submitButton = this.form.querySelector('.submit-button');
        const buttonText = submitButton.querySelector('.button-text');
        const buttonLoading = submitButton.querySelector('.button-loading');
        
        // Show loading state
        submitButton.disabled = true;
        buttonText.style.display = 'none';
        buttonLoading.style.display = 'inline';
        
        try {
            const formData = new FormData(this.form);
            const feedbackData = {
                text: formData.get('message'),
                author: formData.get('author') || 'Anonymous'
            };
            
            const response = await fetch(`${this.apiBaseUrl}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedbackData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('Review submitted successfully:', result);
            
            this.showSuccess();
            this.form.reset();
            this.loadRecentFeedback(); // Refresh the list
            
        } catch (error) {
            console.error('Error submitting review:', error);
            this.showError(error.message);
        } finally {
            // Reset button state
            submitButton.disabled = false;
            buttonText.style.display = 'inline';
            buttonLoading.style.display = 'none';
        }
    }

    async loadRecentFeedback() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/messages`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const messages = await response.json();
            this.displayFeedback(messages);
            
        } catch (error) {
            console.error('Error loading reviews:', error);
            this.feedbackList.innerHTML = `
                <div class="loading-placeholder">
                    <p>Error loading reviews. Please refresh the page.</p>
                </div>
            `;
        }
    }

    displayFeedback(messages) {
        if (messages.length === 0) {
            this.feedbackList.innerHTML = `
                <div class="loading-placeholder">
                    <p>No reviews yet. Be the first to share your cooking experience!</p>
                </div>
            `;
            return;
        }

        // Sort by creation date (newest first) and limit to 10
        const recentMessages = messages
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 10);

        const feedbackHTML = recentMessages.map(message => `
            <div class="feedback-item">
                <div class="feedback-header">
                    <span class="feedback-author">${this.escapeHtml(message.author)}</span>
                    <span class="feedback-date">${this.formatDate(message.createdAt)}</span>
                </div>
                <div class="feedback-text">${this.escapeHtml(message.text)}</div>
            </div>
        `).join('');

        this.feedbackList.innerHTML = feedbackHTML;
    }

    showSuccess() {
        this.form.style.display = 'none';
        this.errorMessage.style.display = 'none';
        this.successMessage.style.display = 'block';
    }

    showError(errorText) {
        this.form.style.display = 'none';
        this.successMessage.style.display = 'none';
        this.errorMessage.style.display = 'block';
        document.getElementById('errorText').textContent = errorText;
    }

    showForm() {
        this.form.style.display = 'block';
        this.successMessage.style.display = 'none';
        this.errorMessage.style.display = 'none';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Initialize the feedback manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FeedbackManager();
});

// Add some cooking-related easter eggs for fun
document.addEventListener('DOMContentLoaded', () => {
    // Easter egg: Secret recipe code
    let recipeCode = [];
    const recipeSequence = [
        'KeyS', 'KeyO', 'KeyU', 'KeyT', 'KeyH', 'KeyE', 'KeyR', 'KeyN'
    ];
    
    document.addEventListener('keydown', (e) => {
        recipeCode.push(e.code);
        if (recipeCode.length > recipeSequence.length) {
            recipeCode.shift();
        }
        
        if (recipeCode.join(',') === recipeSequence.join(',')) {
            console.log('🍖 Secret recipe unlocked! You found the hidden Southern recipe!');
            document.body.style.animation = 'sizzle 2s infinite';
            
            // Add sizzle animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes sizzle {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                document.body.style.animation = '';
                style.remove();
            }, 5000);
        }
    });
});
