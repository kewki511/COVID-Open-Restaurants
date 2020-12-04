'use strict';

// Parameter values
const clientID = '0J4WJETOBCPLV00I1TVWZZ0OQ4AD0SSR1EF0MHYHYLNLI1UC'; 
const clientSecret = 'KGP3X3GVAYN13LUQNUJZS4Q25QHTQJ4ZFMSQVNNAZNNAG2OY'
const searchURL = 'https://api.foursquare.com/v2/venues/search?';
const ver = '20201120'

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function getRestaurants(location, maxResults) {
  const params = {
    client_id: clientID,
    client_secret: clientSecret,
    v: '20201120',
    near: location,
    limit: maxResults,
    query: 'restaurants'
  };
  console.log(params)
  //create a string with the original URL and the new parameter
  const queryString = formatQueryParams(params)
  const url = searchURL + queryString;
  console.log(url);

  function jsonCallback(json){ 
    console.log("Foursquare API result:", json); }

  fetch(url).then(rawResponse => {
    return rawResponse.json();
  }).then(data => {
     // Code for handling API response
    $('#results-list').empty();
      for (let i=0; i<data.response.venues.length; i++) {
        const venue = data.response.venues[i];
        console.log(venue.name);
        const address = venue.location.address;
        console.log(address);
        const link = `https://foursquare.com/v/${venue.id}`;
        console.log(link);
        $('#results-list').append(
          `<li><h3><a target="_blank" href="${link}">${venue.name}</a></h3>
          <p>${address}</p>
          </li>`
        )
      }
      //display the results section  
      $('#results').removeClass('hidden');
  });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getRestaurants(searchTerm, maxResults);
  });
}

$(watchForm);