const pdf = require("pdf-parse");
const https = require("https");

let body = [];
https
  .request(
    "https://covid-19.sciensano.be/sites/default/files/Covid19/Meest recente update.pdf",
    (res) => {
      res.on("data", (chunk) => body.push(chunk));
      res.on("end", () => {

        pdf(Buffer.concat(body)).then(function (data) {

          console.log(data.text)
          const getallen = data.text 
            .split("Bevestigde COVID-19 gevallen")[1]
            .split("\n")[0];

          const sterf = data.text.split("Sterfgevallen***")[1].split("\n")[0];

          const datum = data.text.split("VAN")[1].split("\n")[0];
          // console.log(getallen, sterf, datum);

          const totaalGeval = getallen
            .trim()
            .split(" ")
            .filter((x, i) => i < 2)
            .join(" ");

          const totaalPerc = getallen.trim().split(" ").pop();
         
          console.log(totaalGeval, totaalPerc);
        });
      });
    }
  )
  .end();
