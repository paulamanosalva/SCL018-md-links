// import fetch from "node-fetch";
// import fs from 'fs';
// import path, { resolve } from "path";

// const userPath = process.argv[2];
// let validate = true;
// let stats = false;


// //leer archivo
// const readFileData = (fileToRead) => {
//   const extension = path.extname(fileToRead);//guarda le ext del archivo en una variable
//   if (extension === '.md') { //verifica si el archivo es md
//     const data = fs.readFileSync(fileToRead, {encoding:'utf8', flag:'r'}) // es md --> lee el contenido del archivo 
//       return searchLinks(data); // ve si hay links y guarda en un array las coincidencias (todas)
     

//   }else {
//     console.log('el archivo no es markdown');    
//   }
// };
// const searchLinks = (data) => {
//   const matchLinks = data.matchAll(/(?<!\!)\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g)
//   // constante que compara la data con los link
//   const allLinks = [] 

//       for (const match of matchLinks) { 
//        const data = {
//         href: match[2],
//         text: match[1],
//         file: userPath,
//       }; 
//       allLinks.push(data);
//     }
//    return allLinks;
// };

// const fetchLinks = (url) =>{
//   return fetch(url)
//     .then(response => response.status);
// }

// const validateLinks = (links) => {

// const fetched = []
//   for (let i= 0; i < links.length; i++) {
//     let link = links[i].href;
//     fetched.push(fetchLinks(link));

//   }
//   return Promise.all(fetched)

// };

// function mdLinks(fileToRead){
//   return new Promise((resolve, reject)=>{
//     const links = readFileData(fileToRead);
//     if(!validate){
//       resolve(links)
//     }
//     else {
//       function changeFormat(){
//         let newArr = new Promise((resolve, reject)=>{
//           validateLinks(links)
//         .then(responses => (responses.map((x) => {x})))
//         })
//         return Promise.all(newArr)
//       }
//       resolve(changeFormat());
//     }
    
    
//     })
    
//   }


//   mdLinks(userPath)
//   .then(results => console.log(results))

import fetch from "node-fetch";
import fs from 'fs';
import path, { resolve } from "path";
import { url } from "inspector";
const userPath = process.argv[2];
let validate = true;
// let stats = false;
//leer archivo
const readFileData = (fileToRead) => {
  const extension = path.extname(fileToRead);//guarda le ext del archivo en una variable
  if (extension === '.md') { //verifica si el archivo es md
    const data = fs.readFileSync(fileToRead, { encoding: 'utf8', flag: 'r' }) // es md --> lee el contenido del archivo
    return searchLinks(data); // ve si hay links y guarda en un array las coincidencias (todas)
  } else {
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
// const fetchLinks = (url) => {
//   return fetch(url)
//     .then(response => response.status)
// }
// const newFx = (links) =>{
//   return Promise.all(fetchLinks(links))
// }

// const validateLinks = (links) => {
//   const newData = [];
//     for (let i= 0; i < links.length; i++) {
//       let link = links[i].href;
//       newData.push({
//         href: link, 
//         status: newFx(link),
//       });
//     }
  

  
//   return newData;
// };

const validateLinks = (links) => {
  const validated = links.map((element) =>
  fetch(element.href)
  .then((response) => {
      return {
        href: element.href,
        text: element.text,
        file: element.file,
        status: response.status,
        statusText: response.statusText,
      };
  })
  )
  return Promise.all(validated);
}

// function mdLinks(fileToRead) {
//   return new Promise((resolve, reject) => {
//     const links = readFileData(fileToRead);
//     resolve(links);
//   })
// }
// mdLinks(userPath)
//   .then(result => validateLinks(result))
//   .then(result => console.log(result))
//   .catch(err => { console.log('This is the error I get with this promise: ' + err) })

function mdLinks(fileToRead){
  return new Promise((resolve, reject)=>{
    const links = readFileData(fileToRead);
    if(!validate){
      resolve(links)
    }
    else {
      resolve(validateLinks(links)); 
    }
    })
    
  }


  mdLinks(userPath)
  .then(results => console.log(results))
