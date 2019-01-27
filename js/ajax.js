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
        $.ajax({
            url:'http://api.cocktailwaiter.xyz/v1/tags',
            type:'GET',
            data:{
            }
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
        $.ajax({
            url:'http://api.cocktailwaiter.xyz/v1/cocktails/random',
            type:'GET',
            data: {
                'seed': '1'
            }
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
        $(`<li>${tag.name}</li>`).appendTo(`#menu-content > ul`);
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
