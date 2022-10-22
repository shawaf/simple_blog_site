const fs = require('fs');

//Read file
fs.readFile('./data/datafile1.txt', (err, data) => {
    if (err) {
        console.log("can't find the file");
    } else {
        console.log('File data ', data.toString());
    }
});


//Write to file
fs.writeFile('./data/datafile2.txt', 'helloooo in datafile2', () => {
    console.log('file created succesfully');
});

//Making/deleting directories
if (!fs.existsSync('./assets')) {
    fs.mkdir('./assets', (err) => {
        if (err) {
            console.log('error in creating the file');
        } else {
            console.log('folder created');
        }
    });
} else {
    fs.rmdir('./assets', (err) => {
        if (err)
            console.log(err)
        else 
            console.log('folder deleted');
    });
}

//deleting files
if(fs.existsSync('./data/datafile2.txt')){
    fs.unlink('./data/datafile2.txt',(err)=>{
        if (err)
        console.log(err)
    else 
        console.log('file deleted');
    });
}