'use strict';

// put your own value below!
const clientID = '0J4WJETOBCPLV00I1TVWZZ0OQ4AD0SSR1EF0MHYHYLNLI1UC'; 
const clientSecret = 'KGP3X3GVAYN13LUQNUJZS4Q25QHTQJ4ZFMSQVNNAZNNAG2OY'
const searchURL = 'https://api.foursquare.com/v2/venues/search';
const ver = '20201120'

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function getRestaurants(location, maxResults=10) {
  const params = {
    id: clientID,
    secret: clientSecret,
    near: location,
    maxResults,
  };
  console.log(params)
  //create a string with the original URL and the new parameter
  const queryString = formatQueryParams(params)
  const url = searchURL + '?client_id=' + clientID + '&client_secret=' + clientSecret + queryString;


function jsonCallback(json){ 
  console.log("Foursquare API result:", json); }

$.ajax({
  dataType: "json",
  url: "https://api.foursquare.com/v2/venues/search?client_id=0J4WJETOBCPLV00I1TVWZZ0OQ4AD0SSR1EF0MHYHYLNLI1UC&client_secret=KGP3X3GVAYN13LUQNUJZS4Q25QHTQJ4ZFMSQVNNAZNNAG2OY&v=20201120&limit=10&near=" + location + "&query=restaurants",
  data: {},
  success: function(data) {
    // Code for handling API response
    //console.log(data.response.venues);
    $('#results-list').empty();
    for (let i=0; i<data.response.venues.length; i++) {
      const venue = data.response.venues[i];
      console.log(venue.name);
      const address = venue.location.address;
      console.log(address);

      $('#results-list').append(
      `<li><h3><a href="${data.response.venues[i].canonicalUrl}">${venue.name}</a></h3>
      <p>${address}</p>
      </li>`
    )}
  //display the results section  
  $('#results').removeClass('hidden');
    },
  error: function(jqXHR, textStatus, errorThrown) {
    // Code for handling errors
  },
});

console.log(url);

fetch('https://api.foursquare.com/v2/venues/51db1d29498e99e8c8b72d52?client_id=0J4WJETOBCPLV00I1TVWZZ0OQ4AD0SSR1EF0MHYHYLNLI1UC&client_secret=KGP3X3GVAYN13LUQNUJZS4Q25QHTQJ4ZFMSQVNNAZNNAG2OY&v=20201120')
  .then(rawResponse=> {
  if (rawResponse.ok) {
    return rawResponse.json();
  }
}).then(response=>{
  console.log(response);
})
.catch(err => {
  $('#js-error-message').text(`Something went wrong: ${err.message}`);
})
};

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getRestaurants(searchTerm, maxResults);
  });
}

$(watchForm);
