const http = require('http');
function httprequest() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'HOST',
            port: 5050,
            path: '/servicerecov',
            method: 'GET'
        };
        const req = http.request(options, (res) => {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            var body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            res.on('end', function () {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch (e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        req.on('error', (e) => {
            reject(e.message);
        });
        // send the request
        req.end();
    });
}
exports.handler = async function (event) {

    const salida = httprequest().then((data) => {
        const response = {
            statusCode: 200,
            body: data,
        };
        console.log(response);
        return response;
    });

    return salida;

}
