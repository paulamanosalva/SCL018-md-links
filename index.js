import fetch from "node-fetch";
import fs from 'fs';
// module.exports = () => {
//   // ...
// };
//usar fetch
// 

//node leer archivo

fs.readFile('README.md', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  let links = data.match(/(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/gi)
  console.log(links);
  
})