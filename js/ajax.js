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
    $.ajax({
        url:'http://localhost:8000/api/v1/tag_category',
        type:'GET',
        data:{
        }
    })
    .done((data) => {
        $.each(data, function(index, tag_category) {
            $(`
                <li id="tag_category_id_${tag_category['id']}">
                    <a href="#" class="tit">${tag_category['name']}</a>
                    <ul id="tag_category_id_${tag_category['id']}_tags"></ul>
                </li>
            `).appendTo("#dropmenu");

            $.each(tag_category['tags'], function(index, tag) {
                $(`
                    <label>
                        <li>
                        <input type="checkbox" value="${tag['id']}">${tag['name']}
                        </li>
                    </label>
                `).appendTo(`#tag_category_id_${tag_category['id']}_tags`);
            });
        });
    })
    .fail( (data) => {
    })
    .always( (data) => {
    });
}

function addSearchTagName(tag) {
    tag_name = 'タグ名';
    let tag_list = String($('#tag_list').val());
    $('#tag_list').val(tag_list + tag_name + '\n');
}

function getCocktailList(tags) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url:'http://localhost:8000/api/v1/cocktail',
            type:'GET',
            data:{
            }
        })
        .done((data) => {
            resolve(data);
        })
        .fail( (data) => {
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
