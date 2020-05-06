const COCKTAIL_TAG_COLOR_ID = 3;
const SESSION_KEY_NAME = 'session'
const DOMAIN = 'http://api.cocktailwaiter.xyz';

$(() => {
    $(document).ready(() => {
        init();
    });
});

function init() {
    if (navigator.cookieEnabled) {
        if (!existsSession()) {
            setSession(generateRandomString(64))
        }
    }

    cocktail();
    popularTag();
    allTag();
}

function existsSession() {
    return existsCookie(SESSION_KEY_NAME)
}

function setSession(sessionValue) {
    document.cookie = SESSION_KEY_NAME + "=" + sessionValue
}

function generateRandomString(len) {
    return btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(len)))).substring(0, len)
}

function existsCookie(targetCookieKey) {
    const cookies = document.cookie;
    const cookiesArray = cookies.split(';');
    let isExists = false

    for (let c of cookiesArray) {
        let cArray = c.split('=');
        if (cArray[0] == targetCookieKey) {
            isExists = true
        }
    }

    return isExists
}

function getSession() {
    const cookies = document.cookie;
    const cookiesArray = cookies.split(';');
    let session = null

    for (let c of cookiesArray) {
        let cArray = c.split('=');
        if (cArray[0] == SESSION_KEY_NAME) {
            session = cArray[1]
        }
    }

    return session
}


function allTag() {
    getInfoByApi('/v1/tags').then((tags) => {
        this.drawAllTags(tags);
    });
}

function popularTag() {
    getInfoByApi('/v1/tags').then((tags) => {
        this.drawPopularTags(tags);
    });
}

function cocktail() {
    let tags = this.getParam('tags');
    let requestParams = {};

    if (tags != null) {
        requestParams = {
            seed: 1,
            tags: [this.getParam('tags')]
        };
    }

    getInfoByApi('/v1/cocktails/random', requestParams).then((cocktails) => {
        this.drawCocktails(cocktails);
    });
}

function getInfoByApi(endpoint, requestParams = {}) {
    return new Promise((resolve, reject) => {
        let url = DOMAIN + endpoint;
        requestParams['session'] = getSession()

        $.ajax({
            url: url,
            type: 'GET',
            data: requestParams,
        })
            .done((request) => {
                resolve(request.data);
            })
            .fail((data) => {
                reject('error');
            });
    });
}

/**
 *  カクテルを描画する
 */
function drawCocktails(cocktails) {
    $.each(cocktails, (index, cocktail) => {
        let cocktail_img_path = this.getImagePath(cocktail);
        $(`
            <div id="contents" class="card" style="background-color: transparent;">
                <div class="cocktail-name"
                    data-toggle="modal" data-target="#cocktail-detail-modal"
                    data-recipient="${cocktail.name}"
                    data-cocktail="${cocktail.id}"
                    data-tag="${cocktail.tag}"
                >
                    <img src="${cocktail_img_path}">
                    <span>${cocktail.name}</span>
                </div>
            </div>
        `).appendTo(`#main-content`);
    });
}

/**
 *  タグを描画する
 */
function drawPopularTags(tags) {
    $(`<ul>`).appendTo(`#popular-tag-view`);
    $.each(tags.slice(1, 15), (index, tag) => {
        $(`<li><a href="?tags=${tag.name}" class="tag button">${tag.name}</a></li>`).appendTo(`#popular-tag-view > ul`);
    });
    $(`</ul>`).appendTo(`#popular-tag-view`);
}

function drawAllTags(tags) {
    $(`<div>`).appendTo(`#modal-main`);
    $.each(tags, (index, tag) => {
        $(`<span><a href="?tags=${tag.name}" class="tag-view button">${tag.name}</a></span>`).appendTo(`#modal-main > div`);
    });
    $(`</div>`).appendTo(`#modal-main`);
}

function getImagePath(cocktail) {
    let baseImagePath = './img';
    let imageName = 'cocktail-color-unknown.png';
    if (!!cocktail.tags) {
        $.each(cocktail.tags, (index, tag) => {
            if (!tag.tag_category) {
                return true; // continue
            }

            let category = tag.tag_category;
            if (category.id === COCKTAIL_TAG_COLOR_ID) {
                if ((/緑|黄緑/g).test(tag.name)) {
                    imageName = 'cocktail-color-green.png';
                } else if ((/青|空/g).test(tag.name)) {
                    imageName = 'cocktail-color-blue.png';
                } else if ((/黒|茶|琥珀/g).test(tag.name)) {
                    imageName = 'cocktail-color-black.png';
                } else if ((/赤|紅|ピンク|桃/g).test(tag.name)) {
                    imageName = 'cocktail-color-red.png';
                } else if ((/オレンジ|黄|ブラウン|橙/g).test(tag.name)) {
                    imageName = 'cocktail-color-yellow.png';
                } else if ((/透明|白|無/g).test(tag.name)) {
                    imageName = 'cocktail-color-transparent.png';
                }
            }
        });
    }

    return baseImagePath + '/' + imageName;
}

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

