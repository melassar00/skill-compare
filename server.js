const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const pdf = require('pdf-parse');

const app = express();

app.use(fileUpload());

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  var uploadDir = `${__dirname}/client/public/uploads`;

  if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  file.mv(`${uploadDir}/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    pdf(file.data).then(result => {
      res.json({ fileName: file.name, filePath: `/uploads/${file.name}`, pdfInfo: result });
    });
  });
});

app.listen(5000, () => console.log('Server Started...'));
