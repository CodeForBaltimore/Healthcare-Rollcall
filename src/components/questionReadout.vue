<template>
    <div>
        <h5>Question {{ number + 1 }}</h5>
        <div v-if="question.parts.length > 1">
            <div v-for="(part, index) in question.parts" :key="index" class="question-part">
                <h6>Part {{ index | numberToLetter }}</h6>
                <p>{{ part.label }}</p>
                <p class="response" v-for="(value, index) in part.value" :key="index">&quot;{{ value }}&quot;</p>
            </div>
        </div>
        <div v-if="question.parts.length == 1">
            <p>{{ question.parts[0].label }}</p>
            <p class="response" v-for="(value, index) in question.parts[0].value" :key="index">&quot;{{ value }}&quot;</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "questionReadout",
        props: ['question', 'number']
    }
</script>

<style scoped>
    h6 {
        font-weight: bold;
        background-color: #f1f1f1;
        box-sizing: border-box;
        padding: 8px;
    }
    h5 {
        border-bottom: 2px solid #42484f;
        padding-bottom: 8px;
        margin: 16px 0;
    }
    p {
        margin-bottom: 8px;
    }
    .question-part p {
        padding: 0 8px;
    }
    p.response {
        padding: 0 16px;
        margin-bottom: 15px;
        color: #5b5b5b;
        font-weight: bold;
        font-size: 14px;
    }
</style>