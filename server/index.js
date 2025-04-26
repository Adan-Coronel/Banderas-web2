const express = require('express');
const app = express();
const PORT = process.env.PORT ||3000;

app.use(express.static('public'));

/*app.get('/', (req, res) => {
  res.send('funciona express');
});*/

app.listen(PORT, () => {
  console.log(`url del servidor http://localhost:${PORT}`);
});