Vue.component('products', {

    data() {
        return {
            catalogUrl: `/catalogData.json`,
            goods: [],
            filtered: [],
        }
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.goods.filter(el => regexp.test(el.title));
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let el of data) {
                    this.goods.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
            <div class="b-goodsList b-goodsList_grid">
                <product v-for="item of filtered" 
                :key="item.id"
                :product="item"></product>
            </div>`
});
Vue.component('product', {
    props: ['product'],
    template: `
                <div class="b-goodsList__item">
                    <img class="b-goodsList__img" :src="product.imageUrl" alt="goods" />
                    <h3>{{product.title}}</h3>
                    <p>{{product.price}} &#8381;</p>
                    <button class="b-goodButton" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                </div>`
})