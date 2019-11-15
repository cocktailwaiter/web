const cocktail_tag_color_id = 3;
var domain = 'http://api.cocktailwaiter.xyz';

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

    getInfoByApi('/v1/cocktails/random', requestParams).then((cocktails) => {
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

function getImagePath(cocktail) {
    let baseImagePath = './img';
    let imageName = 'cocktail-color-unknown.png';
    if (!!cocktail.tags) {
        $.each(cocktail.tags, (index, tag) => {
            if (!tag.tag_category) {
                return true; // continue
            }

            let category = tag.tag_category;
            if (category.id === cocktail_tag_color_id) {
                switch (tag.name) {
                    case '緑':
                        imageName = 'cocktail-color-green.png';
                        break;
                    case '青':
                        imageName = 'cocktail-color-blue.png';
                        break;
                    case '黒':
                        imageName = 'cocktail-color-black.png';
                        break;
                    case '赤':
                        imageName = 'cocktail-color-red.png';
                        break;
                    case '透明':
                    case '白い':
                    case '白':
                        imageName = 'cocktail-color-transparent.png';
                        break;
                    case 'オレンジ':
                    case '黄色':
                    case '黄':
                        imageName = 'cocktail-color-yellow.png';
                        break;
                    default:
                        break;
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
