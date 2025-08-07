// Last time K spoke - August 7, 2025, 1:40 AM CT
// Converting to UTC: CT is UTC-5 in August (CDT), so 1:40 AM CT = 6:40 AM UTC
const lastContactDate = new Date('2025-08-07T06:40:00Z');

function updateTimer() {
    const now = new Date();
    const timeDiff = now - lastContactDate;
    
    // Calculate time units
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    // Update DOM
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Format and display the last contact time
function displayLastContactTime() {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZoneName: 'short'
    };
    
    // Display in user's local timezone
    const formattedDate = lastContactDate.toLocaleString('en-US', options);
    document.getElementById('last-contact-time').textContent = formattedDate;
}

// Initialize
displayLastContactTime();
updateTimer();

// Update every second
setInterval(updateTimer, 1000);