const tg = window.Telegram.WebApp;
tg.ready();

// Match Telegram theme
document.body.style.backgroundColor = tg.themeParams.bg_color || '#f5f5f5';

// Get user ID from Telegram
const userId = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.id : 'test_user';

// Generate referral link
const referralLink = `https://t.me/PipsWizardbot?start=ref_${userId}`; // Updated bot username

// Handle quiz submission
document.getElementById('submitBtn').addEventListener('click', () => {
    const answer = document.getElementById('answer').value.trim();
    if (answer) {
        console.log("Sending data:", { action: 'submit_answer', answer: answer }); // Debug log
        tg.sendData(JSON.stringify({ action: 'submit_answer', answer: answer }));
        document.getElementById('response').textContent = 'Answer sent! Awaiting bot response...';
    } else {
        document.getElementById('response').textContent = 'Please enter an answer.';
    }
});

// Handle share referral link
document.getElementById('shareBtn').addEventListener('click', () => {
    tg.shareToContact({
        text: `Join my quiz and play! ${referralLink}`,
        url: referralLink
    });
});

// Request points from bot
tg.sendData(JSON.stringify({ action: 'get_points' }));
tg.onEvent('webAppData', (data) => {
    if (data) {
        const response = JSON.parse(data);
        if (response.points !== undefined) {
            document.getElementById('points').textContent = `Points: ${response.points} | Referrals: ${response.referrals}`;
        }
    }
});
