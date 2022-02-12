$(function () {

    const video = document.getElementById('video');
    let camWidth, camHeight, CONSTRAINTS;
    let curSTREAM = null;  // 現在のストリーム


    // カメラボタンが押されたときの処理
    $('#btncamera').on('click', function () {
        window.setTimeout(function () {

            // カメラの幅と高さ
            let $video = $('#video');
            $video.show();
            camWidth = parseInt($video.css('width'));
            camHeight = parseInt($video.css('height'));
            $video.css('width', camWidth + 'px');
            $video.css('height', camHeight + 'px');
            video.width = camWidth;
            video.height = camHeight;
            $video.hide();

            // カメラの設定
            CONSTRAINTS = {
                audio: false,
                video: {
                    width: camWidth,
                    height: camHeight,
                    facingMode: 'environment'  // どのカメラを利用するか
                    // facingModeには以下のいずれかの値を入れる
                    //   facingMode: "user"         // フロントカメラを利用する
                    //   facingMode: "environment"  // リアカメラを利用する
                }
            };

            // カメラと接続
            navigator.mediaDevices.getUserMedia(CONSTRAINTS)
                .then(stream => {
                    curSTREAM = stream;
                    video.srcObject = stream;
                    video.play();
                    $('#camloading').hide();
                    $('#video').show();
                })
                .catch((err) => {
                    alert('カメラへのアクセスを許可してください');
                });
        }, 1000);
    });


    // 閉じるボタンが押されたときの処理
    $('.camclose').each(function () {
        $(this).on('click', function () {
            $('#video').hide();
            $('#camloading').show();
            if (curSTREAM !== null) {
                curSTREAM.getVideoTracks().forEach((camera) => {
                    camera.stop();
                });
            }
        });
    });


    // 切替ボタンが押されたときの処理
    $('#camchange').on('click', function () {
        $('#video').hide();
        $('#camloading').show();
        if (curSTREAM !== null) {
            curSTREAM.getVideoTracks().forEach((camera) => {
                camera.stop();
            });
        }
        if (CONSTRAINTS.video.facingMode === 'environment') {
            CONSTRAINTS.video.facingMode = 'user';
        } else {
            CONSTRAINTS.video.facingMode = 'environment';
        }
        navigator.mediaDevices.getUserMedia(CONSTRAINTS)
            .then(stream => {
                curSTREAM = stream;
                video.srcObject = stream;
                video.play();
                $('#camloading').hide();
                $('#video').show();
            })
            .catch((err) => {
                alert('カメラへのアクセスを許可してください');
            });
    });


    // 撮影ボタンが押されたときの処理
    $('#camshot').on('click', function () {
        let snap = new cv.Mat(camHeight, camWidth, cv.CV_8UC4);
        const cap = new cv.VideoCapture(video);
        cap.read(snap);
        cv.imshow('canvas', snap);
        snap.delete();
        $('#video').hide();
        $('#camloading').show();
        $('#imageSrc').hide();
        $('#canvas').show();
        window.setTimeout(function () {
            $('.camclose:first').trigger('click');
        }, 500);
    });


    let selectedFile;  // 選択された写真

    // 写真が選択されたときの処理
    $('#fileInput').on('change', function () {
        const file = $(this).prop('files')[0];
        if (file === undefined) {
            return;
        } else if (!file.type.match(/^image\/(png|jpeg|bmp)$/)) {
            alert('画像ファイルを選択してください');
            return;
        }
        selectedFile = file;
        let url = URL.createObjectURL(selectedFile);
        $('#canvas').hide();
        $('#imageSrc').prop('src', url);
        $('#imageSrc').show();
    });


    // 言語が選択されたときの処理
    let lang = 'jpn';
    $('#btnradio1').on('change', function () {
        lang = 'jpn';
    });
    $('#btnradio2').on('change', function () {
        lang = 'eng';
    });


    // 実行ボタンが押されたときの処理
    $('#btnstart').on('click', function () {
        let img;
        if ($('#canvas').css('display') !== 'none') {
            img = document.getElementById('canvas');
        } else if ($('#imageSrc').css('display') !== 'none') {
            img = selectedFile;
        } else {
            alert('文字認識したい画像を選択してください');
            return;
        }
        $('#result').val('');
        $('#btnstart').hide();
        $('#btnloading').show();
        Tesseract.recognize(img, lang, { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            $('#result').val(text);
            $('#btnloading').hide();
            $('#btnstart').show();
        });
    });


    // コピーボタンが押されたときの処理
    $('#btncopy').on('click', function () {
        document.getElementById('result').select();
        document.execCommand('copy');
        $('#btncopy').text('　　コピーしました　　　');
        window.setTimeout(function () {
            $('#btncopy').text('結果をクリップボードにコピー');
        }, 2000);
    });
});