Vue.component('cart', {
    data() {
        return {
            isVisibleCart: false,
            cartItems: [],
            totalSum: 0,

        }
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id === item.id);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id}`, {
                        quantity: 1
                    })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({
                    quantity: 1
                }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }
            this.getTotalSum();
        },
        remove(product) {
            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${product.id}`, {
                        quantity: -1
                    })
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${product.id}`, product)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        } else {
                            console.log('error');
                        }
                    })
            }
            this.getTotalSum();
        },
        getTotalSum() {
            let sum = 0;
            this.cartItems.forEach(item => {
                sum += item.price * item.quantity;
            })
            this.totalSum = sum;
        },
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el)
                }
            });
    },
    template: `
            <div>
            <button @click="isVisibleCart=!isVisibleCart" class="b-OnlineStoreHeader__basketButton">Корзина</button>
            <div v-if="isVisibleCart" class="b-OnlineStoreHeader__dropdownMenu b-OnlineStoreHeader__dropdownMenu_right">
            <table class="b-OnlineStoreHeader__table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Имя</th>
                        <th scope="col">Цена</th>
                        <th scope="col">Количество</th>
                        <th scope="col">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <cart-item  v-for="item of cartItems" 
                    :key="item.id"
                    :cart-item="item"
                    @remove="remove"></cart-item>
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="2" scope="row">Итого:</th>
                        <td colspan="3">
                            <span class="total">{{this.totalSum}}</span>
                            <i class="fas fa-ruble-sign"></i>
                        </td>
                    </tr>
                </tfoot>
            </table>
            </div>
            </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `            
            <tr>
            <th scope="row">{{cartItem.id}}</th>
            <td>{{cartItem.title}}</td>
            <td>{{cartItem.price}}</td>
            <td class="productCount">{{cartItem.quantity}}</td>
            <td @click="$emit('remove', cartItem)"><i class="fas fa-trash-alt productRemoveGoods"></i></td>
            </tr>`
})

