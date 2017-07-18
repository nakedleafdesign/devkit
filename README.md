# nakedleafdeisgn develop kit
最終更新:2017.0624

-----

## 推奨開発環境

[![node](https://img.shields.io/badge/node-v6.11.0-green.svg "node v5.5.0")](https://nodejs.org/ja/)
[![npm](https://img.shields.io/badge/npm-v3.3.12-orange.svg "npm v3.3.12")](https://www.npmjs.com/)
[![ruby](https://img.shields.io/badge/ruby-v2.2.0-red.svg "ruby v2.2.0")](https://www.ruby-lang.org/ja/)
[![bundle](https://img.shields.io/badge/bundle-v1.13.7-yellow.svg "bundle v1.13.7")](http://railsdoc.com/references/bundle)  

-----

## 開発環境インストール手順	 

1. node_modulesをインストールする   
    `cd /src/`   
    `npm install --save-dev`  
     を行い開発に必要なnode_modulesをインストールする
       
2. bundleでファイルをインストール  
    `bundle install` を行い必要なファイルをインストールする  
    
3. 完了

### タスクの実行
`cd /src/` に移動、以下コマンドでタスクが実行されます

#### gulpコマンド一覧

以下のタスクは  
/src/glupfile.js  
に記述されています  

- `gulp scss` sassをcssにコンパイルします  
- `gulp js` jsを難読化、結合を行います  
- `gulp ejs` ejsをhtmlにコンパイルします
- `gulp html` htmlを出力します
- `gulp copy` /src/ 以下の必要ファイルを /dist/ ディレクトリにコピーをします
- `gulp hologram` スタイルガイドジェネレーター「hologram」を実行します。
- `gulp bs` ローカルサーバーを立ち上げます。このタスクは単一で使用することは少なく主に`gulp run`で使用します。
- `gulp bs-reload` ローカルサーバーをリロードします。このタスクは単一で使用することは少なく主に`gulp run`で使用します。
- `gulp clean` /dist/以下を削除します　　
- `gulp run` ローカルサーバーを立ち上げ、/src/ 以下のファイルを監視、ファイルに変更があった場合は上記の「scss,js,ejs,copy,hologram,bs,bs-reload」のタスクを実行します。ローカルサーバーのURLは`http://localhost:3000`となります。
- `gulp build` /dist/以下を削除し、ビルドします
  
### 注意事項

`gulp run`実行時に/src/にファイルを新規で追加をした場合、監視対象にならず、うまくコンパイルなどと言ったタスクが実行されないことがあります。  
その場合は`control + C`でタスクを終了させ、再度`gulp run`コマンドを実行してください。

----

## コーディングマナー
- メンテナンス性、効率を意識したコーディング
- 拡張性、再利用性、柔軟性、ルールを持たせる
- ファイル、モジュール、パーツなどはできるだけ共通化させ、整合性を持たせる
- 要素の追加・削除のし易さを意識する

### 命名規則

#### 共通

単語の繋ぎはハイフン「 - 」を使用
連番は0をつける 例）img01, img02...
idは使わない
ファイル名が長くなる場合は省略可
- header -> h
- globl -> g
- footer -> f

#### HTML

ファイル名はページタイトルを英語化

#### SASS,CSS

MindBEMding記法で記述  
`[塊]__[要素]--[属性]`　例）media__img--left    

####img

[接頭詞]-[要素]-[属性]　例）icon-arrow-green1.png  
固有のClass名がある場合は同じファイル名でもよい

#### jQuery

クラスで指定をする、IDは極力使用しない  
クラス名には接頭詞として`js-`を付与する  
例) js-link-match-location
 
----

## ディレクトリ構成
.  
├── dist `公開・書き出し先ディレクトリ`  
│   ├── assets  
│   │   ├── css  
│   │   │   └── lib  
│   │   ├── img  
│   │   │   ├── common  
│   │   │   ├── favicons  
│   │   │   ├── lib  
│   │   │   └── top  
│   │   └── js  
│   │       └── lib  
│   └── styleguide  
└── src `開発ディレクトリ、開発時はこのディレクトリ内で編集を行います`  
    ├── assets `アセットディレクトリ : 画像・フォント・CSS・JS・その他ファイルを種別毎にディレクトリにして格納しています`  
    │   ├── fonts `フォントディレクトリ`  
    │   ├── img `画像ディレクトリ`  
    │   │   ├── common `共通画像ディレクトリ:サイトで共通して使う画像 -> header、footerなどで使用する画像など`  
    │   │   ├── favicons `ファビコン・タッチアンコン`  
    │   │   ├── lib `ライブラリ系画像ディレクトリ : JSのライブラリなどの画像など`  
    │   │   │   └── slider-pro  
    │   │   └── top `トップページで使用する画像`  
    │   ├── js `JavaScriptディレクトリ、Jsの編集はこのディレクトリで行って下さい`  
    │   │   ├── form `フォーム関係のJSが入っています`  
    │   │   │   └── lib `バリデート関係のJSが入っています`  
    │   │   ├── lib `プラグイン・ライブラリ関係のJSが入っています`  
    │   │   └── vender `バッグフィックス系やブラウザ互換のJsが入っています`  
    │   └── scss `sassファイルが一式入っています、Scssの編集はこのディレクトリで行って下さい`  
    │       ├── base `CSSのベースとなるファイルを纏めたもの`  
    │       ├── layout `レイアウト関係、ページ毎のスタイルシートファイルを纏めたもの`  
    │       ├── lib  `Jsのプラグイン・ライブラリ関係のscssファイルが入っています`  
    │       ├── mixins `Mixin関係`  
    │       ├── module `共通化パーツ・モジュール関係のファイルが入っています`  
    │       └── tools `ツール関係のファイルが入っています`  
    ├── ejs `ejsファイルが入っています`  
    ├── hologram `スタイルガイドジェネレーターの設定ファイル等が入っています`  
    ├── html `htmlが入っています、編集はこのディレクトリで行って下さい`  
    └── vendor `bundleでインストールしたモジュール類が入っています`  