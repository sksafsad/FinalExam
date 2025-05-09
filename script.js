document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-btn');
    const countryInput = document.getElementById('country-input');
    const resultsSection = document.getElementById('results-section');
    
    // Add event listener for search button
    searchBtn.addEventListener('click', searchCountry);
    
    // Add event listener for Enter key
    countryInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchCountry();
        }
    });
    
    function searchCountry() {
        const countryName = countryInput.value.trim();
        
        if (!countryName) {
            showError('Please enter a country name');
            return;
        }
        
        showLoading();
        
    }
});