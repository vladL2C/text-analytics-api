document.getElementById("analyseButton").addEventListener("click", analyze);

function analyze() {
  let reqBody = {
    "documents": [
      {
        "language": "en",
        "id": 1,
        "text": document.getElementById("input").value
      }
    ]
  };

  let myHeader = new Headers({
    'Content-Type': 'application/json',
    "Ocp-Apim-Subscription-Key": "95bdcf145b3b4f84b80f98367f8fda10"
  });


  let initObject = {
    method: 'POST',
    body: JSON.stringify(reqBody),
    headers: myHeader
  };

  let request = new Request('https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases', initObject);

  fetch(request).then((response) => {
    if(response.ok){
      return response.json;
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }).then((response) => {
    document.getElementById("output").innerHTML = "Total Key Phrases: " + response.documents[0].keyPhrases.length + "</br>" + response.documents[0].KeyPhrases;
  }).catch((err) => {
    alert(err);
    document.getElementById("output").innerHTML = "";
  });
}