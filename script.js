const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

class GoodsItem {
  constructor({title = '', price = 0}) {
    this.title = title;
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
          ${this.title}
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
    this.list = goods;
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
goodsList.fetchGoods();
goodsList.render();