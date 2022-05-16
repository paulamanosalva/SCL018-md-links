import fetch from "node-fetch";
import fs, { readdirSync } from 'fs';
import path from "path";
import Yargs from "yargs";


const options = Yargs(process.argv.slice(2)).argv;

const userPath = process.argv[2]
// let stats = false;
//es o no directorio
const isDirectory = (userPath)=>{
  try {
    const stats = fs.statSync(userPath)
    return stats.isDirectory();
  } catch (err) {
    console.error(err)
  }
};
// es o no un archivo
const isFile = fileName => {
  return fs.lstatSync(fileName).isFile()
}
//leer directorio (retorna archivos en array)
const syncReadDir = () =>{
  let absPath = []
  return fs.readdirSync(userPath).map(fileName => {
   absPath.push(path.join(userPath, fileName))

   return absPath.forEach((file) => {
     console.log(readFileData(file));// aqui hay un problema de retorno
    })
    })
    
    
}

  // console.log(folderPath);


 
// console.log(readDirectory(userPath));

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

function mdLinks(fileToRead){
  return new Promise((resolve, reject)=>{
   
    if(isFile(userPath)){
      const links = readFileData(fileToRead);
      if(!options.validate){
        resolve(links)
      }
      else {
        resolve(validateLinks(links)); 
      }
    }
    else if(isDirectory(userPath)){
      //aqui falta condicional para validar pero primero necesito arreglar el retorno de syncReadDir
      const files = syncReadDir(userPath)
      console.log(files)
      resolve(files)
    }else{
      console.log('No es válido');
    }

    
    })
    
  }


  mdLinks(userPath)
  .then(results => console.log(results))