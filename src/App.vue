<template>
    <the-navbar></the-navbar>
    <div class="container with-nav">
        <router-view
            :valueDataBase="valueDataBase"
            :disable="onDisable"
            :form-desc="formDesc"
            @loadTask="loadTask"
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
            title: '',
            date: '',
            description: '',
            valueDataBase: [],
        }
    },
    methods: {
        onChange(value) {
            this.description = value
        },
        getValue(event) {
            /* тут добавляем значения */
            if (event.type === 'text') {
                this.title = event.value
                console.log('text:', event.value)
            } else {
                console.log('date:', event.value)
                this.date = event.value
            }
        },
        async sendForm() {
            /* отправляем форму */
            const response =
                await fetch('https://vue-database-57694-default-rtdb.firebaseio.com/task.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: this.title,
                        date: this.date,
                        description: this.description
                    })
                })
            const firebaseData = await response.json()
            console.log(firebaseData)

            this.valueDataBase.push({
                title: this.title,
                date: this.date,
                description: this.description
            })
            this.title = ''
            this.date = ''
            this.description = ''
        },
        async loadTask() {
            setTimeout(async () => {
                try {
                    const response = await fetch(
                        'https://vue-database-57694-default-rtdb.firebaseio.com/task.json'
                    )
                    if (!response) {
                        throw new Error('The Noo Tasks in database!!!')
                    }

                    const data = await response.json()
                    this.valueDataBase = Object.keys(data).map(key => {
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
    computed: {
        onDisable() {
            return !!(this.title && this.date && this.description)
        }
    },
    components: {
        TheNavbar
    }
}
</script>
