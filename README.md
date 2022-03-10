# ocr
画像の中の文字を認識するアプリ

**こちらから使うことができます**
https://eatdeliciousbanana.github.io/ocr/

<br>

<p align="center">
<img src="https://github.com/eatdeliciousbanana/ocr/blob/main/screenshots/image0.jpg?raw=true" width="50%">
</p>

<br>

## 概要
ブラウザ上で動作する文字認識アプリです。
カメラで撮影した写真や、PC・スマホに保存されている画像を選んで、その中に含まれる文字を読み取ることができます。

## 使用技術
- HTML
- CSS
- JavaScript
  - jQuery 3.6.0
  - Tesseract.js 2.1.0
  - opencv.js 4.5.5
- Bootstrap 5.0.2

## 使い方
### 1. 画像を選択する
読み取りたい文字が含まれる画像を選択してください。
カメラを使用してその場で写真を撮るか、あらかじめ保存してある画像の中から選択することができます。

#### カメラで写真を撮る
カメラボタンを押すと、カメラが起動します。
ブラウザからカメラへのアクセスを求められた場合は許可してください。
カメラ画面では、真ん中の青い撮影ボタンを押すと、写真を撮ることができます。
右の切替ボタンを押すと、前面カメラと背面カメラを切り替えることができます。

<br>

<p align="center">
<img src="https://github.com/eatdeliciousbanana/ocr/blob/main/screenshots/gif0.gif?raw=true" width="45%">
</p>

<br>

#### 保存してある画像を選択する
「写真を選択」ボタンを押すと、PCやスマホに保存されている画像を選択することができます。
選択された画像は、画面中央にプレビュー表示されます。

<br>

<p align="center">
<img src="https://github.com/eatdeliciousbanana/ocr/blob/main/screenshots/gif1.gif?raw=true" width="45%">
</p>

<br>

### 2. 言語を選択する
読み取りたい文字の言語を選択してください。日本語または英語を選択することができます。

<br>

<p align="center">
<img src="https://github.com/eatdeliciousbanana/ocr/blob/main/screenshots/gif2.gif?raw=true" width="45%">
</p>

<br>

### 3. 文字認識を実行する
「文字認識を実行」ボタンを押すと、画像から文字の読み取りが開始されます。
しばらくすると、画像から読み取られた文字が認識結果の欄に表示されます。
認識結果の下にあるボタンを押すと、読み取られた文字をクリップボードにコピーすることができます。

<br>

<p align="center">
<img src="https://github.com/eatdeliciousbanana/ocr/blob/main/screenshots/gif3.gif?raw=true" width="45%">
</p>
