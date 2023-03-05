# 動作環境

# GitHub Actions

## 実行

- 手動で実行できる
- できたら定期事項

## 処理の流れ

- スクリプトですること
  - 画像ファイルを保存する
  - json ファイルを作る
- Workflow ですること
  - git check out する
  - node を用意する
  - ブランチを作る
  - スクリプト実行
    - クエリパラメータをなにかする
  - コミットする
    - 誰がコミットするのか？
    - gh コマンド
    - https://zenn.dev/tatsugon/articles/github-actions-permission-error
    - https://zenn.dev/kenghaya/articles/d7f766e5db6437
    - https://github.com/cli/cli/issues/2691
  - push する
  - プルリクエストをつくる

## RSS から URL を取得し、画像を取得する

- RSS を取得する
  - URL から og:image の URL を取得し、og:image を保存し配列に追加する
  - 非同期が複数発生する
  - URL のリストができたら同時に 「URL から og:image の URL を取得し、og:image を保存し配列」は終えたい（早いから）

- Promise のネスト先も完了したことを確認したい


### 正解

- Promise オブジェクトを返す
- Promise でも、undefined だと Promise.all は処理できない

```javascript
const targets = [
  "https://httpstat.us/200",
  "https://httpstat.us/201",
  "https://httpstat.us/202",
  "https://httpstat.us/203"
];

function returnHoge(target){
  return fetch(target).then(result => result.text())
}

Promise.all(
  targets.map(target => returnHoge(target))
).then(results => {
  console.table(results)
  console.log("------ 処理終わり")
});
```

```bash
┌─────────┬─────────────────────────────────────┐
│ (index) │               Values                │
├─────────┼─────────────────────────────────────┤
│    0    │              '200 OK'               │
│    1    │            '201 Created'            │
│    2    │           '202 Accepted'            │
│    3    │ '203 Non-Authoritative Information' │
└─────────┴─────────────────────────────────────┘
------ 処理終わり
```

### だめな例

```javascript
function normalHoge(target){
  fetch(target).then(result => result.text())
}
```

```javascript
async function asyncHoge(target){
  fetch(target).then(result => result.text())
}
```
