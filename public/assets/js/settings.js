const i = b;
(function (c, d) {
    const h = b;
    const e = c();
    while (!![]) {
        try {
            const f = -parseInt(h(0x11c)) / 0x1 + parseInt(h(0x107)) / 0x2 + parseInt(h(0x11a)) / 0x3 * (-parseInt(h(0x119)) / 0x4) + -parseInt(h(0x116)) / 0x5 + -parseInt(h(0x10b)) / 0x6 * (parseInt(h(0x109)) / 0x7) + parseInt(h(0x11e)) / 0x8 + parseInt(h(0x114)) / 0x9;
            if (f === d) {
                break;
            } else {
                e['push'](e['shift']());
            }
        } catch (g) {
            e['push'](e['shift']());
        }
    }
}(a, 0x5ea85));
var userAgent = navigator[i(0x118)];
document[i(0x112)]('ua')[i(0x113)] += '\x20' + userAgent;
function apply() {
    const j = i;
    const c = {
        'Theme': document[j(0x112)]('theeme')[j(0x10d)],
        'DefaultProxy': document[j(0x112)]('ProxyType')['value'],
        'showRecents': !![],
        'searchEngine': document[j(0x112)](j(0x108))['value'],
        'searchBackground': document['getElementById'](j(0x11b))[j(0x10d)] || 'assets/img/l-bg.png'
    };
    const d = JSON[j(0x110)](c);
    localStorage['setItem'](j(0x10f), d);
    setTimeout(() => {
        refreshParent();
    }, 0x64);
}
function b(c, d) {
    const e = a();
    b = function (f, g) {
        f = f - 0x107;
        let h = e[f];
        return h;
    };
    return b(c, d);
}
function a() {
    const l = [
        'parent',
        '1824376XgztbA',
        '1433888dSefhj',
        'searchengine',
        '1984297FQSVac',
        'dark',
        '6qGksgA',
        'getItem',
        'value',
        'CSS',
        'settings',
        'stringify',
        'Parent\x20window\x20not\x20found',
        'getElementById',
        'innerText',
        '5914908kGzgBw',
        'parse',
        '509080CnaMUw',
        'error',
        'userAgent',
        '33404Ndpaml',
        '189ZZOATO',
        'Search_BG',
        '303086VIpDrA'
    ];
    a = function () {
        return l;
    };
    return a();
}
const s_config = localStorage[i(0x10c)](i(0x10f));
const rsettings = JSON[i(0x115)](s_config);
const rtheme = rsettings['Theme'];
if (rtheme == i(0x10a)) {
    document[i(0x112)](i(0x10e))['href'] = 'assets/css/dark.css';
}
function refreshParent() {
    const k = i;
    if (window['parent']) {
        window[k(0x11d)]['location']['reload']();
    } else {
        console[k(0x117)](k(0x111));
    }
}