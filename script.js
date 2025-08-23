// Record of previous silence period
const previousRecord = {
    startDate: new Date('2025-08-07T06:40:00Z'), // August 7, 2025, 1:40 AM CT
    endDate: new Date() // Current time when K reached out
};

// Last time K spoke - updating to right now
const lastContactDate = new Date();

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

// Display the latest record
function displayLatestRecord() {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };
    
    const startFormatted = previousRecord.startDate.toLocaleString('en-US', options);
    const endFormatted = previousRecord.endDate.toLocaleString('en-US', options);
    
    // Calculate duration
    const duration = previousRecord.endDate - previousRecord.startDate;
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    
    const recordElement = document.getElementById('latest-record');
    if (recordElement) {
        recordElement.innerHTML = `
            <strong>Latest Record:</strong> ${days} days, ${hours} hours, ${minutes} minutes<br>
            <span style="font-size: 0.9em; opacity: 0.8;">${startFormatted} → ${endFormatted}</span>
        `;
    }
}

// Initialize
displayLastContactTime();
displayLatestRecord();
updateTimer();

// Update every second
setInterval(updateTimer, 1000);