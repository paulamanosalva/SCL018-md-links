import fetch from "node-fetch";
import fs from 'fs';
import path from "path";

const userPath = process.argv[2];


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
const searchLinks = (data) => {
  const matchLinks = data.matchAll( /(?<!\!)\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g);// constante que compara la data con los link
  const allLinks = []; //array vacío para guardar la info
  for (const match of matchLinks) { //loop del matchAll, pushea los links en la constante
    allLinks.push(
      {
      href: match[2], //matchAll entrega un array con todas las coincidencias, la url queda en el index 2, el texto del link en el 1 y el userpath en 0
      text: match[1],
      file: userPath, 
    }
    );
  }
  return allLinks;
};


const mdLinks = (userInput) => {
  readFileData(userInput);
}

mdLinks(userPath); //al correr el archivo se ejecuta mdLinks con el archivo que entrega el user