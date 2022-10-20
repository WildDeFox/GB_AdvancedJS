const URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS = '/catalogData.json';

const url = `${URL}${GOODS}`;

function service(url) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      const result = JSON.parse(xhr.response)
      resolve(result)
  };
  xhr.send()
  })
}

const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

class GoodsItem {
  constructor({product_name = '', price = 0}) {
    this.product_name = product_name;
    this.price = price;
  }

  render() {
    return `
      <div class="featuredItem" >
        <div class="featuredImgWrap">
          <img src="images/featured/1.jpg" alt="">
            <div class="featuredImgDark">
              <button class="addToCart">
                <img src="images/cart.svg" alt="">
                  Add to Cart
              </button>
            </div>
        </div>

      <div class="featuredData">
        <div class="featuredName">
          ${this.product_name}
        </div>
        <div class="featuredText">
          Known for her sculptural takes on traditional tailoring, Australian 
          arbiter of cool Kym Ellery teams up with Moda Operandi.
        </div>
        <div class="featuredPrice">
          $${this.price}
        </div>
      </div>

      </div>
      `;
    }
  }

class GoodsList {
  list = [];
  fetchGoods() {
    return new Promise((resolve) => {
      service(url).then((data) => {
        this.list = data;
        resolve();
      });
    })
    
  }

  render(){
    const resultList = this.list.map(item => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    });
    document.querySelector('.featuredItems').innerHTML = resultList.join('');
  }

  // Метод возвращает сумарную стоимость всех товаров.
  sumPrice(){
    let sum = 0;
    for(let elem of this.list) {
      sum += elem.price;
    }
    return sum;
  }
}

const goodsList = new GoodsList();
goodsList.fetchGoods().then(() => {
  goodsList.render();
})
