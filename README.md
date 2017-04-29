# Peoject Name

-----
## 開発環境

- node : v5.5.0   
- npm : v3.3.12  
- ruby : v2.2.0  

----

## コーディングマナー
- メンテナンス性、効率を意識したコーディング
- 拡張性、再利用性、柔軟性、ルールを持たせる
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

#### CSS

MindBEMding記法で記述  
[塊]__[要素]--[属性]　例）media__img--left  

Bootstrapコンポーネントを使用する箇所はBootstrapの命名規則を使用する（OOCSS）

####img

[接頭詞]-[要素]-[属性]　例）icon-arrow-green1.png  
固有のClass名がある場合は同じファイル名でもよい

#### jQuery
クラスで指定をする、IDは極力使用しない  
クラス名には接頭詞として**js-**を付与する  
例) js-link-match-location  


## CSS・Sassディレクトリ

ディレクトリの命名規則はSMACSS(https://smacss.com/)に準ずる

-----
## URL

本番URL
:	[https://hoghoge.com](https://hoghoge.com)

開発時URL
:	[https://dev.hogehoge.com/](https://dev.hogehoge.com/)

CMS管理画面URL
:	[https://hoghoge.com/hogewp/wp-admin/](https://hoghoge.com/hogewp/wp-admin/)

## CMS アカウント

### 管理者アカウント設定

username
:	master@admin

Password
:	************

### 管理者アカウント設定

username
:	user@PARENT

Password
:	************


### ユーザーアカウント設定

username
:	user@CHILD

Password
:	xxx


-----

## 本番環境CMS DB情報

DBサーバー名 (MySQL 5.6)
: mysql.host.com

ユーザー
: user-name

DB名
: db-name

PW
: ******


## FTP

FTPSサーバ
:	ftp.hogehoge.com

FTPアカウント
:	ftp_account

初期フォルダ
:	web

公開フォルダ
:	/hogehoge.com/public_html/

パスワード
:	***********

-----

## SERVER

admin panel
:	[https://www.xserver.ne.jp/login_info.php](https://www.xserver.ne.jp/login_info.php)

ID
:	hogehoge

PW
:	***********

regist mail adress
:	hogehoge@hoge.com

-----








