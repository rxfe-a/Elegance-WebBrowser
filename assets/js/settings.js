var userAgent = navigator.userAgent;
document.getElementById('ua').innerText += ' ' + userAgent;

function apply() {
    const settings = {
        Theme: document.getElementById('theeme').value,
        DefaultProxy: document.getElementById('ProxyType').value,
        showRecents: true,
        searchEngine: document.getElementById('searchengine').value,
        searchBackground: document.getElementById('Search_BG').value || 'assets/img/l-bg.png'
      };
      
      const settingsJSON = JSON.stringify(settings);
      localStorage.setItem('settings', settingsJSON);
      setTimeout(() => {
        refreshParent()
      }, 100);
}

const s_config = localStorage.getItem('settings');
const rsettings = JSON.parse(s_config);
const rtheme = rsettings.Theme;

if (rtheme == 'dark') {
  document.getElementById('CSS').href = 'assets/css/dark.css'
}

function refreshParent() {
  if (window.parent) {
      window.parent.location.reload();
  } else {
      console.error("Parent window not found");
  }
}