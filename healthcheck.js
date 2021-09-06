//const fetch = import('node-fetch');
//import fetch from 'node-fetch';
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const AWS = require('aws-sdk');

checkService = async () => {
    const result = await fetch('http://HOST:PORT/').then(
        function (response) {
            console.log(response.status)
            if(response.status === 200) {
                 call_aws_metric(NAMESPACE, METRICNAME, DIMENSIONNAME, DIMENSIONVALUE, 1, UNIT, STORAGE_RES);
            } else 
            {
                 call_aws_metric(NAMESPACE, METRICNAME, DIMENSIONNAME, DIMENSIONVALUE, 0, UNIT, STORAGE_RES);
            }
            return true;
        },
        function (error) {
            console.log("NO SERVICE");
             call_aws_metric(NAMESPACE, METRICNAME, DIMENSIONNAME, DIMENSIONVALUE, 0, UNIT, STORAGE_RES);
            return false;
        }
    );
    return result;
}

call_aws_metric = async (namespace, metricname, dimensionname, dimensionvalue, value_var, unit_var, storage_res) => {
    let cloudwatch = new AWS.CloudWatch();
    const params = {
        MetricData: [ // required 
          {
              MetricName: metricname, // required 
              Dimensions: [
                {
                  Name: dimensionname, // required 
                  Value: dimensionvalue // required 
                },
                // more items 
              ],
              StorageResolution: storage_res,
              Timestamp: new Date().toISOString(),
              Unit: unit_var,
              Value: value_var,
            },
            // more items 
          ],
          Namespace: namespace // required 
        };
        cloudwatch.putMetricData(params, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else     console.log(data);           // successful response
        });
}

const WAIT_TIME = 5;  //SEGS
const REGION = "REGION";
const ACCESSKEYID = "ACCESSKEYID";
const SECRETKEYID = "SECRETKEYID";
const NAMESPACE="NAMESPACE";
const METRICNAME="METRICNAME";
const DIMENSIONNAME="DIMENSIONNAME";
const DIMENSIONVALUE = "DIMENSIONVALUE";
const STORAGE_RES = 1;
const UNIT = "Count";
//URLMETADATA="http://169.254.169.254/latest/meta-data/"
//URLMETAID="http://169.254.169.254/latest/meta-data/instance-id"
AWS.config.update({ region: REGION, accessKeyId: ACCESSKEYID, secretAccessKey: SECRETKEYID });

setInterval(checkService, WAIT_TIME*1000);
