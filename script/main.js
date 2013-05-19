/*
 * @author phi_jp
 */


(function() {
    var $query    = function(q)  { return document.querySelector(q); }
    var $queryAll = function(q)  { return document.querySelectorAll(q); }

    window.onload = function() {
        init();
    };

    var init = function() {
        // ファイルリストを更新
        refreshFileList();
        // イベントをセットアップ
        setupEvent();

        /*
    var text_area = $id("main-ta");
    var file_list = $id("file-list");
    var file_header = $class("file-header");

    // save
    $id("save").addEventListener("click", function(){
        var file_name = $class("file-name").innerHTML;
        var value = text_area.value;
        // 保存
        file_name = tm.EditorHelper.save(file_name, value);
        // ファイルヘッダを更新
        refreshFileHader(file_name);
        // ファイルリストを更新
        refreshFileList();
    }, false);

    // save as
    $id("save-as").addEventListener("click", function(){
        var value = text_area.value;
        // 保存
        var file_name = tm.EditorHelper.saveAs(value);
        // ファイルヘッダを更新
        refreshFileHader(file_name);
        // ファイルリストを更新
        refreshFileList();
    }, false);
    
    // open
    $id("open").addEventListener("click", function(){
        var file_name = file_list.value;
        text_area.value = tm.EditorHelper.open(file_name);
        // ファイルヘッダを更新
        refreshFileHader(file_name);
    }, false);
    
    // clear
    $id("clear").addEventListener("click", function(){
        text_area.value = "";
    }, false);
    
    // delete
    $id("delete").addEventListener("click", function(){
        var file_name = file_list.value;
        tm.EditorHelper["delete"](file_name);
        // ファイルリストを更新
        refreshFileList();
    }, false);
    
    // rename
    $id("rename").addEventListener("click", function(){
        var file_name = file_list.value;
        tm.EditorHelper.rename(file_name);
        // ファイルリストを更新
        refreshFileList();
    }, false);
    
    // ファイルリストの項目をクリックしたときに open と同じ動作にする
    file_list.addEventListener("dblclick", function(){
        var file_name = file_list.value;
        if (file_name) {
            text_area.value = tm.EditorHelper.open(file_name);
            // ファイルヘッダを更新
            refreshFileHader(file_name);
        }
    }, false);
        */
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
            var editor = $query("#editor");
            editor.value = "";
        };

        $query("#editor").onkeydown = function(e) {
            if (e.metaKey == true && e.which == 83) {
                return false;
            }
        };
    };

    var saveFile = function(filename) {
        var editor = $query("#editor");

        if (filename == "Untitled") {
            // 名前を入力
            filename = prompt("file name: ", "");
            
            // 重複チェック
            if (localStorage[filename]) {
                var result = confirm("すでにそのファイル名のファイルは存在しています. 上書きしてもよろしいでしょうか？");
                if (result===false) return ;
            }
        }

        localStorage.setItem(filename, editor.value);

        // ファイルリストを更新
        refreshFileList();
    };

    var openFile = function(filename) {
        var editor = $query("#editor");
        editor.value = localStorage.getItem(filename);

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





