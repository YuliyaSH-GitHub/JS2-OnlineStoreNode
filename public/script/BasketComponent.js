Vue.component('basket', {
    props: ['basketarray', 'visibility', 'totalsum'],
    template: `
                <div v-if="visibility" class="b-OnlineStoreHeader__dropdownMenu b-OnlineStoreHeader__dropdownMenu_right">
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
                            <productbasket v-for="item of basketarray" 
                            :key="item.id"
                            :productbasket="item"></productbasket>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="2" scope="row">Итого:</th>
                                <td colspan="3">
                                    <span class="total">{{totalsum}}</span>
                                    <i class="fas fa-ruble-sign"></i>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>`
});
Vue.component('productbasket', {
    props: ['productbasket'],
    template: `
                <tr>
                <th scope="row">{{productbasket.id}}</th>
                <td>{{productbasket.title}}</td>
                <td>{{productbasket.price}}</td>
                <td class="productCount">{{productbasket.count}}</td>
                <td @click="$parent.$emit('removeproduct', productbasket)"><i class="fas fa-trash-alt productRemoveGoods"></i></td>
                </tr>`
});