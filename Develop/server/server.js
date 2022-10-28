const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
// this serves static files that are within the entire client's dist folder.
app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//This requires the htmlRoutes. 
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
