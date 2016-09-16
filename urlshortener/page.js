module.exports = '<h2 class="header">URL Shortener Microservice</h2>\
 <p>User stories:</p>\
  <ul>\
    <li>I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.</li> \
    <li>When I visit that shortened URL, it will redirect me to my original link.</li> \
  </ul>\
  <h3>Example creation usage:</h3> \
  https://camper-api-projects-pfilippo.c9users.io/new/https://www.google.com<br/> \
  <h3>Example creation output</h3> \
  { "original_url":"https://www.google.com", "short_url":"https://camper-api-projects-pfilippo.c9users.io/1"} \
  <h3>Usage:</h3> \
  https://camper-api-projects-pfilippo.c9users.io/1<br>Will redirect to: https://www.google.com/ \
';