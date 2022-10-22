const fs = require('fs');


//Read Large File WITH STREAM
//For readable data use the encoding or just put .toString() to the chunk
const readStream= fs.createReadStream('./data/large_datafile.txt', {encoding: 'utf8'});
const writeStream= fs.createWriteStream('./data/large_datafile2.txt');

//Method1
// readStream.on('data', (chunk)=>{
//     //read
//     console.log('------ New Chunck of data -----');
//     console.log(chunk);
//     //write
//     writeStream.write('\n---- New Chunk-------\n');
//     writeStream.write(chunk);
// });

//Method2
//Pipe 
//It's another way to read large data and write it directly to another file and is simple replacment for Mathod 1
//Use this method if you don't want to make changes to the chunks
readStream.pipe(writeStream);




