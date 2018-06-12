var tag_list = [];
$(function() {
    $(document).ready(function(){
        init();
    });

    $('#fetch').on('click',function(){
        addSearchTagName();
        getCocktailList()
            .then(function(cocktail_list) {
                return proposalCocktail(cocktail_list);
            });
    });
});

function init() {
    loadTagCategory();
}

function loadTagCategory() {
    fetchTagCategoryList()
        .then((tag_category_list) => {
            $.each(tag_category_list, (index, tag_category) => {
                $(`
                    <li id="tag_category_id_${tag_category['id']}">
                        <a href="#" class="tit">${tag_category['name']}</a>
                        <ul id="tag_category_id_${tag_category['id']}_tags"></ul>
                    </li>
                `).appendTo("#dropmenu");

                $.each(tag_category['tags'], (index, tag) => {
                    $(`
                        <label id="tag_id_${tag['id']}">
                            <li>
                            <input type="checkbox" value="${tag['id']}">${tag['name']}
                            </li>
                        </label>
                    `).appendTo(`#tag_category_id_${tag_category['id']}_tags`);
                });
            });
        });
}

function fetchTagCategoryList() {
    return new Promise((resolve, reject) => {
        // バックグラウンドからタグ・カテゴリを取得
        $.ajax({
            url:'https://cocktailwaiter-official.appspot.com/tag-group',
            type:'GET',
            data:{
            }
        })
        .done((tag_category_list) => {
            resolve(JSON.parse(tag_category_list));
        });
    });
}

function addSearchTagName(tag) {
    tag_name = 'タグ名';
    tag_list = String($('#tag_list').val());
    $('#tag_list').val(tag_list + tag_name + '\n');
}

function getCocktailList(tags) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url:'https://cocktailwaiter-official.appspot.com/cocktail',
            type:'GET',
            data:{
            }
        })
        .done((data) => {
            resolve(data);
        })
        .fail((data) => {
            reject('error');
        });
    });
}

function proposalCocktail(cocktail_list) {
    let proposal_cocktail_number = 0;
    if (!!cocktail_list) {
        let cocktail_name = cocktail_list[proposal_cocktail_number]['name'];
        $('#proposal_cocktail_name').text(cocktail_name);
    }
}
