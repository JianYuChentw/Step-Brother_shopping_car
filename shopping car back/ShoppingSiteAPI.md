# **Step Brother shopping site**
 >品牌購物網站API說明
## **品牌首頁**

>訪問首頁網頁，此頁包含全款式頁面

- **URL**
  /stepbrothers

- **Method:**

  `GET`

- **URL Params**

  `none`

-  **Required:**

   `none`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    `HTML 內容（首頁頁面）`
    ```json
    [
      {
        "id": 1,
        "brand_name": "NEW BALANCE",
        "product_name": "1880",
        "price": 2400,
        "class": "man"
      },
      {
        "id": 1,
        "brand_name": "NEW BALANCE",
        "product_name": "1880",
        "price": 2400,
        "class": "man"
      },
      {
        "id": 1,
        "brand_name": "NEW BALANCE",
        "product_name": "1880",
        "price": 2400,
        "class": "man"
      },
      {
        "id": 1,
        "brand_name": "NEW BALANCE",
        "product_name": "1880",
        "price": 2400,
        "class": "man"
      }
    ]
    ```

## **男、女、童款**

>訪問依參數前往男、女、童款式網頁

- **URL**

  >/stepbrothers/man

  >/stepbrothers/woman
  
  >/stepbrothers/kids

- **Method:**

  `GET`

- **URL Params**
  `none`

 - **Required:**
  `none`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    `HTML 內容（依參數前往分類頁面）`
    >以男性為例 ;
    ```json
      [
        {
        "id": 16,
        "brand_name": "NIKE",
        "product_name": "Tech Hera",
        "price": 3100,
        "class": "man"
        },
        {
        "id": 17,
        "brand_name": "NIKE",
        "product_name": "TC 7900",
        "price": 2200,
        "class": "man"
        }
      ]
    ```

<!-- 分隔線 -->

## **商品介紹**

>單品介紹頁，包含商品名、商品編號、商品尺寸、商品價格

- **URL**
  >/stepbrothers/:id

- **Method:**

  `GET`

- **URL Params**

  >提供商品的 {id}

 - **Required:**
   `id=[integer]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "product_id": 1,
      "brand_name":"NEW BALANCE",
      "product_name":"MTNTRBR5",
      "product_price":2400,
      "class":"man"
    }
    ```

<!-- 分隔線 -->

### **新增商品至購物車**

>送出商品資訊

  **URL**
  >/stepbrothers/:id/add

- **Method:**

  `POST`

- **URL Params**
  
  `none`

- **Required:**
      **Body:**

    ```json
      {
      "product_id" : 1,
      "product_size":9,
      "quantity":2,     
      }
    ```

- **Success Response:**
  >新增成功
  - **Code:** 200 <br />
    **Content:**
    `HTML 內容(原頁面)`
    <br />
    ```json
      {
        "add_to_car":true
      }
    ```

- **Error Response:**
  >新增失敗
  - **Code:** 401 <br />
    **Content:**
    `HTML 內容(原頁面)`
    ```json
      {
        "add_to_car":false
      }
    ```
<!-- 分隔線 -->

## **關於我們**

>商家基本介紹

- **URL**
  >/stepbrothers/about

- **Method:**

  `GET`

- **URL Params**

  `none`

-  **Required:**
    `none`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    `HTML 內容（關於商家資訊頁面）`
<!-- 分隔線 -->

## **會員中心**

>提供會員相關功能
ps:須要登入，若未登入會轉跳至登入頁

- **URL**
  >/stepbrothers/user

- **Method:**
  
  `GET`

- **URL Params**

  `none`

  **Required:**

  `none`

- **Success Response:**
  >已登入->會員資料
  - **Code:** 200 <br />
    **Content:**
    `HTML 內容(會員資料頁面)`
     <br />
    ```json
      {
      "id": 3,
      "account": "kaikai",
      "password": "password456",
      "name": "yukai",
      "phone": "0911223344",
      "mail": "zxc4885bsd@gmail.com",
      "grade": 3,
      "create_time": "2023/07/24 11:17:22",
      "update_time": "2023/08/07 22:54:25",
      "purchase_CA": 0,
      "login_status": 1
      }
    ```

  - **Error Response:**

  >未登入->登入頁

  - **Code:** 401 <br />
    **Content:** 
    `HTML 內容(登入頁頁面)`
     ```json
      {
        "login_status": false
      }
    ```
    
### **登出**
>登出會員回到首頁

- **URL**
 /stepbrother_page/logout

- **Method:**

  `GET`

- **URL Params**

  `none`

-  **Required:**
   `none`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    `HTML 內容（首頁頁面）`
    ```json
      {
        "login_status": false
      }
    ```

<!-- 分隔線 -->
- **Error Response:**

  >未登入->登入頁

  - **Code:** 401 <br />
    **Content:** 
    `HTML 內容(登入頁頁面)`

<!-- 分隔線 -->

## **訂單記錄**

>已選購之商品，含商品id、商品名稱、尺寸、數量、價格。

- **URL**
  >/stepbrothers/purchase_history

- **Method:**

  `GET`

- **URL Params**

  `none`

  **Required:**

  `none`

- **Success Response:**
  
   >已登入->訂單記錄頁

  - **Code:** 200 <br />
    **Content:**

    ```json
    [ 
      {
      "id": 2,
      "time": "2023-07-21 15:18:36",
      "user_id": 2,
      "name": "NianYaoBro",
      "recipient_name": "NianYaoBro",
      "recipient_phone": "0912345678",
      "recipient_address": "高雄市前金區五福三路63號11樓",
      "purchases": [
          {
              "brand_name": "NEW BALANCE",
              "product_name": "1880",
              "size": 9,
              "price": 2400,
              "quantity": 1,
              "subtotal": 2400,
              "purchase_status": 1
          },
          {
              "brand_name": "PUMA",
              "product_name": "RS-X Elevated Hike",
              "size": 9,
              "price": 3800,
              "quantity": 5,
              "subtotal": 19000,
              "purchase_status": 1
          },
      ],
      "sum": 22700
      }
    ]
    ```

- **Error Response:**

  >未登入->登入頁

  - **Code:** 401 <br />
    **Content:** 
    `HTML 內容(登入頁頁面)`
     ```json
    {
      "login_status": false
    }
    ```
    
<!-- 分隔線 -->

### **變更訂單狀態**
>允許取消訂單 order

- **URL**
 /stepbrother/cancel_order

- **Method:**

  `PUT`

- **URL Params**

  `none`

-  **Required:**
   ```json
    {
      "time": "2023-07-21 15:18:36"
    }
    ```
   

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    `HTML頁面(重新刷新訂單頁)`
    ```json
      {
        "cancel_order": false
      }
    ```

<!-- 分隔線 -->
- **Error Response:**

  >未登入->登入頁

  - **Code:** 401 <br />
    **Content:** 
    `HTML 內容(登入頁頁面)`
    ```json
      {
        "login_status": false
      }
    ```

<!-- 分隔線 -->


## **購物車**

>已選購之商品，含商品id、商品名稱、尺寸、數量、價格。

- **URL**
  >/stepbrothers/shopping_car

- **Method:**

  `GET`

- **URL Params**

  `none`

  **Required:**

  `none`

- **Success Response:**
  
   >已登入->購物車頁

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "grade":3,
      "shopping_cart": [{
          "id": 1,
          "user_id": 1,
          "account": "bannywang",
          "product_id": 20,
          "brand_name": "NIKE",
          "product_name": "Air Jordan 1 Elevate Low",
          "price": 3600,
          "us_size": 9,
          "quantity": 2,
          "subtotal": 7200,
          "shopping_status": 1,
          "check_out_status": 0
      }],
      "shopping_cart_sum": {
        "final_total": 2070,
        "original_total": 2300
    }
    }
    ```

- **Error Response:**

  >未登入->登入頁

  - **Code:** 401 <br />
    **Content:** 
    `HTML 內容(登入頁頁面)`
     ```json
    {
      "login_status": false
    }
    ```

<!-- 分隔線 -->    
### **修改購物車商品數量**
>刪除購物車內商品 '更新購物車數量狀態'

  **URL**
  >/stepbrothers/update_shopping_car_quantity

- **Method:**

  `PUT`

- **URL Params**

  `none`

- **Required:**
      **Body:**

    ```json
      {
      "shopping_car_id" : 12345,
      "product_size":9,
      "quantity":2
      }
    ```

- **Success Response:**
  >修改成功
  - **Code:** 200 <br />
    **Content:**
    `HTML 內容(原頁面)`
    <br />
    ```json
      {
        "grade": 3,
        "shopping_cart": [
            {
                "id": 112,
                "user_id": 3,
                "account": "kaikai",
                "product_id": 23,
                "brand_name": "NEW BALANCE",
                "product_name": "WW1880M1",
                "class": "woman",
                "us_size": 9,
                "price": 2300,
                "quantity": 3,
                "subtotal": 6900,
                "final_price": 6210,
                "shopping_status": 1,
                "check_out_status": 0
            }
        ],
        "shopping_cart_sum": {
            "final_total": 6210,
            "original_total": 6900
        }
      }
    ```

- **Error Response:**
  >修改失敗
  - **Code:** 401 <br />
    **Content:**
    `HTML 內容(原頁面)`
    ```json
      {
      "update_product":false
      }
    ```

<!-- 分隔線 -->    
### **刪除購物車商品**
>刪除購物車內商品 '更新購物車存活狀態'

  **URL**
  >/stepbrothers/delete_car

- **Method:**

  `PUT`

- **URL Params**

  `none`

- **Required:**
      **Body:**

    ```json
      {
      "shopping_car_id" : 12345,
      }
    ```

- **Success Response:**
  >刪除成功
  - **Code:** 200 <br />
    **Content:**
    `HTML 內容(原頁面)`
    <br />
    ```json
    {
      "grade":3,
      "shopping_cart": [{
          "id": 1,
          "user_id": 1,
          "account": "bannywang",
          "product_id": 20,
          "brand_name": "NIKE",
          "product_name": "Air Jordan 1 Elevate Low",
          "price": 3600,
          "us_size": 9,
          "quantity": 2,
          "subtotal": 7200,
          "shopping_status": 1,
          "check_out_status": 0
      }],
      "shopping_cart_sum": {
          "final_total": 2070,
          "original_total": 2300
      }
    }
    ```

- **Error Response:**
  >刪除失敗
  - **Code:** 401 <br />
    **Content:**
    `HTML 內容(原頁面)`
    ```json
      {
      "delete_product":false
      }
    ```

<!-- 分隔線 -->
  
## **登入頁**

>此處輸入 Account ＆ Password 

- **URL**
  >/stepbrothers/login_page

- **Method:**

  `GET`

-  **Required:**  
  `none`

- **Success Response:**
  >已經是登入狀態
  - **Code:** 200 <br />
    **Content:**
    `HTML 內容(進入轉跳頁提示已經登入，再導向至會員資料)`
    <br />
    ```json
      {
      "login_status":true
      }
    ```

- **Error Response:**
  >不是登入狀態
  - **Code:** 401 <br />
    **Content:**
    `HTML 內容(登入頁頁面)`
    ```json
      {
      "login_status":false
      }
    ```
    
<!-- 分隔線 -->

### **登入**

  >送出 Account ＆ Password

  **URL**
  >/stepbrothers/login

- **Method:**

  `POST`
- **URL Params**

  `none`

- **Required:**
      **Body:**

    ```json
      {
      "account": "NianYaoBro",
      "password": "password123"
      }
    ```

- **Success Response:**
  >登入成功
  - **Code:** 200 <br />
    **Content:**
    `HTML 內容(進入轉跳頁提示登入成功，再導向至會員資料)`
    <br />
    ```json
      {
      "login_status":true
      }
    ```

- **Error Response:**
  >登入失敗
  - **Code:** 401 <br />
    **Content:**
    `HTML 內容(登入頁頁面)`
    ```json
      {
      "login_status":false
      }
    ```

<!-- 分隔線 -->

## **註冊頁**

>新會員提供相關資料加入會員，此處輸入 姓名、帳號、密碼、確認密碼、電話、電子郵件

- **URL**
  >/stepbrothers/register_page

- **Method:**

  `GET`
- **URL Params**

  `none`

-  **Required:**
  `none`

- **Success Response:**
  >不是登入狀態
  - **Code:** 200 <br />
    **Content:**
    `HTML 內容(註冊頁)`
    <br />
    ```json
      {
      "login_status":false
      }
    ```

- **Error Response:**
  >已經是登入狀態
  - **Code:** 401 <br />
    **Content:**
    `HTML 內容(附上提示，轉跳回會員資料)`
    ```json
      {
      "login_status":true
      }
    ```
<!-- 分隔線 -->

### **註冊**

>送出 姓名、帳號、密碼、確認密碼、電話、電子郵件

- **URL**
  >/stepbrothers/register

- **Method:**

  `POST`

- **URL Params**

  `none`

-  **Required:**
    **Body:**
    ```json
    {
      "new_account":"meowmeow123",
      "new_password":"password123",
      "new_name":"NianYaoBro",
      "new_phone_number":"0912345678",
      "new_email":"bunnyboy@gmail.com"
    }
    ```

- **Success Response:**
  
  - **Code:** 200 <br />
    **Content:**
    `HTML 內容(登入頁面)`
     <br />
     ```json
    {
      "register_result":true
    }
    ```

- **Error Response:**
 
  >帳號已重複

  - **Code:** 401 <br />
    **Content:** 
    `HTML 內容(註冊頁面)`
    ```json
    {
      "register_result":false
    }
    ```
<!-- 分隔線 -->

## **結帳頁**

>填寫貨件資訊，且確認購物清單

- **URL**
  >/stepbrothers/check_out

- **Method:**

  `GET`

- **URL Params**

  `none`

-  **Required:**
   `none`

- **Success Response:**
  
  - **Code:** 200 <br />
    **Content:**
    `HTML 內容(購物車內容)`
     <br />
    ```json
    {
    "user_grade": 3,
    "user_name": "yukai",
    "user_phone": "0911223344",
    "user_mail": "zxc4885bsd@gmail.com",
    "shopping_cart": [
        {
            "id": 113,
            "user_id": 3,
            "account": "kaikai",
            "product_id": 23,
            "brand_name": "NEW BALANCE",
            "product_name": "WW1880M1",
            "class": "woman",
            "us_size": 9,
            "price": 2300,
            "quantity": 1,
            "subtotal": 2300,
            "final_price": 2070,
            "shopping_status": 1,
            "check_out_status": 0
        }
      ],
      "shopping_cart_sum": {
          "final_total": 2070,
          "original_total": 2300
      }
    }
    ```
  - **Error Response:**

  >未登入->登入頁

  - **Code:** 401 <br />
    **Content:** 
    `HTML 內容(登入頁頁面)`
     ```json
    {
      "login_status": false
    }
    ```

<!-- 分隔線 -->
### **確認購買**

>送出收件資訊

- **URL**
  >/stepbrothers/submit_shopping_car

- **Method:**

  `POST`

-  **Required:**
    **Body:**
    ```json
    {
    "mail": "bunnyboy@gmail.com",
    "recipient_name": "NianYaoBro",
    "recipient_phone": "0912345678",
    "recipient_address": "高雄市前金區五福三路63號11樓"
    }
    ```

- **Success Response:**
  
  - **Code:** 200 <br />
    **Content:**
    `HTML 內容(轉跳購物記錄頁)`
     <br />
     ```json
    {
    "order_result":true
    }
    ```

- **Error Response:**
  >登入失敗
  - **Code:** 401 <br />
    **Content:**
    `HTML 內容(登入頁頁面)`
    ```json
      {
      "order_result":false
      }
    ```

<!-- 分隔線 --> 

## **修改會員個人檔案**

>此處輸入欲修改資料，僅允許修改密碼、電話及電子郵件

- **URL**
  >/stepbrothers/update_user_data_page

- **Method:**

  `GET`

- **URL Params**

  `none`

-  **Required:**
  `none`

- **Success Response:**
  
  - **Code:** 200 <br />
    **Content:**
    `HTML 內容(會員資料修改頁面)`
     <br />
     ```json
      {
        "user_name":"NianYaoBro",
        "user_account":"meowmeow123",
        "user_password":"password123",
        "user_phone_number":"0912345678",
        "user_email"':"bunnyboy@gmail.com"
      }
     ```

  - **Error Response:**

  >未登入->登入頁

  - **Code:** 401 <br />
    **Content:** 
    `HTML 內容(登入頁頁面)`
     ```json
    {
      "login_status": false
    }
    ```

<!-- 分隔線 -->

### **修改**

>送出修改之密碼、確認密碼、電話及電子郵件，皆為必填欄！'更新會員資料'

- **URL**
  >/stepbrothers/submit_update_user_data

- **Method:**

  `PUT`

- **URL Params**

  `none`

-  **Required:**
    **Body:**
    >二次確認密碼前端判斷 
    ```json
    {
      "change_password":"password123",
      "change_phone_number":"0912345678",
      "change_email":"bunnyboy@gmail.com"
    }
    ```

- **Success Response:**
  
  - **Code:** 200 <br />
    **Content:**
    `HTML 內容(會員資料頁面)`
     <br />
     ```json
    {
      "change_result":true
    }
    ```

- **Error Response:**
 
  >修改的密碼、電話、電郵不能重複

  - **Code:** 400 <br />
    **Content:** 
    `HTML 內容(修改會員個人檔案`
    ```json
    {
    "change_result":false
    }
    ```
<!-- 分隔線 -->  

## **聯繫客服**
>可以看見本次登入所提問的問題與答案

- **URL**
  >/stepbrothers/customer_service

- **Method:**

  `GET`

- **URL Params**

  `none`

-  **Required:**
  `none`

- **Success Response:**
  
  - **Code:** 200 <br />
    **Content:**
    `HTML 內容(與客服對話頁，含本次"登入"的問答)`
     <br />
     ```json
    {
      "login_status": true,
      "service_question": [
          {
              "id": 1,
              "question": "如何更改會員資料"
          },
          {
              "id": 2,
              "question": "會員等級計算方式"
          },
        ]
    }
     ```
- **Error Response:**

  >未登入->登入頁

  - **Code:** 401 <br />
    **Content:** 
    `HTML 內容(登入頁頁面)`
     ```json
    {
      "login_status": false
    }
    ```
<!-- 分隔線 -->  