<template>
  <div class="timer">
    {{ this.$store.state.timerCount }}
  </div>
</template>

<script>

export default {

  data() {
    return {
      //timerCount: 8
    }
  },
  props:['showModal', 'isQuestionOpen'],

  watch: {

    timerCount: {
      handler(value) {

        if (value > 0) {
          setTimeout(() => {
            this.$store.state.timerCount--;
          }, 1000);
        }
        else {
          this.showModal = false;
          this.isQuestionOpen = false;
          //this.isWrong = true;
          this.$store.commit('setScore', this.$store.state.score - this.value);
                }

      },
      immediate: true // This ensures the watcher is triggered upon creation
    }

  }
}

</script>