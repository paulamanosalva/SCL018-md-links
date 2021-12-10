import fetch from "node-fetch";
import fs from 'fs';
import path from "path";

const userPath = process.argv[2];
let validate = true;
let stats = false;

const readFileData = (fileToRead) => {
  const extension = path.extname(fileToRead);//guarda le ext del archivo en una variable
  if (extension === '.md') { //verifica si el archivo es md
    fs.readFile(fileToRead, 'utf8', (err, data) => { //si es md --> lee el contenido del archivo 
      if (err) throw err;
      const links = searchLinks(data) // ve si hay links y guarda en un array las coincidencias (todas)
      console.log(links); // sería allLinks que es el return de searchLinks, donde se guardó la info.
      return links;
    });
  }else {
    console.log('el archivo no es markdown');    
  }
};
const searchLinks = async (data) => {
  const matchLinks = data.matchAll( /(?<!\!)\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g);// constante que compara la data con los link

   async function pushData(){
     try {
      const allLinks = []
       for (const match of matchLinks) { 
       let res = await validateLinks(match[2]);
       const data = {
        href: match[2],
        text: match[1],
        file: userPath,
        status: res,
      }; 
      
      allLinks.push(data);
      console.log(allLinks);
    }
    return allLinks
     }
     catch(e){
      console.log(e);
    }
   
   }
  let result = await pushData();
  return result;
  
};




async function validateLinks(url) {
  const response = await fetch(url);
  const linkStatus = await response.status;
  return linkStatus;
}
 



const mdLinks = (userInput, options) => {
  readFileData(userInput);
}

mdLinks(userPath); //al correr el archivo se ejecuta mdLinks con el archivo que entrega el user