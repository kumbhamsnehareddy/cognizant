// Exercise 1: JavaScript Basics & Setup
console.log("Welcome to the Community Portal");
window.addEventListener('load', () => {
    alert("Community Portal is fully loaded!");
});

// Exercise 2: Data Types and Event Management
class Event {
    constructor(name, date, category, location, totalSeats) {
        this.name = name;
        this.date = new Date(date);
        this.category = category;
        this.location = location;
        this.totalSeats = totalSeats;
        this.availableSeats = totalSeats;
        this.registrations = [];
    }

    // Exercise 5: Objects and Prototypes
    checkAvailability() {
        return this.availableSeats > 0 && this.date > new Date();
    }

    registerUser(user) {
        if (this.checkAvailability()) {
            this.registrations.push(user);
            this.availableSeats--;
            return true;
        }
        return false;
    }

    getEventInfo() {
        return `${this.name} - ${this.date.toLocaleDateString()} (${this.availableSeats} seats left)`;
    }
}

// Exercise 3: Arrays and Event Management
const events = [
    new Event("Ganesh Chaturthi", "2024-09-15", "Cultural", "Community Hall", 100),
    new Event("Holi Festival", "2024-03-25", "Cultural", "Central Park", 150),
    new Event("Navaratri", "2024-10-15", "Cultural", "Town Square", 200),
    new Event("Tree Plantation", "2024-06-05", "Environmental", "City Park", 50),
    new Event("Swachh Bharat", "2024-04-22", "Social", "Various Locations", 75)
];

// Exercise 4: Functions and Closures
const eventManager = {
    totalRegistrations: 0,
    
    addEvent(event) {
        events.push(event);
        this.updateEventDisplay();
    },

    registerUser(eventName, user) {
        try {
            const event = events.find(e => e.name === eventName);
            if (!event) throw new Error("Event not found");
            
            if (event.registerUser(user)) {
                this.totalRegistrations++;
                this.updateEventDisplay();
                return true;
            }
            throw new Error("Event is full or has passed");
        } catch (error) {
            console.error("Registration error:", error.message);
            return false;
        }
    },

    filterEventsByCategory(category, callback) {
        const filtered = events.filter(event => event.category === category);
        if (callback) callback(filtered);
        return filtered;
    },

    // Exercise 6: Array Methods
    getUpcomingEvents() {
        return events.filter(event => event.date > new Date())
                    .sort((a, b) => a.date - b.date);
    },

    // Exercise 7: DOM Manipulation
    updateEventDisplay() {
        const eventContainer = document.querySelector('.row.g-4');
        if (!eventContainer) return;

        eventContainer.innerHTML = '';
        this.getUpcomingEvents().forEach(event => {
            if (event.checkAvailability()) {
                const eventCard = this.createEventCard(event);
                eventContainer.appendChild(eventCard);
            }
        });
    },

    createEventCard(event) {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-4';
        
        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="https://via.placeholder.com/300x200" class="card-img-top" alt="${event.name}">
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">
                        Date: ${event.date.toLocaleDateString()}<br>
                        Location: ${event.location}<br>
                        Available Seats: ${event.availableSeats}
                    </p>
                    <button class="btn btn-primary register-btn" data-event="${event.name}">
                        Register Now
                    </button>
                </div>
            </div>
        `;

        // Exercise 8: Event Handling
        const registerBtn = col.querySelector('.register-btn');
        registerBtn.addEventListener('click', () => this.showRegistrationModal(event));

        return col;
    },

    // Exercise 9: Async Operations
    async fetchEvents() {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            return this.getUpcomingEvents();
        } catch (error) {
            console.error("Error fetching events:", error);
            return [];
        }
    },

    // Exercise 10: Modern JavaScript Features
    async initializePortal() {
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'text-center my-4';
        loadingSpinner.innerHTML = '<div class="spinner-border text-primary" role="status"></div>';
        
        const eventContainer = document.querySelector('.row.g-4');
        if (eventContainer) {
            eventContainer.innerHTML = '';
            eventContainer.appendChild(loadingSpinner);
        }

        const events = await this.fetchEvents();
        this.updateEventDisplay();
    },

    // Exercise 11: Form Handling
    handleRegistration(event, formData) {
        const { name, email, eventType, eventDate, message } = formData;
        
        // Validation
        if (!name || !email || !eventType) {
            throw new Error("Please fill in all required fields");
        }

        const user = { name, email, eventDate, message };
        return this.registerUser(eventType, user);
    },

    // Exercise 12: AJAX & Fetch API
    async submitRegistration(formData) {
        try {
            // Simulate API call
            const response = await fetch('https://api.example.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Registration failed');
            
            return await response.json();
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },

    // Exercise 13: Debugging Helpers
    debugRegistration(formData) {
        console.group('Registration Debug');
        console.log('Form Data:', formData);
        console.log('Available Events:', events);
        console.log('Total Registrations:', this.totalRegistrations);
        console.groupEnd();
    },

    showRegistrationModal(event) {
        const modal = new bootstrap.Modal(document.getElementById('eventModal'));
        const modalTitle = document.querySelector('.modal-title');
        const modalBody = document.querySelector('.modal-body');
        
        modalTitle.textContent = `Register for ${event.name}`;
        modalBody.innerHTML = `
            <form id="registrationForm">
                <div class="mb-3">
                    <label for="regName" class="form-label">Name</label>
                    <input type="text" class="form-control" id="regName" required>
                </div>
                <div class="mb-3">
                    <label for="regEmail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="regEmail" required>
                </div>
                <div class="mb-3">
                    <label for="regMessage" class="form-label">Special Requirements</label>
                    <textarea class="form-control" id="regMessage" rows="3"></textarea>
                </div>
            </form>
        `;

        const modalFooter = document.querySelector('.modal-footer');
        const registerBtn = modalFooter.querySelector('.btn-primary');
        registerBtn.onclick = () => {
            const form = document.getElementById('registrationForm');
            const formData = {
                name: form.regName.value,
                email: form.regEmail.value,
                eventType: event.name,
                message: form.regMessage.value
            };

            this.debugRegistration(formData);
            
            if (this.handleRegistration(event, formData)) {
                modal.hide();
                this.showSuccessMessage('Registration successful!');
            } else {
                this.showErrorMessage('Registration failed. Please try again.');
            }
        };

        modal.show();
    },

    showSuccessMessage(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-success alert-dismissible fade show';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.querySelector('.container').prepend(alert);
    },

    showErrorMessage(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger alert-dismissible fade show';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.querySelector('.container').prepend(alert);
    }
};

// Exercise 14: jQuery-like functionality (if needed)
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the portal
    eventManager.initializePortal();

    // Add event listeners for filters
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredEvents = events.filter(event => 
                event.name.toLowerCase().includes(searchTerm) ||
                event.location.toLowerCase().includes(searchTerm)
            );
            // Update display with filtered events
            const eventContainer = document.querySelector('.row.g-4');
            if (eventContainer) {
                eventContainer.innerHTML = '';
                filteredEvents.forEach(event => {
                    if (event.checkAvailability()) {
                        const eventCard = eventManager.createEventCard(event);
                        eventContainer.appendChild(eventCard);
                    }
                });
            }
        });
    }

    // Form submission handler
    const eventForm = document.getElementById('eventForm');
    if (eventForm) {
        eventForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(eventForm);
            const data = Object.fromEntries(formData.entries());
            
            try {
                await eventManager.submitRegistration(data);
                eventManager.showSuccessMessage('Registration submitted successfully!');
                eventForm.reset();
            } catch (error) {
                eventManager.showErrorMessage('Registration failed. Please try again.');
            }
        });
    }
}); 