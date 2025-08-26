// Leaderboard of silence periods (sorted by duration, longest first)
const silencePeriods = [
    {
        startDate: new Date('2025-08-23T05:50:00Z'), // Saturday, August 23, 2025, 12:50 AM CT
        endDate: new Date('2025-08-24T04:24:00Z'),   // Saturday, August 23, 2025, 11:24 PM CT
        duration: null // Will be calculated
    },
    {
        startDate: new Date('2025-08-07T06:40:00Z'), // August 7, 2025, 1:40 AM CT
        endDate: new Date('2025-08-23T05:50:00Z'),   // August 23, 2025, 12:50 AM CT
        duration: null // Will be calculated
    }
];

// Calculate durations for each period
silencePeriods.forEach(period => {
    period.duration = period.endDate - period.startDate;
});

// Sort by duration (longest first)
silencePeriods.sort((a, b) => b.duration - a.duration);

// Last time K spoke - August 24 at 9:58 PM CT
const lastContactDate = new Date('2025-08-25T02:58:00Z'); // August 24, 2025, 9:58 PM CT

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

// Display the latest record (most recent period)
function displayLatestRecord() {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };
    
    // Get the most recent period (by end date)
    const latestPeriod = silencePeriods.reduce((latest, current) => 
        current.endDate > latest.endDate ? current : latest
    );
    
    const startFormatted = latestPeriod.startDate.toLocaleString('en-US', options);
    const endFormatted = latestPeriod.endDate.toLocaleString('en-US', options);
    
    // Calculate duration
    const days = Math.floor(latestPeriod.duration / (1000 * 60 * 60 * 24));
    const hours = Math.floor((latestPeriod.duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((latestPeriod.duration % (1000 * 60 * 60)) / (1000 * 60));
    
    const recordElement = document.getElementById('latest-record');
    if (recordElement) {
        recordElement.innerHTML = `
            <strong>Latest Silence:</strong> ${days} days, ${hours} hours, ${minutes} minutes<br>
            <span style="font-size: 0.9em; opacity: 0.8;">${startFormatted} → ${endFormatted}</span>
        `;
    }
}

// Display the leaderboard
function displayLeaderboard() {
    const leaderboardElement = document.getElementById('leaderboard-list');
    if (!leaderboardElement) return;
    
    const options = {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };
    
    let html = '<ol>';
    
    silencePeriods.forEach((period, index) => {
        const days = Math.floor(period.duration / (1000 * 60 * 60 * 24));
        const hours = Math.floor((period.duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((period.duration % (1000 * 60 * 60)) / (1000 * 60));
        
        const startFormatted = period.startDate.toLocaleString('en-US', options);
        const endFormatted = period.endDate.toLocaleString('en-US', options);
        
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
        
        html += `
            <li class="leaderboard-item">
                <div class="duration">${medal} ${days}d ${hours}h ${minutes}m</div>
                <div class="dates">${startFormatted} → ${endFormatted}</div>
            </li>
        `;
    });
    
    html += '</ol>';
    leaderboardElement.innerHTML = html;
}

// Initialize
displayLastContactTime();
displayLatestRecord();
displayLeaderboard();
updateTimer();

// Update every second
setInterval(updateTimer, 1000);