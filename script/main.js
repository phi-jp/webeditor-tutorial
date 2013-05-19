/*
 * @author phi_jp
 */


(function() {
    var $query    = function(q)  { return document.querySelector(q); }
    var $queryAll = function(q)  { return document.querySelectorAll(q); }

    var editor = null;

    window.onload = function() {
        init();
    };

    var init = function() {
        editor = ace.edit("editor");
        editor.setTheme("ace/theme/solarized_light");
        editor.getSession().setMode("ace/mode/javascript");
        
        // ファイルリストを更新
        refreshFileList();
        // イベントをセットアップ
        setupEvent();
    };

    var refreshFileList = function() {
        var fileList = $query("#file-list");

        fileList.innerHTML = "";

        for (var i=0; i<localStorage.length; ++i) {
            var key = localStorage.key(i);

            var option = document.createElement("option");
            option.setAttribute("value", key);
            option.innerHTML = key;
            fileList.appendChild(option);
        };

    };

    var setupEvent = function() {

        // rename
        $query("#edit-title").onclick = function() {
            var filename = prompt("file name: ", "");

            $query("#edit-title").innerHTML = filename;
        };

        $query("#file-list").ondblclick = function() {
            var fileList = $query("#file-list");
            openFile(fileList.value);
        };

        $query("#btn-open").onclick = function() {
            var fileList = $query("#file-list");
            openFile(fileList.value);
        };

        $query("#btn-delete").onclick = function() {
            var fileList = $query("#file-list");
            deleteFile(fileList.value);
        };

        $query("#btn-rename").onclick = function() {
            var fileList = $query("#file-list");
            renameFile(fileList.value);
        };

        // save
        $query("#btn-save").onclick = function() {
            var filename = $query("#edit-title").innerHTML;
            saveFile(filename);
        };

        // clear
        $query("#btn-clear").onclick = function() {
            editor.setValue("");
        };

        $query("#editor").onkeydown = function(e) {
            if (e.metaKey == true && e.which == 83) {
                return false;
            }
        };
    };

    var saveFile = function(filename) {
        if (filename == "Untitled") {
            // 名前を入力
            filename = prompt("file name: ", "");
            
            // 重複チェック
            if (localStorage[filename]) {
                var result = confirm("すでにそのファイル名のファイルは存在しています. 上書きしてもよろしいでしょうか？");
                if (result===false) return ;
            }
        }

        localStorage.setItem(filename, editor.getValue());

        // ファイルリストを更新
        refreshFileList();
    };

    var openFile = function(filename) {
        editor.setValue(localStorage.getItem(filename));

        $query("#edit-title").innerHTML = filename;
    };

    var renameFile = function(filename) {
        var value = localStorage.getItem(filename);
        var newFilename = prompt("file name: ", filename);

        if (localStorage[newFilename]) {
            var result = confirm("すでにそのファイル名のファイルは存在しています. 上書きしてもよろしいでしょうか？");
            if (result===false) return ;
        }

        localStorage.removeItem(filename);
        localStorage.setItem(newFilename, value);

        // ファイルリストを更新
        refreshFileList();
    };

    var deleteFile = function(filename) {
        var result = confirm("本当に削除しても良いですか？");

        if (result) {
            localStorage.removeItem(filename);
        }

        // ファイルリストを更新
        refreshFileList();
    };

})();





