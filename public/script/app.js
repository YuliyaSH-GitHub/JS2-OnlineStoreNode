const API = "http://js2-onlinestorevue/"; //файл json хранится на локальном сервере
const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        basketItems: [],
        isVisibleCart: false,
        // searchLine: '',
        totalSum: null,
    },
    methods: {
        /**
         * Метод получает товары в формате json с локального сервера
         * @param {url} url  url-адрес catalogData.json
         * @returns Promise
         */
        fetchGoods(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        /**
         * Метод производит фильтрацию товаров на странице по введенному в input наименованию
         */
        filterGoods(searchLine) {
            const regexp = new RegExp(searchLine, 'i');
            this.goods = this.goods.filter(product => regexp.test(product.title));
        },
        /**
         * Метод добавляет товары в массив корзины товаров basketItems
         * @param {id: string, title: string, price: string} item 
         */
        addProduct(item) {
            let findItem = this.basketItems.find(elem => elem.id === item.id);
            if (findItem) {
                findItem.count++;
            } else {
                const productItem = Object.assign({
                    count: 1
                }, item);
                this.basketItems.push(productItem);
            }
            this.getTotalSum();
        },
        /**
         * Метод удаляет товары из корзины при клике на кнопку класса productRemoveGoods
         * @param {id: string, title: string, price: string, count: number,} item 
         * @returns this.basketItems - массив товаров корзины
         */
        removeProduct(item) {
            if (item.count > 1) {
                item.count--;
            } else {
                this.basketItems.splice(this.basketItems.indexOf(item), 1);
            }
            this.getTotalSum();

        },
        getTotalSum() {
            let sum = 0;
            this.basketItems.forEach(item => {
                sum += item.price * item.count;
            })
            this.totalSum = sum;
        },
        /**
         * Метод выводит сообщение, если список товаров пуст (json) 
         */
        absentData() {
            alert('Нет данных');
        },
    },
    mounted() {
        /**
         * Метод формирует массив товаров this.goods
         */
        this.fetchGoods(`${API}/catalogData.json`)
            .then(data => {
                if (data == undefined) {
                    this.absentData();
                }
                for (let item of data) {
                    this.goods.push(item);
                }
                // console.log(this.goods);
            })
    }
})