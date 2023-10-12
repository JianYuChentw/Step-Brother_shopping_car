const express = require('express');
const routes = express.Router();
const page = require('../controller/page_ctrl');
const member = require('../controller/member_ctrl');
const shopping = require('../controller/shopping_car_ctrl');
const path = require('path');

// 導向到首頁面 測試用
routes.get('/', (req, res) => {
  // #swagger.ignore =true
  console.log('home');
  const filePath = path.join(__dirname, '../views/home.html');
  res.sendFile(filePath);
});

// 導向到男裝頁面 測試用
routes.get('/man', (req, res) => {
  // #swagger.ignore =true
  console.log('man');
  const filePath = path.join(__dirname, '../views/man.html');
  res.sendFile(filePath);
});

// 導向到女裝頁面 測試用
routes.get('/woman', (req, res) => {
  // #swagger.ignore =true
  console.log('woman');
  const filePath = path.join(__dirname, '../views/woman.html');
  res.sendFile(filePath);
});

// 導向到童裝頁面 測試用
routes.get('/kid', (req, res) => {
  // #swagger.ignore =true
  console.log('kid');
  const filePath = path.join(__dirname, '../views/kids.html');
  res.sendFile(filePath);
});

// 導向到購物車頁面 測試用
routes.get('/shoppingCar', (req, res) => {
  // #swagger.ignore =true
  const filePath = path.join(__dirname, '../views/shoppingCar.html');
  res.sendFile(filePath);
});

//導向到登入頁面 "測試用"
routes.get('/login', (req, res) => {
  // #swagger.ignore =true
  const filePath = path.join(__dirname, '../views/loginPage.html');
  res.sendFile(filePath);
});

// 導向到會員頁面 測試用
routes.get('/userpage', (req, res) => {
  // #swagger.ignore =true
  const filePath = path.join(__dirname, '../views/user_page.html');
  res.sendFile(filePath);
});

// 導向到購物紀錄頁面 測試用
routes.get('/historyPage', (req, res) => {
  // #swagger.ignore =true
  const filePath = path.join(__dirname, '../views/historyPage.html');
  res.sendFile(filePath);
});

// 導向到結帳頁面 測試用
routes.get('/checkPage', (req, res) => {
  // #swagger.ignore =true
  const filePath = path.join(__dirname, '../views/checkPage.html');
  res.sendFile(filePath);
});

// 導向到註冊頁面 測試用
routes.get('/register_page', (req, res) => {
  // #swagger.ignore =true
  const filePath = path.join(__dirname, '../views/registerPage.html');
  res.sendFile(filePath);
});

//網頁
// 首頁
routes.get(
  '/stepbrothers',
  /* 	#swagger.tags = ['Step Brothers page']
        #swagger.description = '官網首頁，取得所有商品摘要。' */

  /* #swagger.responses[200] = { 
      schema: [
    {
      "id": 3,
      "brand_name": "NEW BALANCE",
      "product_name": "Fresh Foam Hierro v7 MTHIERR7",
      "price": 2800,
      "class": "man",
      "product_data_status": 1
    }]
  } */
  page.home_page
);

// 男鞋
routes.get(
  '/stepbrothers/man',
  /* 	#swagger.tags = ['Step Brothers page']
        #swagger.description = '取得所有男性商品摘要。' */
  /* #swagger.responses[200] = { 
      schema: [{
        "id": 3,
        "brand_name": "NEW BALANCE",
        "product_name": "Fresh Foam Hierro v7 MTHIERR7",
        "price": 2800,
        "class": "man",
        "product_data_status": 1
      },]
    } */
  page.man_page
);

// 女鞋
routes.get(
  '/stepbrothers/woman',
  /* 	#swagger.tags = ['Step Brothers page']
        #swagger.description = '取得所有女性商品摘要。' */
  /* #swagger.responses[200] = { 
      schema: [{
        "id": 16,
        "brand_name": "NIKE",
        "product_name": "Tech Hera",
        "price": 3100,
        "class": "woman",
        "product_data_status": 1
      },]
    } */

  page.woman_page
);

// 童鞋
routes.get(
  '/stepbrothers/kids',
  /* 	#swagger.tags = ['Step Brothers page']
        #swagger.description = '取得所有兒童商品摘要。' */
  /* #swagger.responses[200] = { 
      schema: [{
        "id": 31,
        "brand_name": "PUMA",
        "product_name": "X-Ray Speed Lite",
        "price": 1200,
        "class": "kids",
        "product_data_status": 1
      },]
    } */
  page.kid_page
);

// 會員資訊
routes.get(
  '/stepbrothers/user',
  /* 	#swagger.tags = ['Step Brothers page']
        #swagger.description = '取得會員的相關資訊。' */
  /* #swagger.responses[200] = { 
      schema: {
        "id": 2,
        "account": "meowmeow123",
        "password": "123456",
        "name": "NianYaoBro",
        "phone": "0912345678",
        "mail": "bunnyboy@gmail.com",
        "grade": 3,
        "create_time": "2023/07/20 15:56:53",
        "update_time": "2023/07/20 22:53:07",
        "purchase_CA": 113820,
        "login_status": 1
      }
    } */
  page.user_page
);

// 會員個人歷史訂單
routes.get(
  '/stepbrothers/purchase_history',
  /* 	#swagger.tags = ['Step Brothers page']
        #swagger.description = '取得會員的相關購物紀錄。' */
  /* #swagger.responses[200] = { 
      schema: [{
          "id": 25,
          "time": "2023-09-11 16:58:51",
          "user_id": 2,
          "name": "NianYaoBro",
          "recipient_name": "superNB",
          "recipient_phone": "0912345678",
          "recipient_address": "rm owejfojwpjp;ojsdklhgl",
          "purchases": [
                {
                  "brand_name": "NIKE",
                  "product_name": "React Infinity FK 3",
                  "size": 9,
                  "price": 3100,
                  "quantity": 2,
                  "subtotal": 6200,
                  "purchase_status": 4
                },
                {
                  "brand_name": "NEW BALANCE",
                  "product_name": "Fresh Foam Trail More",
                  "size": 9,
                  "price": 4000,
                  "quantity": 1,
                  "subtotal": 4000,
                  "purchase_status": 4
                }
              ],
              "sum": 9180
            }]
    } */
  page.history_page
);

// 購物車頁
routes.get(
  '/stepbrothers/shopping_car',
  /* 	#swagger.tags = ['Step Brothers page']
        #swagger.description = '取得會員的購物車內容。' */
  /* #swagger.responses[200] = { 
      schema: {
        "grade": 3,
        "shopping_cart": [
              {
                "id": 65,
                "user_id": 2,
                "account": "meowmeow123",
                "product_id": 12,
                "brand_name": "PUMA",
                "product_name": "Anzarun 2.0",
                "class": "man",
                "us_size": 9,
                "price": 1000,
                "quantity": 1,
                "subtotal": 1000,
                "final_price": 900,
                "shopping_status": 1,
                "check_out_status": 0
              }
            ],
            "shopping_cart_sum": {
              "final_total": 900,
              "original_total": 1000
            }
        }
    } */
  page.car_page
);

//會員登入頁
routes.get(
  '/stepbrothers/login_page',
  /* 	#swagger.tags = ['Step Brothers page']
        #swagger.description = '可以輸入帳號及密碼，若以登入則無法進入該頁' */
  page.login_page
);

//加入會員頁
routes.get(
  '/stepbrothers/register_page',
  /* 	#swagger.tags = ['Step Brothers page']
        #swagger.description = '可以填寫相關資訊方得註冊為會員，若以登入則無法進入該頁。' */
  page.register_page
);

//結帳頁
routes.get(
  '/stepbrothers/check_out',
  /* 	#swagger.tags = ['Step Brothers page']
        #swagger.description = '可以確認給物車內容，並填寫相關收件資訊。' */
  /* #swagger.responses[200] = { 
        schema: {
          "user_grade": 3,
          "user_name": "NianYaoBro",
          "user_phone": "0912345678",
          "user_mail": "bunnyboy@gmail.com",
          "shopping_cart": [
            {
              "id": 65,
              "user_id": 2,
              "account": "meowmeow123",
              "product_id": 12,
              "brand_name": "PUMA",
              "product_name": "Anzarun 2.0",
              "class": "man",
              "us_size": 9,
              "price": 1000,
              "quantity": 1,
              "subtotal": 1000,
              "final_price": 900,
              "shopping_status": 1,
              "check_out_status": 0
            }
          ],
          "shopping_cart_sum": {
            "final_total": 900,
            "original_total": 1000
          }
        }
      } */
  page.check_page
);

//會員資訊異動頁
routes.get(
  '/stepbrothers/update_user_data_page',
  /* 	#swagger.tags = ['Step Brothers page']
        #swagger.description = '會取得會員部分資訊，可以填寫欲修改的會員資訊。' */
  /* #swagger.responses[200] = { 
        schema: {
          "user_name": "NianYaoBro",
          "user_account": "meowmeow123",
          "user_password": "123456",
          "user_phone_number": "0912345678",
          "user_email": "bunnyboy@gmail.com"
        }
      } */
  page.update_user_page
);

// 客服機器人頁 未解決
routes.get(
  '/stepbrothers/customer_service',
  /* 	#swagger.tags = ['Step Brothers page'] 
        #swagger.description = '可以輸入預設的問題，得到預設的回答。' */
  /* #swagger.responses[200] = {
        description: "Successful response",
        schema: {
          "login_status": true,
          "service_question": [
            {
              "id": 1,
              "question": "如何更改會員資料",
              "answer": "前往修改資料，直接針對可修改內容進行修改後，點擊確認修改，即可修改資料，特別注意密碼需要再次輸入確認密碼後才可修改唷!",
              "exist_status": 1
            },
            {
              "id": 2,
              "question": "會員等級計算方式",
              "answer": "會員累積消費滿5000時將成為銀牌會員，銀牌折扣9.5折，會員累積消費滿10000時將成為金牌會員，金牌折扣9折。",
              "exist_status": 1
            },]
      }} */
  page.service_page
);

//產品模糊搜尋
routes.post(
  '/stepbrothers/product_search',
  /* 	#swagger.tags = ['Shopping ability']
        #swagger.description = '關鍵字搜尋商品。' */
  /* #swagger.responses[200] = { 
      schema:[
          {
            "id": 6,
            "brand_name": "NIKE",
            "product_name": "Air Jordan 1 Low Craft",
            "price": 5000,
            "class": "man"
          },
          {
            "id": 7,
            "brand_name": "NIKE",
            "product_name": "Invincible Run 3",
            "price": 5500,
            "class": "man"
          },]
    } */
  page.vague_search
);

//會員功能
//登入
routes.post(
  '/stepbrothers/login',
  /* 	#swagger.tags = ['Member rights']
        #swagger.description = '發送輸入的帳號及密碼。' */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '帳號及密碼.',
            required: true,
            schema: {
              "account": "any",
              "password": "any"
            }
    } */

  /* #swagger.responses[200] = { 
      schema: {
      "login_status": true
    }
  } */
  member.login
);

//登出
routes.get(
  '/stepbrothers/logout',
  /* 	#swagger.tags = ['Member rights']
        #swagger.description = '登出會員，並移除賦予之相關憑證。' */
  /* #swagger.responses[200] = { 
      schema: {
      "login_status": false
    }
  } */
  member.logout
);

//註冊
routes.post(
  '/stepbrothers/register',
  /* 	#swagger.tags = ['Member rights']
        #swagger.description = '發送輸入註冊相關資訊。' */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '帳號及密碼.',
            required: true,
            schema: {
              "new_account": "any",
              "new_password": "any",
              "new_name": "any",
              "new_phone_number": "any",
              "new_email": "any"
            }
    } */
  /* #swagger.responses[200] = { 
      schema: {
      "login_status": true
    }
  } */
  member.register
);

//更新會員資料
routes.put(
  '/stepbrothers/submit_update_user_data',
  /* 	#swagger.tags = ['Member rights']
        #swagger.description = '發送更新會員資料。' */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '必要{新的或舊的密碼}、新的電話號碼、新的Email',
            required: true,
            schema: {
              "change_password": "any",
              "change_phone_number": "any",
              "change_email": "any"
            }
    } */
  /* #swagger.responses[200] = { 
      schema: {
        "change_result":true
        }
  } */
  member.update_user_data
);
//忘記密碼
routes.post(
  '/stepbrothers/submit_forget_password',
  /* 	#swagger.tags = ['Member rights']
        #swagger.description = '發送會員密碼至設定信箱。' */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '輸入註冊用戶的帳號及電話號碼。',
            required: true,
            schema: {
              "account": "any",
              "phone": "any"
            }
    } */
  /* #swagger.responses[200] = { 
      schema: {
        "user": true
      }
  } */
  member.forget_password
);
//取消訂單
routes.put(
  '/stepbrother/cancel_order',
  /* 	#swagger.tags = ['Shopping ability']
        #swagger.description = '未出貨訂單取消。' */
  /*	#swagger.parameters['obj'] = {
          in: 'body',
          description: '購買商品的時間',
          required: true,
          schema: {
            "time": "any"
          }
    } */
  /* #swagger.responses[200] = { 
      schema: {
        "cancel_result": true
      }
    } */
  shopping.cancel_order
);

// 購物功能
//新增加入購物車
routes.post(
  '/stepbrothers/:id/add',
  /* 	#swagger.tags = ['Shopping ability']
        #swagger.description = '將商品加入購物車。' */
  /*	#swagger.parameters['obj'] = {
          in: 'body',
          description: '指定尺寸及數量。',
          required: true,
          schema: {
            "product_size": "any",
            "quantity": "any"
          }
    } */
  /* #swagger.responses[200] = { 
      schema: {
        "add_to_cart": true
      }
    } */
  shopping.add_to_car
);

//異動購物車商品數量
routes.post(
  '/stepbrothers/update_shopping_car_quantity',
  /* 	#swagger.tags = ['Shopping ability']
        #swagger.description = '異動購物車商品數量' */

  /*	#swagger.parameters['obj'] = {
          in: 'body',
          description: '指定購物車id及數量。',
          required: true,
          schema: {
            "shopping_car_id": "any",
            "quantity": "any"
          }
    } */
  /* #swagger.responses[200] = { 
      schema: {
        "grade": 3,
        "shopping_cart": [
              {
                "id": 65,
                "user_id": 2,
                "account": "meowmeow123",
                "product_id": 12,
                "brand_name": "PUMA",
                "product_name": "Anzarun 2.0",
                "class": "man",
                "us_size": 9,
                "price": 1000,
                "quantity": 2,
                "subtotal": 1000,
                "final_price": 900,
                "shopping_status": 1,
                "check_out_status": 0
              }
            ],
            "shopping_cart_sum": {
              "final_total": 900,
              "original_total": 1000
            }
        }
    } */
  shopping.update_quantity
);

//移除購物車商品
routes.put(
  '/stepbrothers/delete_car',
  /* 	#swagger.tags = ['Shopping ability']
        #swagger.description = '移除購物車商品' */
  /*	#swagger.parameters['obj'] = {
          in: 'body',
          description: '指定購物車id。',
          required: true,
          schema: {
            "shopping_car_id": "any",
          }
    } */
  /* #swagger.responses[200] = { 
      schema: {
        "grade": 3,
        "shopping_cart": false,
        "shopping_cart_sum": {
          "final_total": 0,
          "original_total": 0
          }
        }
    } */
  shopping.delete_car_product
);

//購買購物車商品
routes.post(
  '/stepbrothers/submit_shopping_car',
  /* 	#swagger.tags = ['Shopping ability']
        #swagger.description = '填寫完收件資料，將訂單送出。' */
  /*	#swagger.parameters['obj'] = {
          in: 'body',
          description: '指定收件人、收件人電話及收件人地址。',
          required: true,
          schema: {
            "recipient_name": "any",
            "recipient_phone": "any",
            "recipient_address": "any"
          }
    } */
  /* #swagger.responses[200] = { 
      schema: {
        "order_result": true
      }
    } */
  shopping.buy_car_product
);

// 指定商品頁//動態路由
routes.get(
  '/stepbrothers/:id',
  /* 	#swagger.tags = ['Step Brothers page']
        #swagger.description = '取得商品詳細資訊。' */
  /* #swagger.responses[200] = {
      schema: {
        "id": 5,
        "brand_name": "NEW BALANCE",
        "product_name": "Fresh Foam Trail More",
        "price": 4000,
        "class": "man",
        "product_data_status": 1,
        "size_stock": [
          {
            "size": 1,
            "stock": 10
          },
          {
            "size": 2,
            "stock": 9
          },
          {
            "size": 3,
            "stock": 10
          },
          {
            "size": 4,
            "stock": 10
          },
          {
            "size": 5,
            "stock": 9
          },
          {
            "size": 6,
            "stock": 10
          },
          {
            "size": 7,
            "stock": 10
          },
          {
            "size": 8,
            "stock": 10
          },
          {
            "size": 9,
            "stock": 9
          },
          {
            "size": 10,
            "stock": 10
          },
          {
            "size": 11,
            "stock": 10
          },
          {
            "size": 12,
            "stock": 10
          }
        ]
      }
    } */
  page.product_page
);

// 導向指定商品頁//動態路由 測試用
routes.get('/:id', (req, res) => {
  // #swagger.ignore =true
  const filePath = path.join(__dirname, '../views/oneProduct.html');
  res.sendFile(filePath);
});

// 路由輸出
module.exports = routes;
