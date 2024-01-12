const Bar = document.getElementById("search_bar")
function handleKeyPress(event) {
    if (event.keyCode === 13) {
      processInput();
    }
  }

const searchEngineLogo = document.getElementById('search_logo')
  const Settings_Config = localStorage.getItem('settings');
const retrievedSettings = JSON.parse(Settings_Config);
const retrievedEngine = retrievedSettings.searchEngine;
const retrievedProxy = retrievedSettings.DefaultProxy;
let Engine;
if (retrievedEngine == 'google') {
  Engine = 'https://www.google.com/search?q=%s'
  Bar.placeholder = 'Search With Google or Type URL'
  searchEngineLogo.src = 'assets/img/google.png'
} else if (retrievedEngine == 'bing') {
  Engine = 'https://www.bing.com/search?q=%s'
  searchEngineLogo.src = 'assets/img/bing.png'
  Bar.placeholder = 'Search With Bing or Type URL'
} else if (retrievedEngine == 'duckduck-go') {
  Engine = 'https://duckduckgo.com/?t=h_&q=%s'
  searchEngineLogo.src = 'assets/img/duckduck-go.png'
  Bar.placeholder = 'Search With Duck Duck go or Type URL'

} else {
  console.warn('Incorrect Search engine detected')
}


  function processInput() {
    var inputValue = document.getElementById("search_bar").value;
    const URL = search(inputValue, Engine)
    window.location.href = 'go.html#'+ retrievedProxy + '=' + btoa(URL)
  }




  function search(input, template) {
try {
  return new URL(input).toString();
} catch (err) {
}

try {
  const url = new URL(`http://${input}`);
  if (url.hostname.includes(".")) return url.toString();
} catch (err) {
}

return template.replace("%s", encodeURIComponent(input));
}

function AB_OS() {
  var inputValue = document.getElementById("inputField").value;
    const URL = search(inputValue, Engine)
    Open_AB('go.html#'+ retrievedProxy + '=' + btoa(URL))
}

function DR_OS() {
  var inputValue = document.getElementById("inputField").value;
    const URL = search(inputValue, Engine)
    window.open('go.html#'+ retrievedProxy + '=' + btoa(URL))
}



function Open_AB(url) {
  const popup = open("about:blank", "_blank");
    if (!popup || popup.closed) {
      alert("Please allow popups and redirects.");
    } else {
      const doc = popup.document;
      const iframe = doc.createElement("iframe");
      const style = iframe.style;
      const link = doc.createElement("link");
      const name = localStorage.getItem("name") || "My Drive - Google Drive";
      const icon =
        localStorage.getItem("icon") ||
        "https://ssl.gstatic.com/assets/media/branding/product/1x/drive_2020q4_32dp.png";
      doc.title = name;
      link.rel = "icon";
      link.href = url;
      iframe.src = url;
      style.position = "fixed";
      style.top = style.bottom = style.left = style.right = 0;
      style.border = style.outline = "none";
      style.width = style.height = "100%";
      doc.head.appendChild(link);
      doc.body.appendChild(iframe);
}}

function Direct(url) {
  const popup = open("about:blank", "_blank");
    if (!popup || popup.closed) {
      alert("Please allow popups and redirects.");
    } else {
      const doc = popup.document;
      const style = iframe.style;
      const bg = doc.createElement('script');
      bg.innerHTML = 'window.location.href="' + url + '";' 
      doc.body.appendChild(bg);
      const bigText = doc.createElement('h1');
      const link = doc.createElement("link");
      bigText.textContent = 'Loading...'
      const name = localStorage.getItem("name") || "My Drive - Google Drive";
      const icon =
        localStorage.getItem("icon") ||
        "https://ssl.gstatic.com/assets/media/branding/product/1x/drive_2020q4_32dp.png";
      doc.title = name;
      link.rel = "icon";
      style.position = "fixed";
      style.top = style.bottom = style.left = style.right = 0;
      style.border = style.outline = "none";
      style.width = style.height = "100%";
      doc.head.appendChild(link);
      doc.body.append(bigText);
}}



const s_config = localStorage.getItem('settings');
const rsettings = JSON.parse(s_config);
const rtheme = rsettings.Theme;
const rbg = rsettings.searchBackground;

if (rtheme == 'dark') {
  document.getElementById('search_bar').style.color = 'white';

  if (rbg == 'assets/img/l-bg.png') {
    document.body.style.backgroundImage = 'url("assets/img/w11.jpg")'
  } else {
    document.body.style.backgroundImage = 'url("' + rbg + '")'
  }
  document.getElementById('bar2').style.backgroundColor = 'rgb(36, 36, 36)';
  document.getElementById('bar2').style.color = 'white';
}

document.getElementById('opt').onclick = function() {
  var optionExtra = document.getElementById('option-extra');
  if (optionExtra.style.display === 'flex') {
    optionExtra.style.display = 'none';
  } else {
    optionExtra.style.display = 'flex';
  }
}


document.getElementById('settings').onclick = function() {
  window.location.href = 'settings.html'
}

document.getElementById('games').onclick = function() {
  document.getElementById('option-extra').innerHTML = '';
  fetch('../assets/json/games.json')
        .then(response => response.json())
        .then(data => {
            const jsonContainer = document.getElementById('option-extra');
            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'boxy-toxy'
                div.innerHTML = `<img src="${item.icon}">
                <p>${item.name}</p>`;
                const btn = document.createElement('button');
                div.appendChild(btn)
                btn.textContent = 'go';
                jsonContainer.appendChild(div);

                (function() {
                  btn.onclick = function() {
                      go(item.icon, item.name, item.proxy, item.url);
                  };
              })();
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

function go(ico, nombre, proxy, url) {
  const PR = (proxy === 'default') ? JSON.parse(localStorage.getItem('settings')).DefaultProxy : proxy;
  const b2 = `${PR}=${btoa(url)}`;
  
  const config = {
    fragment: b2,
    name: nombre,
    iconurl: ico
  };
  
console.log(config)
  sessionStorage.setItem('fragment', JSON.stringify(config));

  setTimeout(() => {
   window.location.href = './com.html';
  }, 600);
}
