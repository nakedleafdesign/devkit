# コーディングマナー
- メンテナンス性、効率を意識したコーディング
- 拡張性、再利用性、柔軟性、ルールを持たせる
- 要素の追加・削除のし易さを意識する

## 命名規則

### 共通

単語の繋ぎはハイフン「 - 」を使用
連番は0をつける 例）img01, img02...
idは使わない
ファイル名が長くなる場合は省略可
- header -> h-
- globl -> g-
- footer -> f-

### HTML

ファイル名はページタイトルを英語化

### CSS

MindBEMding記法で記述  
[塊]__[要素]--[属性]　例）media__img--left  

Bootstrapコンポーネントを使用する箇所はBootstrapの命名規則を使用する（OOCSS）

###img

[接頭詞]-[要素]-[属性]　例）icon-arrow-green1.png  
固有のClass名がある場合は同じファイル名でもよい

### jQuery
クラスで指定をする、IDは極力使用しない  
クラス名には接頭詞として**js-**を付与する  
例) js-link-match-location  


## CSS・Sassディレクトリ

ディレクトリの命名規則はSMACSS(https://smacss.com/)に準ずる

   
├── base  
├── layout    
├── module  
├── style.scss  
└── tools  

style.scss : 読み込みファイル  
base : ベーススタイル  
module : 共通パーツスタイル、再利用可能なパーツ  
layout : 構造系スタイル、ページをエリアごとに分割  
tools : ツール、ユーティリティ系