const fs = require('fs');
const path = require('path');
require('dotenv').config(); 

class ColaboreController {
  async enviaArquivo(req, res) {
    console.log(req.body);
    console.log(req.file);
    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }

      const fileExtension = path.extname(req.file.originalname).toLowerCase();
      if (fileExtension !== '.csv' && fileExtension !== '.xlsx') {
        return res.status(400).send('Invalid file type. Only .csv and .xlsx files are allowed.');
      }

      const uploadPath = path.join(process.env.UPLOAD_DIR, req.file.originalname);
      console.log(uploadPath);

      fs.writeFile(uploadPath, req.file.buffer, (err) => {
        if (err) {
          return res.status(400).send('Failed to save file.');
        }

        const retornoPath = path.join(process.env.UPLOAD_DIR, 'retorno.txt');
        console.log(retornoPath);

        checkFileExists(retornoPath, 2 * 60 * 1000)
          .then(() => {
            fs.readFile(retornoPath, 'utf8', (err, data) => {
              if (err) {
                return res.status(400).send('Failed to read retorno.txt.');
              }
              res.status(200).send(data);
            });
          })
          .catch((err) => {
            res.status(400).send(err.message);
          });
      });

    } catch (error) {
      res.status(400).send('An error occurred.');
    }
  }

}
  
module.exports = ColaboreController;

const checkFileExists = (filePath, timeout) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      if (fs.existsSync(filePath)) {
        clearInterval(interval);
        resolve(true);
      } else if (Date.now() - startTime > timeout) {
        clearInterval(interval);
        reject(new Error('Timeout waiting for retorno.txt to be created.'));
      }
    }, 1000);
  });
};



