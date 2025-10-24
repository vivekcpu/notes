// new page to learn and try disable effetct in inspect element...js


function showAlert(message) {
    // Remove existing alert if present
    const existing = document.getElementById('inspect-alert');
    if (existing) existing.remove();

    // Create alert div
    const alertDiv = document.createElement('div');
    alertDiv.id = 'inspect-alert';

    // Tailwind classes for top-left corner & responsive width
    alertDiv.className = 'fixed top-5 left-5 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50 w-auto max-w-xs sm:max-w-sm md:max-w-md';

    alertDiv.innerText = message;

    document.body.appendChild(alertDiv);

    // Remove after 2 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 1000);
}

// Disable right-click
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showAlert("Right-click is disabled!");
});

// Disable keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // F12
    if (e.key === "F12") {
        e.preventDefault();
        showAlert("Inspect is disabled!");
    }
    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
        showAlert("Inspect is disabled!");
    }
    // Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.key === "J") {
        e.preventDefault();
        showAlert("Inspect is disabled!");
    }
    // Ctrl+U (View source)
    if (e.ctrlKey && e.key === "U") {
        e.preventDefault();
        showAlert("Viewing source is disabled!");
    }
});