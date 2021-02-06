<template>
    <the-navbar></the-navbar>
    <div class="container with-nav">
        <router-view
            :form-desc="formDesc"
            @selected-item="click"
        ></router-view>
    </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'

export default {
    data() {
        return {
            formDesc: [
                { id: 'title', title: 'Название', type: 'text' },
                { id: 'date', title: 'Дата дэдлайна', type: 'date' },
                { id: 'description', title: 'Описание' }
            ]
        }
    },
    methods: {
        click(event) {
            console.log(event.value)
        }
    },
    components: {
        TheNavbar
    }
}
</script>
