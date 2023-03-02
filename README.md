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
