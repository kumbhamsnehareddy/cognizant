console.log("Welcome to the Community Portal");
// Exercise 2: Syntax, Data Types, and Operators

const eventName = "Community Cleanup Day";
const eventDate = "2025-06-15";
let availableSeats = 30;

// Function to display event info
function displayEventInfo() {
  const eventInfo = `Event: ${eventName} | Date: ${eventDate} | Seats Available: ${availableSeats}`;
  console.log(eventInfo);
}

// Function to register a user (decrement seats)
function registerSeat() {
  if (availableSeats > 0) {
    availableSeats--;  // decrement seat count by 1
    console.log(`Registration successful! Seats left: ${availableSeats}`);
  } else {
    console.log("Sorry, no seats available.");
  }
}

// Test the functions
displayEventInfo();
registerSeat();
displayEventInfo();

function showConfirmation() {
  const name = document.getElementById('name').value;
  const output = document.getElementById('confirmationMessage');
  output.textContent = `Thank you, ${name}! Your registration has been received.`;
}

function handleFeedback() {
  const name = document.getElementById('feedbackName').value;
  const event = document.getElementById('eventRated').value;
  const rating = document.getElementById('rating').value;
  const comment = document.getElementById('comment').value;

  const message = `Thanks, ${name}! You rated "${event}" a ${rating}/5.`;
  document.getElementById('feedbackMessage').textContent = message;
}

// Save/Load/Clear Preferred Event Type
const eventTypeSelect = document.getElementById('eventType');
const clearPrefsBtn = document.getElementById('clearPrefsBtn');

function saveEventType() {
  const selectedEvent = eventTypeSelect.value;
  if (selectedEvent) {
    localStorage.setItem('preferredEventType', selectedEvent);
  }
}

function loadPreferredEventType() {
  const savedEvent = localStorage.getItem('preferredEventType');
  if (savedEvent) {
    eventTypeSelect.value = savedEvent;
  }
}

function clearPreferences() {
  localStorage.removeItem('preferredEventType');
  sessionStorage.clear();
  eventTypeSelect.value = "";
  alert('Preferences cleared!');
}

// Geolocation
const findLocationBtn = document.getElementById('findLocationBtn');
const locationResult = document.getElementById('locationResult');

function showLocation(position) {
  const { latitude, longitude } = position.coords;
  locationResult.textContent = `Your coordinates: Latitude ${latitude.toFixed(4)}, Longitude ${longitude.toFixed(4)}`;
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      locationResult.textContent = "Location access denied by user.";
      break;
    case error.POSITION_UNAVAILABLE:
      locationResult.textContent = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      locationResult.textContent = "Location request timed out.";
      break;
    default:
      locationResult.textContent = "An unknown error occurred.";
  }
}

findLocationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, showError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    });
    locationResult.textContent = "Getting your location...";
  } else {
    locationResult.textContent = "Geolocation is not supported by this browser.";
  }
});

eventTypeSelect.addEventListener('change', saveEventType);
clearPrefsBtn.addEventListener('click', clearPreferences);
window.addEventListener('DOMContentLoaded', loadPreferredEventType);

window.addEventListener('load', () => {
  alert("Page is fully loaded. Welcome!");
});


