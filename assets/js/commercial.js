document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('namefr').textContent = JSON.parse(sessionStorage.getItem('fragment')).name
  document.getElementById('GameICO').src = JSON.parse(sessionStorage.getItem('fragment')).iconurl
    function rh(url) {
        document.getElementById('commercial_frame').src = 'go.html#rh=' + btoa(url)
        rewrite()
    }
    function uv(url) {
        document.getElementById('commercial_frame').src = 'go.html#uv=' + btoa(url)
        rewrite()
    }
    function uv2(url) {
        document.getElementById('commercial_frame').src = 'go.html#uv2=' + btoa(url)
        rewrite()
    };
    function dip(url) {
        document.getElementById('commercial_frame').src = 'go.html#dip=' + btoa(url)
        rewrite()
    }
    
    function dn(url) {
      document.getElementById('commercial_frame').src = 'go.html#dn=' + btoa(url)
      rewrite()
    }
    
    setTimeout(function() {
        var fragment = JSON.parse(sessionStorage.getItem('fragment')).fragment;
        var parts = fragment.split('=');
        var identifier = parts[0];
        var url = parts[1];
        switch (identifier) {
          case 'rh':
            rh(atob(url));
            break;
          case 'uv':
            uv(atob(url));
            break;
          case 'uv2':
            uv2(atob(url));
            break;
          case 'dip':
            dip(atob(url));
            break;
          case 'dn':
            dn(atob(url));
            break;
          default:
            console.error('Unknown fragment identifier: ' + identifier);
            break;
        }
      }, 500);
      
  });


  function rewrite() {
    sessionStorage.removeItem('fragment')
  }
