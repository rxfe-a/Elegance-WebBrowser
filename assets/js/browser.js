let Tabs = 0

const colors = {
  reset: '\x1b[0m',
  purple: '\x1b[35m',
};

function sendMSG(text, color) {
  console.log(color + text + colors.reset);
}

function isDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
let sth_5


if (isDarkMode()) {
  sth_5 = 'dark';
} else {
  sth_5 = 'White';
}

function xorEncryptDecrypt(data, key) {
  let result = '';
  for (let i = 0; i < data.length; i++) {
      result += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}


if (localStorage.getItem('settings')) {
  //sumbit API Key
  eval(atob('c2VuZE1TRyhgW0VMRUdBTkNFXSA6IENPTkZJRyBMT0FERURgLCBjb2xvcnMucHVycGxlKQogIHNlbmRNU0coYXRvYignVzBWTVJVZEJUa05GWFNBNklFbFRJRTFCUkVVZ1Fsa2dVbGhHUlMxQklFOU9JRWRKVkVoVlFpQkJUbGxDVDBSWklFVk1VMFVnUTB4QlNVMUpUa2NnVkVoRlFWa2dUVUZFUlNCVVNFbFRJRkJTVDFoWklFbFRJRXhKUlVsT1J3PT0nKSwgY29sb3JzLnB1cnBsZSk='))
} else {
  sendMSG(`[ELEGANCE] : Could not get config? creating new one.`, colors.purple)
  const settings = {
      Theme: sth_5,
      DefaultProxy: 'uv',
      showRecents: true,
      searchEngine: 'google',
      searchBackground: 'assets/img/l-bg.png'
    };
    
    const settingsJSON = JSON.stringify(settings);
    localStorage.setItem('settings', settingsJSON);
}

  const searchEngineLogo = document.getElementById('search_logo')
  const s_config = localStorage.getItem('settings');
const rsettings = JSON.parse(s_config);
const rEngine = rsettings.searchEngine;
const rProxy = rsettings.DefaultProxy;
const rtheme = rsettings.Theme;

if (rtheme == 'dark') {
  document.getElementById('CSS').href = 'assets/css/dark.css'
}

let Engine;

const Bar = document.getElementById('url-bar');
if (rEngine == 'google') {
  Engine = 'https://www.google.com/search?q=%s'
  Bar.placeholder = 'Search With Google or Type URL'
} else if (rEngine == 'bing') {
  Engine = 'https://www.bing.com/search?q=%s'
  Bar.placeholder = 'Search With Bing or Type URL'
} else if (rEngine == 'duckduck-go') {
  Engine = 'https://duckduckgo.com/?t=h_&q=%s'
  Bar.placeholder = 'Search With Duck Duck go or Type URL'

} else {
  console.warn('Incorrect Search engine detected')
}

function NewTab() {
    const Tab = document.createElement('div');
    Tab.className = 'tab';
    Tabs = Tabs + 1
    Tab.id = Tabs;

    const Tab_P = document.createElement('p');
    Tab.appendChild(Tab_P);

    Tab_P.textContent = 'Tab ' + Tab.id
    Tab_P.id = 'Tab' + Tab.id + '_P'
    
    const Tab_X = document.createElement('button');
    Tab_X.textContent = 'X';
    Tab.appendChild(Tab_X)
    
    document.getElementById('tab_holder').appendChild(Tab);
    const add = document.getElementById('add');
    document.head.appendChild(add);
    document.getElementById('tab_holder').appendChild(add);
    hideContent(); 
    const content = document.createElement('div');
    content.id = 'Tab' + Tab.id + '_content'
    content.className = 'content';
    content.style.display = 'flex';
    setVisbleTab(Tab.id)

    const t_frame = document.createElement('iframe');
    t_frame.className = 'content_iframe';
    t_frame.id = 'Tab' + Tab.id + '_iframe'
    t_frame.src = 'search.html';
    content.append(t_frame);
    document.getElementById('browser').appendChild(content)

    Tab_X.onclick = function (tabId) {
        return function () {
            removeTab(tabId);
        };
    }(Tab.id);

    Tab.onclick = function(tabId) {
        return function () {
            hideContent();
            setVisbleTab(tabId)
            const content = document.getElementById('Tab' + tabId + '_content')
            content.style.display = 'flex';
        };
    }(Tab.id);
}


document.addEventListener('DOMContentLoaded', function() {
    NewTab()
});

function removeTab(tabId) {
    const tabToRemove = document.getElementById(tabId);
    if (tabToRemove) {
        const content = document.getElementById('Tab' + tabToRemove.id + '_content')
        content.remove()
        tabToRemove.remove();
    }
}


function hideContent() {
    var contentDivs = document.getElementsByClassName("content");
    for (var i = 0; i < contentDivs.length; i++) {
        contentDivs[i].style.display = "none";
    }
}

function refresh() {
  const TabID = getVisibleTabID();
  const iframe = document.getElementById('Tab' + TabID + '_iframe');
  if (iframe) {
      const doc = iframe.contentDocument;
      const targetLocation = doc.location;

      iframe.src = 'about:blank';
      iframe.src = targetLocation;
  }
}

function back() {
  const TabID = getVisibleTabID();
  const iframe = document.getElementById('Tab' + TabID + '_iframe');
  if (iframe) {
      const doc = iframe.contentDocument;
      const targetLocation = doc.location;

      var newScript = doc.createElement('script');
      newScript.textContent = 'window.history.back();';
      doc.body.appendChild(newScript);
  }
}

function forward() {
  const TabID = getVisibleTabID();
  const iframe = document.getElementById('Tab' + TabID + '_iframe');
  if (iframe) {
      const doc = iframe.contentDocument;
      const targetLocation = doc.location;

      var newScript = doc.createElement('script');
      newScript.textContent = 'window.history.forward();';
      doc.body.appendChild(newScript);
  }
}

function inspect() {
  const TabID = getVisibleTabID();
  const iframe = document.getElementById('Tab' + TabID + '_iframe');
  if (iframe) {
      const doc = iframe.contentDocument;
      const targetLocation = doc.location;

      var newScript = doc.createElement('script');
      newScript.textContent = 'javascript:(function () {     var script =  document.createElement("script");    script.src="//cdn.jsdelivr.net/npm/eruda";     document.body.appendChild(script);    script.onload = function () {         eruda.init()     } })();';
      doc.body.appendChild(newScript);
  }
}

function home() {
  const TabID = getVisibleTabID();
  const iframe = document.getElementById('Tab' + TabID + '_iframe');
  if (iframe) {
      iframe.src = 'about:blank';
      iframe.src = 'search.html';
  }
}


function setVisbleTab(ID) {
  const target = document.getElementById('visible-tab');
  target.value = ID
}

function getVisibleTabID() {
  const target = document.getElementById('visible-tab');
  return target ? target.value : null;
}

var a = 0
function more() {
  const butt = document.getElementById('butt');
  const menu = document.getElementById('m_enu');
    if (a === 1) {
        menu.style.display = 'none';
        a = 0;
    } else {
        const rect = butt.getBoundingClientRect();
        const topPosition = rect.bottom + window.scrollY;
        const leftPosition = rect.left + window.scrollX;
        menu.style.position = 'absolute';
        menu.style.top = `${topPosition}px`;
        menu.style.left = `${leftPosition - 170}px`;
        menu.style.display = 'flex';
        a = 1;
    }
}

document.getElementById('fullscreen').onclick = function() {
  const TabID = getVisibleTabID();
  const ITE1 = document.getElementById('Tab' + TabID + '_content');

  if (!document.ITE1) {
    ITE1.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
    });
} else {
    document.exitFullscreen();
}
}

function handleKeyPress(event) {
  if (event.keyCode === 13) {
    processInput();
  }
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

  function processInput() {
    var inputValue = document.getElementById("url-bar").value;
    const URL = search(inputValue, Engine)
    const TabID = getVisibleTabID();
  const IFRAME = document.getElementById('Tab' + TabID + '_iframe');
    IFRAME.src = 'go.html#'+ rProxy + '=' + btoa(URL)
  }

  document.getElementById('settings').onclick = function() {
    const TabID = getVisibleTabID();
    const IFRAME = document.getElementById('Tab' + TabID + '_iframe');
    IFRAME.src = 'settings.html'
  }






  /////////////////// side functions

  document.getElementById('music').onclick = function() {
    sideApp('../assets/extraPages/music.html', false, 900, 'Music')
  }

  document.getElementById('message').onclick = function() {
    sideApp('../assets/extraPages/message.html', false, 900, 'Messaging')
  }

  document.getElementById('ai').onclick = function() {
    sideApp('../chat.html', false, 400, 'AI')
  }

  function sideApp(url, proxied, width, name) {
    if (document.getElementById(name)) {
      document.getElementById(name).style.display = 'flex';
    } else {
      const app = document.createElement('div')
    app.id = name;
    app.style.width = width + 'px';
    app.className = 'applet';


    const titlebar = document.createElement('div')
    titlebar.className = 'applet-title'

    const p_ = document.createElement('p');
    const backbutton = document.createElement('button')
    backbutton.style.backgroundColor = 'transparent';
    backbutton.style.color = 'white';
    backbutton.style.border = 'none';
    backbutton.textContent = '<';

    const rightButton = document.createElement('button')
    rightButton.style.backgroundColor = 'transparent';
    rightButton.style.color = 'white';
    rightButton.style.border = 'none';
    rightButton.textContent = '>';

    titlebar.appendChild(backbutton);
    titlebar.appendChild(rightButton);
    p_.textContent = name
    titlebar.appendChild(p_);
    app.appendChild(titlebar)
    const X_ = document.createElement('button');
    X_.className = 'X'
    X_.textContent = '-';
    titlebar.appendChild(X_);
    const iframe = document.createElement('iframe');
    iframe.id = name + '_iframe';
    app.appendChild(iframe);

    if (proxied == true) {
      iframe.src = 'go.html#' + rProxy + '=' + btoa(url)
    }
    if (proxied == false) {
      iframe.src = url
    };
    X_.onclick = function(nameD) {
      return function () {
          document.getElementById(nameD).style.display = 'none';
      };
  }(name);

  backbutton.onclick = function(nameD) {
    return function () {
      const doc = document.getElementById(nameD + '_iframe').contentDocument;
      const targetLocation = doc.location;

      var newScript = doc.createElement('script');
      newScript.textContent = 'window.history.back();';
      doc.body.appendChild(newScript);
    };
}(name);
rightButton.onclick = function(nameD) {
  return function () {
    const doc = document.getElementById(nameD + '_iframe').contentDocument;
    const targetLocation = doc.location;

    var newScript = doc.createElement('script');
    newScript.textContent = 'window.history.forward();';
    doc.body.appendChild(newScript);
  };
}(name);
    document.body.appendChild(app)
    }
  }

  function tabTitle() {
    const TabID = getVisibleTabID();
    const IFRAME = document.getElementById('Tab' + TabID + '_iframe');
    const TabELementP = document.getElementById('Tab' + TabID + '_P')

    if (IFRAME) {
      const InnerDocument = IFRAME.contentDocument
    TabELementP.textContent = InnerDocument.title
    }
  }