var domain = 'http://api.cocktailwaiter.xyz';

$(() => {
    $(document).ready(() => {
        init();
    });
});

function init() {
    getTagList()
    .then((tags) => {
        this.drawTags(tags);
    });
    getCocktailList()
    .then((cocktails) => {
        this.drawCocktails(cocktails);
    });
}

/**
 *  APIサーバからタグ情報を取得
 */
function getTagList() {
    return new Promise((resolve, reject) => {
        let endpoint = '/v1/tags';
        let url = domain + endpoint;

        $.ajax({
            url: url,
            type: 'GET',
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
 *  APIサーバからカクテル情報を取得
 */
function getCocktailList(tags) {
    return new Promise((resolve, reject) => {
        let tags = this.getParam('tags');
        let endpoint = '/v1/cocktails';
        let url = domain + endpoint;
        $.ajax({
            url: url,
            type: 'GET',
            data: {
                seed: '1',
                tags: [tags]
            },
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
 *  タグを描画する
 */
function drawTags(tags) {
    $(`<ul>`).appendTo(`#menu-content`);
    $.each(tags, (index, tag) => {
        $(`<li><a href="?tags=${tag.name}">${tag.name}</a></li>`).appendTo(`#menu-content > ul`);
    });
    $(`</ul>`).appendTo(`#menu-content`);
}

/**
 *  カクテルを描画する
 */
function drawCocktails(cocktails) {
    $.each(cocktails, (index, cocktail) => {
        $(`<div class="card"><div class="cocktail-name">${cocktail.name}</div></div>`).appendTo(`#main-content`);
    });
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
