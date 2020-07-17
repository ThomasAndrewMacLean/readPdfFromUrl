

const pdf = require("pdf-parse");
const https = require("https");


let body = [];
https
  .request(
    "https://covid-19.sciensano.be/sites/default/files/Covid19/Meest recente update.pdf",
    (res) => {
      res.on("data", (chunk) => body.push(chunk));
      res.on("end", () => {
        const dataBuffer = Buffer.concat(body).toString();

        pdf(Buffer.concat(body)).then(function (data) {
            const getallen = data.text
            .split("Bevestigde COVID-19 gevallen")[1]
            .split("\n")[0];

            const sterf = data.text
            .split("Sterfgevallen***")[1]
            .split("\n")[0];
          console.log(getallen, sterf);
        });
      });
    }
  )
  .end();
