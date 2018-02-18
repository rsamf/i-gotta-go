module.exports = {
  get: (url, callback) => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if(xhttp.readyState === 4 && xhttp.status === 200){
        callback(JSON.parse(xhttp.responseText));
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
          callback(JSON.parse(xhttp.responseText));
        }
      };
      xhttp.open("POST", url);
      xhttp.setRequestHeader("Content-Type", "application/json");
      xhttp.setRequestHeader("Accept", "application/json");

      xhttp.send(JSON.stringify(data));
    } else {
      callback(null);
    }
  },
  put: (url, data, callback) => {
    if(typeof(data) === "object") {
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if(xhttp.readyState === 4 && xhttp.status === 200){
          callback(JSON.parse(xhttp.responseText));
        }
      };
      xhttp.open("PUT", url);
      xhttp.setRequestHeader("Content-Type", "application/json");
      xhttp.setRequestHeader("Accept", "application/json");

      xhttp.send(JSON.stringify(data));
    } else {
      callback(null);
    }
  }
};