const express = require('express');
const fileUpload = require('express-fileupload');
const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const app = express();
const cors = require('cors');
const bytes = require('bytes');
const uuidV4 = require('uuid/v4');

app.use(fileUpload());
app.use(cors());

const UploadSerializer = new JSONAPISerializer('uploads', {
  attributes: ['name', 'size', 'type'],
});


app.post('/upload', (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files['profile-image'];
  const data = UploadSerializer.serialize({
    id: uuidV4(),
    name: file.name,
    type: file.mimetype,
    size: bytes(file.data.byteLength),
  });

  res.json(data);
});


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
