# StepBrother shopping 

![專案封面圖](./shopping%20car%20back/views/pictures/stepbrother-logo.svg)

## 介紹
 本專案為Bowa第三屆B組專題成果，題目為潮流鞋款購物網站，面向使用者為顧客(前台相關頁面)及業主(中台相關頁面)，對應不同使用者有不同功能。


## 功能
顧客(前台)

- [ ] 產品列表
- [ ] 產品介紹
- [ ] 產品模糊搜尋
- [ ] 新增至購物車
- [ ] 登入
- [ ] 登出
- [ ] 註冊
- [ ] 會員資訊 
- [ ] 修改會員資料
- [ ] 訂單資訊
- [ ] 變更訂單狀態
- [ ] 異動購物車內產品數量或移除
- [ ] 下訂產品
- [ ] 客服回覆(預設問題及答案)

業主(中台)

- [ ] 管理員登入
- [ ] 訂單模糊搜尋
- [ ] 訂單狀態變更
- [ ] 產品模糊搜尋
- [ ] 產品詳情(展開)
- [ ] 產品上架狀態及庫存異動
- [ ] 會員資訊總覽(唯讀) 
- [ ] 上架新產品(含圖片)
- [ ] 交易紀錄總覽
- [ ] 結束訂單總覽
- [ ] 結束訂單模糊搜尋
- [ ] 結束訂單下載(excel)
- [ ] 異動購物車內產品數量或移除
- [ ] 客服回覆異動(問題及答案新增、修改、刪除)

## 安裝

> 以下將會引導你如何安裝此專案到你的電腦上。

Node.js 版本建議為：`v18.16.0` 以上

### 取得專案

```bash
gh repo clone JianYuChentw/Step-Brother_shopping_car
```

### 安裝套件

顧客(前台)及業主(中台)相同，請各自執行安裝

```bash
npm install
```

### 運行專案

考慮可能會有需要維護情形，故分開運行，不影響維修時另一方無法使用。

顧客(前台)
```bash
node app.js
```

業主(中台)

```bash
node console_app.js
```

### 開啟專案

在瀏覽器網址列輸入以下即可看到畫面

顧客(前台)
```bash
http://localhost:3000/
```

業主(中台)
```bash
http://localhost:3100/
```

## 資料夾說明

ＭＶＣ架構 

註：因前後端分離開發，因此該專案目前為測試時所建構網頁。

- router - 不同路由可以導向不同模組用於處理不同的功能或資源，詳情可於前台與中台資料夾內閱讀ＡＰＩ文件。
 
- views - 靜態資源及畫面放置處。
  - picture - 圖片放置處。
  
- controllers - 控制層放置處，主要為邏輯判斷及少量資訊處理。
  
- module - 模組放置處，資料處理及功能組裝。
- data - 資料庫相關連線取得設定



## 專案技術

###Front-End
- 程式語言 : Javascript
- 架構 : HTML5
- 樣式 : CSS

###Back-End

- 程式語言 : Node.js v18.16.0
- 後端框架 : Express.js
- 資料庫 : MySQL


## 聯絡作者


你可以透過以下方式與我聯絡

- Email : coke818572@gmail.com

