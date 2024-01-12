  // Elegance Games //
  function gamewindow(gameURL, ProxyType, icon) {

      const AF = localStorage.getItem('settings');
  const BF = JSON.parse(AF);
  const CF = BF.DefaultProxy;
  let p_
    if (ProxyType == 'default') {
      p_ = CF
    } else {
      p_ = ProxyType
    }

    document.body.style = '';

  }