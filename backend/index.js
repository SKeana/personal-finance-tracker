const express = require('express');
const app = express();
const PORT = 8080;

app.listen(
    PORT,
    () => console.log(`it is alive on http:localhost:${PORT}`)
)
