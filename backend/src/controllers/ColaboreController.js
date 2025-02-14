const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config(); 

class ColaboreController {
  async enviaArquivo(req, res) {
    console.log(req.body);
    console.log(req.file);
    var data_type = req.params.nomeTemplate;
    var guid = uuidv4();
    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }

      const fileExtension = path.extname(req.file.originalname).toLowerCase();
      if (fileExtension !== '.xlsx') {
        return res.status(400).send('Invalid file type. Only .xlsx files are allowed.');
      }

      const uploadPath = path.join(process.env.UPLOAD_DIR, data_type, guid + fileExtension);
      console.log(uploadPath);
      

      fs.writeFile(uploadPath, req.file.buffer, (err) => {
        if (err) {
          return res.status(400).send('Failed to save file.');
        }
        
        startPentahoJob(data_type, guid);

        const retornoPath = path.join(process.env.UPLOAD_DIR, data_type,`${guid}_result.txt`);
        const errorRetornoPath = path.join(process.env.UPLOAD_DIR, data_type,`${guid}_error.txt`);

        checkFileExists(retornoPath, errorRetornoPath, 2 * 60 * 1000)
          .then(() => {
            fs.readFile(retornoPath, 'utf8', (err, data) => {
              if (err) {
                return res.status(400).send('Failed to read retorno.txt.');
              }
              res.status(200).send(data);
            });
          })
          .catch((err) => {
            if (err.includes('file')) {
              fs.readFile(errorRetornoPath, 'utf8', (err, data) => {
                if (err) {
                  return res.status(400).send('Failed to read error.txt.');
                }
                res.status(400).send(data);
              });
            } else {
              res.status(400).send
            }
          });
      });

    } catch (error) {
      res.status(400).send('An error occurred.');
    }
  }

  async baixaTemplate(req, res) {
    try {
      const filePath = path.join(process.env.DOWNLOAD_DIR, req.params.nomeTemplate + '_TEMPLATE.csv');
      res.download(filePath, (err) => {
        if (err) {
          return res.status(400).send('Failed to download file.', err);
        }
      });
    } catch (error) {
      res.status(400).send('An error occurred.');
    }
  }
}

module.exports = ColaboreController;

const checkFileExists = (filePath, errorFilePath, timeout) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      if (fs.existsSync(filePath)) {
        clearInterval(interval);
        resolve(true);
      } else if (fs.existsSync(errorFilePath)) {
        clearInterval(interval);
        reject('Error processing file.');
      } else if (Date.now() - startTime > timeout) {
        clearInterval(interval);
        reject('Timeout waiting for response to be created.');
      }
    }, 1000);
  });
};

const startPentahoJob = (data_type, guid) => {
  const command = `${process.env.KITCHEN_DIR}\\Kitchen.bat /file="${process.env.JOB_DIR}\\1.GerarProjeto.kjb" /param:"data_type=${data_type}" /param:"guid=${guid}"`;

  const bat = spawn('cmd.exe', ['/c', command], { shell: true });

  bat.stdout.on('data', (data) => {
    console.log(`Saída: ${data}`);
  });

  bat.stderr.on('data', (data) => {
    console.error(`Erro: ${data}`);
  });

  bat.on('close', (code) => {
    console.log(`Processo filho saiu com o código ${code}`);
  });
}
