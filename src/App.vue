<template>
    <the-navbar></the-navbar>
    <div class="container with-nav">
        <router-view
            :disable="onDisable"
            :form-desc="formDesc"
            @userChange="onChange"
            @getValueInput="getValue"
            @send-form="sendForm"
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
            ],
            data: [],
            message: ''
        }
    },
    methods: {
        onChange(value) {
            this.message = value
        },
        getValue(event) {
            /* тут добавляем значения */
            if (event.type === 'text' || event.type === 'date') {
                this.data.push(event.value)
            }
        },
        sendForm(event) {
            /* отправляем форму */
            this.data.push(this.message)
            console.log(this.data)
            console.log(event)
        }
    },
    computed: {
        onDisable() {
            return !!(this.data.length >= 2 && this.message)
        }
    },
    components: {
        TheNavbar
    }
}
</script>
