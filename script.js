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
        // Clear previous results
        resultsSection.innerHTML = '';
        
        fetch(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Country not found. Please check the spelling and try again.');
                }
                return response.json();
            })
            .then(data => {
                displayResults(data);
            })
            .catch(error => {
                showError(error.message);
            });
    }
    
    function displayResults(countries) {
        resultsSection.innerHTML = '';
        
        countries.forEach(country => {
            const countryCard = document.createElement('div');
            countryCard.className = 'country-card';
            
            // Get currency information
            let currencies = 'N/A';
            if (country.currencies) {
                currencies = Object.values(country.currencies)
                    .map(currency => `${currency.name} (${currency.symbol || 'No symbol'})`)
                    .join(', ');
            }
            
            
            // Get languages information
            let languages = 'N/A';
            if (country.languages) {
                languages = Object.values(country.languages).join(', ');
            }
            
            countryCard.innerHTML = `
                <div class="country-header">
                    <img src="${country.flags.png}" alt="Flag of ${country.name.common}" class="country-flag">
                    <h2 class="country-name">${country.name.common} <span>(${country.name.official})</span></h2>
                </div>
                <div class="country-details">
                    <div class="detail-item">
                        <span class="detail-label">Capital:</span>
                        <span class="detail-value">${country.capital ? country.capital.join(', ') : 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Region:</span>
                        <span class="detail-value">${country.region}${country.subregion ? ` (${country.subregion})` : ''}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Population:</span>
                        <span class="detail-value">${country.population.toLocaleString()}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Currency:</span>
                        <span class="detail-value">${currencies}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Languages:</span>
                        <span class="detail-value">${languages}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Time Zones:</span>
                        <span class="detail-value">${country.timezones ? country.timezones.join(', ') : 'N/A'}</span>
                    </div>
                </div>
            `;
            
            resultsSection.appendChild(countryCard);
        });
    }
    
    function showError(message) {
        resultsSection.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>${message}</p>
            </div>
        `;
    }
    
    function showLoading() {
        resultsSection.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Searching for country information...</p>
            </div>
        `;
        
        document.querySelector('.loading-spinner').style.display = 'block';
    }
});
