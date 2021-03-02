## Asana task list: https://app.asana.com/0/1186121531777609/list

## demo
https://gyazo.com/292aa96479c1aec59c29a026b6fa9771


## 各ブランチの役割

### Git管理フロー
```
開発ブランチ --->
Pull Request --->
stagingブランチ(base branch) --->
masterブランチ(production)
```

- 開発ブランチ: 各個人が取り掛かるタスク用ブランチ
- stagingブランチ: Githubのbase branch
- masterブランチ: 本番環境用のブランチ


`開発ブランチ`のPull Requestがレビューされ、`stagingブランチ`にmergeした時に
CircleCIで自動E2Eテストが実行される。

## credentialsで管理している環境
- development
- test
- staging
- production

*各環境のkeyは.gitignoreに記載

### 各環境に共通する項目

```
# credentialsの暗号鍵を生成するのに必要
# rails secret で生成した値を貼り付けている
secret_key_base:

# application.rbのhostに記載するもの
host:
  front:
  api:

# エンドポイント
end_point:
  front:
	api:
```

### staging, productionのみ必要な設定

```
# MySQL用の情報
db:
 host:
 database:
 username:
 password:
```

## 画像の管理ディレクトリ

- public/images以下のディレクトリで管理

先頭に `/` を付けずに指定する。
```
backgroundImage: 'url(public/images/moneylog.jpg)'

<img src ="public/images/loadingp.gif" style={{width: "300px"}} />
```
