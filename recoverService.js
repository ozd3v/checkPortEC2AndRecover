const { spawn } = require("child_process");
class RecoverService {
    constructor() {

    }
    execCmd(http_port) {
        const args = ["node","server.js",">/dev/null", "2>&1", "&"]; //s.split(" ");
        const options = { 
            env: { 
                ...process.env, 
                HTTP_PORT: http_port 
            },
            detached: true 
        }
        const yarn = spawn("nohup", args, options);
        yarn.stdout.on("data", data => {
            console.log(`stdout: ${data}`);
        });

        yarn.stderr.on("data", data => {
            console.log(`stderr: ${data}`);
        });

        yarn.on('error', (error) => {
            console.log(`error: ${error.message}`);
        });

        yarn.on("close", code => {
            console.log(`child process exited with code ${code}`);
        });

        return yarn.pid;
    }
}

module.exports = RecoverService;