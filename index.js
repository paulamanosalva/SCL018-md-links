import fetch from "node-fetch";

// module.exports = () => {
//   // ...
// };
//usar fetch
fetch('http://example.com/movies.json')
  .then(response => console.log(response.status))
  .catch(error => console.log(error.code))
  //hola