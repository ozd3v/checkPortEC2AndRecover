const express = require('express');
const RecoverService = require('./recoverService');

const HTTP_PORT = process.env.HTTP_PORT || 5010;
const recoverService = new RecoverService();
const PORT_RECOV = 5010
const app = express(); 

app.use(express.json());

app.all('/', (req, res) => {
    console.log("recibiendo request");
    res.sendStatus(200);
});

app.all('/servicerecov', (req, res) => {
    console.log("recibiendo request de recuperacion");
    const pid = recoverService.execCmd(PORT_RECOV);
    res.json({pid: pid});
});



app.listen(HTTP_PORT, () => console.log(`escuchando en puerto ${HTTP_PORT}`));

