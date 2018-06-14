var tag_list = [];
$(() => {
    $(document).ready(() => {
        init();
    });

    $('#fetch').on('click', () => {
        addSearchTagName();
        getCocktailList()
        .then((cocktail_list) => {
            return proposalCocktail(cocktail_list);
        });
    });
});

function init() {
    loadTagGroup();
}

/*
 *  APIサーバからタグ・グループを取得し描画
 */
function loadTagGroup() {
    fetchTagGroupList()
    .then((tag_group_list) => {
        this.drawTagGroup(tag_group_list);
    });
}

/*
 *  タグ・グループを取得
 */
function fetchTagGroupList() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url:'https://cocktailwaiter-official.appspot.com/tag-group',
            type:'GET',
            data:{
            }
        })
        .done((tag_group_list) => {
            resolve(JSON.parse(tag_group_list));
        });
    });
}

/*
 *  タグ・グループを描画する
 */
function drawTagGroup(tag_group_list) {
    $.each(tag_group_list, (index, tag_group) => {
        // タグ・カテゴリの描画
        let tag_category = tag_group;
        $(`
            <li id="tag_category_id_${tag_category['id']}">
                <a href="#" class="tit">${tag_category['name']}</a>
                <ul id="tag_category_id_${tag_category['id']}_tags"></ul>
            </li>
        `).appendTo("#dropmenu");

        // タグ・カテゴリに関連するタグの描画
        $.each(tag_group['tags'], (index, tag) => {
            $(`
                <label id="tag_id_${tag['id']}">
                    <li>
                    <input type="checkbox" value="${tag['id']}">${tag['name']}
                    </li>
                </label>
            `).appendTo(`#tag_category_id_${tag_category['id']}_tags`);
        });
    });
}

/*
 *  選択した検索用のタグを追加
 */
function addSearchTagName(tag) {
    tag_name = 'タグ名';
    tag_list = String($('#tag_list').val());
    $('#tag_list').val(tag_list + tag_name + '\n');
}

/*
 *  APIサーバからカクテルを取得
 */
function getCocktailList(tags) {
    return new Promise((resolve, reject) => {
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

/*
 *  提案するカクテルを描画
 */
function proposalCocktail(cocktail_list) {
    let proposal_cocktail_number = 0;
    if (!!cocktail_list) {
        let cocktail_name = cocktail_list[proposal_cocktail_number]['name'];
        $('#proposal_cocktail_name').text(cocktail_name);
    }
}
