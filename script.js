const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GET_GOODS_ITEMS = `${BASE_URL}/catalogData.json`;

// const url = `${URL}${GOODS}`;

function service(url) {
  return fetch(url).then((res) => res.json())
}

function init() {
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
      filteredItems() {
        this.filteredItems = this.items.filter(({product_name}) => {
          return product_name.match(new RegExp(this.search, 'gui'))
        })
      },
      setVisibleCart() {
        this.isVisibleCart = !this.isVisibleCart;
      }
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