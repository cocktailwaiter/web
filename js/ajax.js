var domain = 'https://api.cocktailwaiter.xyz';

$(() => {
    $(document).ready(() => {
        init();
    });
});

function init() {
    cocktail();
    popularTag();
    allTag();
}

function allTag() {
    getInfoByApi('/v1/tags').then((tags) => {
        this.drawAllTags(tags);
    });
}

function popularTag() {
    getInfoByApi('/v1/tags/popular').then((tags) => {
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
        $(`
            <div class="card">
            <div id="contents" class="card">
                <a href="https://ja.wikipedia.org/wiki/${cocktail.name}">
                <div class="cocktail-name">${cocktail.name}</div>
            </div>
        `).appendTo(`#main-content`);
    });
}

/**
 *  タグを描画する
 */
function drawPopularTags(tags) {
    $(`<ul>`).appendTo(`#popular-tag-view`);
    $.each(tags, (index, tag) => {
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

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
