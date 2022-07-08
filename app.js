let dataUrl = (dataurl) => `https://api.github.com/users/${dataurl}`;

fetch(dataUrl("fatihydrm"))
  .then((response) => {
    console.log(response);
    return response.text();
  })
  .then((data) => console.log(JSON.parse(data)));
