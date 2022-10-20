const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GET_GOODS_ITEMS = `${BASE_URL}/catalogData.json`;

// const url = `${URL}${GOODS}`;

function service(url) {
  return fetch(url).then((res) => res.json())
}

function init() {

  Vue.component('basket', {
    template: `
    <div class="basket">
                        <div class="cl-btn-7" @click="$emit('close')"></div>
                        <div class="basketRow basketHeader">
                            <div>Название товара</div>
                            <div>Количество</div>
                            <div>Цена за шт.</div>
                            <div>Итого</div>
                        </div>
                    
                        <div class="basketTotal">
                            Товаров в корзине на сумму:
                            $<span class="basketTotalValue">0</span>
                        </div>
                    </div>
    `
  });

  Vue.component('search_input', {
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      value: ''
    },

    template: `
    <input type="text" class="search" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" >
    `
  })

  Vue.component('search_button', {
    template: `
    <img class="searchIcon" src="images/search.png" alt="Поиск" v-on:click="$emit('click')">
    `
  })

  Vue.component('featured_item', {
    props: [
      'item'
    ],
    template: `
    <div class="featuredItem">
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
          {{item.product_name}}
        </div>
        <div class="featuredText">
          Known for her sculptural takes on traditional tailoring, Australian 
          arbiter of cool Kym Ellery teams up with Moda Operandi.
        </div>
        <div class="featuredPrice">
          {{item.price}}
        </div>
      </div>
            
    </div>
    `
  });

  Vue.component('my_footer', {
    data: function() {
      return {
        title: 'Footer'
      }
    },
    template: `
    <div class="footer">
            <div class="container">
                <div class="footerLeft">
                    <a href="#">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#">
                        <i class="fab fa-pinterest-p"></i>
                    </a>
                    <a href="#">
                        <i class="fab fa-twitter"></i>
                    </a>
                </div>
                <div class="footerRight">
                    &copy; 2021  Brand  All Rights Reserved.
                </div>
            </div>
        </div>
    `
  })

  const app = new Vue({
    el: '#app',
    data: {
      items: [],
      filteredItems: [],
      search: '',
      isVisibleCart: false,
    },
    methods: {
      fetchGoods() {
        service(GET_GOODS_ITEMS).then((data) => {
          this.items = data;
          this.filteredItems = data;
        });
      },
      filterItems() {
        this.filteredItems = this.items.filter(({product_name}) => {
          return product_name.match(new RegExp(this.search, 'gui'))
        })
      },
      setVisibleCart() {
        this.isVisibleCart = !this.isVisibleCart;
      },
    },
    computed: {
      calculatePrice() {
        return this.filteredItems.reduce((prev, {price}) => {
          return prev + price;
        }, 0)
      }
    },
    mounted() {
      this.fetchGoods();
    }
  })
}

window.onload = init;