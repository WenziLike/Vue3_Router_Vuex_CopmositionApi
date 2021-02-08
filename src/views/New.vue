<template>
    <form class="card" @submit.prevent="$emit('sendForm')">
        <h1>Создать новую задачу</h1>
        <div class="form-control"
             v-for="item in formDesc"
             :key="item.id">
            <label :for="item.id" v-if="item.type">
                {{ item.title }}
                <input :type="item.type"
                       :id="item.id"
                       @change="$emit('getValueInput',$event.target)"
                >
            </label>
            <label :for="item.id" v-else>
                {{ item.title }}
                <textarea :id="item.id" v-model="text" @input="getValueTextarea"></textarea>
            </label>
        </div>
        <button class="btn primary" :disabled="!disable" @click="$emit('loadTask')">Создать</button>
    </form>
</template>

<script>

export default {
    emits: ['getValueInput', 'sendForm', 'userChange', 'loadTask'],
    props: {
        disable: Boolean,
        formDesc: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            text: ''
        }
    },
    methods: {
        getValueTextarea() {
            this.$emit('userChange', this.text)
        }
    }
}
</script>