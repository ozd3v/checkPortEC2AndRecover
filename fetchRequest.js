const fetch = require('node-fetch');

const recover = async () => {
    const response = fetch('http://LOCALHOST:PORT/servicerecov').then((response)=>{
        if(response.ok){
          //console.log(response)
        }
        else {
          console.log("a problem")
        }
        return response.text()
        }).then((data)=>{
        console.log(JSON.parse(data).pid)
        });
    return;
}

recover();