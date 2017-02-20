# devkit

## Work環境

# 開発環境
- node : v5.5.0   
- npm : v3.3.12  
- ruby : v2.2.0  


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
- header -> h
- globl -> g
- footer -> f

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



## 現在使用しているBootstrapコンポーネント一覧
- scaffolding
- code
- grid
- forms
- input-groups
- utilities
- responsive-utilities

