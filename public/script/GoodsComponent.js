Vue.component('goods', {
    props: ['goodsarray'],
    template: `
            <div class="b-goodsList b-goodsList_grid">
                <product v-for="item of goodsarray" 
                :key="item.id"
                :product="item"></product>
            </div> `
});

Vue.component('product', {
    props: ['product'],
    template: `
            <div class="b-goodsList__item">
            <img class="b-goodsList__img" :src="product.imageUrl" alt="goods" />
            <h3>{{product.title}}</h3>
            <p>{{product.price}} &#8381;</p>
            <button class="b-goodButton" @click="$parent.$emit('addproduct', product)">Купить</button>
            </div> `
});