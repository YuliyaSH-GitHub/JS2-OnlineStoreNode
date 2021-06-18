Vue.component('search', {
    data() {
        return {
            searchLine: ''
        }
    },
    template: `
                <form action="#" class="searchForm" @submit.prevent='$parent.filterGoods(searchLine)'>
                    <input type="text" class="searchField" v-model="searchLine"/>
                    <button class="btnSearch" type="submit">
                    <i class="fas fa-search iconBtnSearch"></i>
                    </button>
                </form>
                `
})