export const basketGoodsItem = Vue.component('basket-goods-item', {
  props: [
    'item'
  ],
  template: `
    <div class="basket-card__content___item">
       <h3>{{item?.data?.product_name}}</h3>
       <div>count: {{item?.count}}</div>
       <div>total: {{item?.total}}</div>
       <custom-button @click="$emit('add', item.data.id)">добавить</custom-button>
       <custom-button @click="$emit('delete', item.data.id)">удалить</custom-button>
    </div>
  `
})