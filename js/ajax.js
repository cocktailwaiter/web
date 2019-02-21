var domain = 'https://api.cocktailwaiter.xyz';

$(() => {
    $(document).ready(() => {
        init();
    });
});

function init() {
    cocktail();
    tag();
}

function tag() {
    getInfoByApi('/v1/tags').then((tags) => {
        this.drawTags(tags);
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

    getInfoByApi('/v1/cocktails', requestParams).then((cocktails) => {
        this.drawCocktails(cocktails);
    });
}

function getInfoByApi(endpoint, requestParams = {}) {
    return new Promise((resolve, reject) => {
        let url = domain + endpoint;

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
        $(`<div class="card"><div class="cocktail-name">${cocktail.name}</div></div>`).appendTo(`#main-content`);
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

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
