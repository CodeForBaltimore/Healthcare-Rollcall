<template>
    <div id="secure">
        <h1>Secure Area</h1>
        <b-container>
            <b-row>
                <b-col>Column 1</b-col>
                <b-col>Column 2</b-col>
                <b-col>Column 3</b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: 'secure',
        data() {
            return {};
        }
    }
</script>

<style scoped>
    #secure {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
    }
</style>