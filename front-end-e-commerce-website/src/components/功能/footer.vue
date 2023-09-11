<style scoped>
#footer {
    background-color: black;
    height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#footer div {
    color: white;
    font-size: 5px;
    display: flex;
    align-items: center;
    margin: 5px;
    font-family: 'Jockey One', sans-serif;
}
#footer img {
    width: 15px;
    height: 15px;
}
@media screen and (min-width: 768px) {
    #footer {
        height: 40px;
    }
    #footer div {
        font-size: 15px;
        margin: 10px;
    }
    #footer img {
        width: 30px;
        height: 30px;
    }
}
</style>

<template>
    <div id="footer">
        <div><img src="\logo\logo.png" alt="" /></div>
        <div id="copyright">Copyright © 2023 StepBrother</div>
        <div id="follow">follow us</div>
    </div>
</template>

<script setup></script>
