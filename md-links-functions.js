import fetch from "node-fetch";
import fs from 'fs';
import path, { resolve } from "path";

const userPath = process.argv[2];
let validate = true;
let stats = false;


//leer archivo
const readFileData = (fileToRead) => {
  const extension = path.extname(fileToRead);//guarda le ext del archivo en una variable
  if (extension === '.md') { //verifica si el archivo es md
    const data = fs.readFileSync(fileToRead, {encoding:'utf8', flag:'r'}) // es md --> lee el contenido del archivo 
      return searchLinks(data); // ve si hay links y guarda en un array las coincidencias (todas)
     

  }else {
    console.log('el archivo no es markdown');    
  }
};
const searchLinks = (data) => {
  const matchLinks = data.matchAll(/(?<!\!)\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g)
  // constante que compara la data con los link
  const allLinks = [] 

      for (const match of matchLinks) { 
       const data = {
        href: match[2],
        text: match[1],
        file: userPath,
      }; 
      allLinks.push(data);
    }
   return allLinks;
};

const fetchLinks = (url) =>{
  return fetch(url)
    .then(response => {status: response.status});
}

const validateLinks = (links) => {

const fetched = []
  for (let i= 0; i < links.length; i++) {
    let link = links[i].href;
    fetched.push(fetchLinks(link));

  }
  return Promise.all(fetched)

};

        

function mdLinks(fileToRead){
  return new Promise((resolve, reject)=>{
    const links = readFileData(fileToRead);
    if(!validate){
      resolve(links)
    }
    else {
    links.forEach((link, index) =>{
      Object.assign(link, validateLinks(links)[index])
    })
    resolve(links);
    
    }
    
  })
}

  mdLinks(userPath)
  .then(results => console.log(results))


