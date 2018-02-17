module.exports = {
  get: (url, callback) => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if(xhttp.readyState === 4 && xhttp.status === 200){
        callback(null, JSON.parse(xhttp.responseText));
      }
    };
    xhttp.open("GET", url);
    xhttp.send();
  },
  post: (url, data, callback) => {
    if(typeof(data) === "object") {
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if(xhttp.readyState === 4 && xhttp.status === 200){
          callback(null, JSON.parse(xhttp.responseText));
        }
      };
      xhttp.open("POST", url);
      xhttp.setRequestHeader("Content-Type", "application/json");
      xhttp.setRequestHeader("Accept", "application/json");
      
      xhttp.send(data);
    } else {
      callback(null);
    }
  }
};