$(() => {
    $('#cocktail-detail-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var cocktail_id = button.data('cocktail');
        var modal = $(this);


        getInfoByApi('/v1/cocktails/' + cocktail_id).then((cocktails) => {
            console.log(cocktails)
            modal.find('.modal-title').text(cocktails.name);

            let tags = cocktails.tags;
            $.each(tags, (index, tag) => {
                $(`<span><a href="?tags=${tag.name}" class="tag button">${tag.name}</a></span>`).appendTo(`#cocktail-tag`);
            });
        });
    }).on('hidden.bs.modal', function (event) {
        $("#cocktail-tag").empty();
    });

    $(".cocktail-tag-modal-open").click(() => {
        // body内の最後に<div id="modal-bg"></div>を挿入
        $("body").append('<div id="modal-main"></div>');
        $("body").append('<div id="modal-bg"></div>');

        // 画面中央を計算する関数を実行
        modalResize();

        // モーダルウィンドウを表示
        $("#modal-bg, #modal-main").fadeIn("slow");

        // 画面のどこかをクリックしたらモーダルを閉じる
        $("#modal-bg, #modal-main").click(() => {
            $("#modal-main,#modal-bg").fadeOut("fast", () => {
                // 挿入した<div id="modal-bg"></div>を削除
                $('#modalResize').remove();
            });
        });

        // 画面の左上からmodal-mainの横幅・高さを引き、その値を2で割ると
        // 画面中央の位置が計算できます
        $(window).resize(modalResize);

        function modalResize() {
            var w = $(window).width();
            var h = $(window).height();
            var cw = $("#modal-main").outerWidth();
            var ch = $("#modal-main").outerHeight();

            // 取得した値をcssに追加する
            $("#modal-main").css({
                "left": ((w - cw) / 2) + "px",
                "top": ((h - ch) / 2) + "px"
            });
        }
    });

    $(".all-tag-modal-open").click(() => {
        // body内の最後に<div id="modal-bg"></div>を挿入
        $("body").append('<div id="modal-main"></div>');
        $("body").append('<div id="modal-bg"></div>');

        // 画面中央を計算する関数を実行
        modalResize();

        // モーダルウィンドウを表示
        $("#modal-bg, #modal-main").fadeIn("fast");

        // 画面のどこかをクリックしたらモーダルを閉じる
        $("#modal-bg, #modal-main").click(() => {
            $("#modal-main,#modal-bg").fadeOut("fast", () => {
                // 挿入した<div id="modal-bg"></div>を削除
                $('#modalResize').remove();
            });
        });

        // 画面の左上からmodal-mainの横幅・高さを引き、その値を2で割ると
        // 画面中央の位置が計算できます
        $(window).resize(modalResize);

        function modalResize() {
            var w = $(window).width();
            var h = $(window).height();
            var cw = $("#modal-main").outerWidth();
            var ch = $("#modal-main").outerHeight();

            // 取得した値をcssに追加する
            $("#modal-main").css({
                "left": ((w - cw) / 2) + "px",
                "top": ((h - ch) / 2) + "px"
            });
        }
    });
});
