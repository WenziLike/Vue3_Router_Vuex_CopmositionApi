<template>
    <the-navbar></the-navbar>
    <div class="container with-nav">
        <router-view :task="task"></router-view>
    </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
import axios from 'axios'

export default {
    data() {
        return {
            task: []
        }
    },
    provide() {
        return {
            formDesc: [
                { id: 'title', title: 'Название', type: 'text' },
                { id: 'date', title: 'Дата дэдлайна', type: 'date' },
                { id: 'description', title: 'Описание' }
            ],
            sendForm: this.sendForm,
            loadTask: this.loadTask
        }
    },
    mounted() {
        this.loadTask()
    },
    methods: {
        async sendForm(value) {
            /* отправляем форму */
            const response =
                await fetch('https://vue-database-57694-default-rtdb.firebaseio.com/task.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: value.title,
                        date: value.date,
                        description: value.description
                    })
                })
            const firebaseData = await response.json()
            console.log(firebaseData)

            this.task.push({
                title: value.title,
                date: value.date,
                description: value.description,
                id: firebaseData.name
            })
            // value.title = ''
            // value.date = ''
            // value.description = ''
        },
        async loadTask() {
            setTimeout(async () => {
                try {
                    const { data } = await axios.get(
                        'https://vue-database-57694-default-rtdb.firebaseio.com/task.json'
                    )

                    if (!data) {
                        throw new Error('The Noo Tasks in database!!!')
                    }
                    this.task = Object.keys(data).map(key => {
                        return {
                            id: key,
                            ...data[key]
                        }
                    })
                } catch (e) {
                    console.warn('Error!!!!!')
                }
            }, 1500)
        }
    },
    components: {
        TheNavbar
    }
}
</script>
