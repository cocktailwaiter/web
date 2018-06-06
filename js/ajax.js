$(function(){
    $(document).ready(function(){

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
    });

    $('#fetch').on('click',function(){
//     });
//     $('#tag_list').change(function(){

        promise
            .then(getCocktailList)
            .then(proposalCocktail);
    });

    function addTag() {
        let tag_list = String($('#tag_list').val());
        $('#tag_list').val(tag_list + '名前' + '\n');
    }

    function getCocktailList() {
console.log("getCocktailList");
        let proposal_cocktail_number = 0;

        $.ajax({
            url:'http://localhost:8000/api/v1/cocktail',
            type:'GET',
            data:{
            }
        })
        .done((data) => {
            return data;
        })
        .fail( (data) => {
        })
        .always( (data) => {
        });

    }
});

function proposalCocktail(cocktail_list) {
console.log("proposalCocktail");
        if (!!cocktail_list) {
            let cocktail_name = cocktail_list[proposal_cocktail_number]['name'];
            $('#proposal_cocktail_name').text(cocktail_name);
        }
}

var promise = new Promise(
    function(resolve, reject) {
        setTimeout(
            function() {
                resolve({"message": "success"});
            }, 3000
        );
    }
);