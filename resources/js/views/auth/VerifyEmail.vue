<template>
    <div>
        <h1 class="text-center mb-5">Verifying email</h1>
    </div>
</template>

<script>
    export default {
        name: "VerifyEmail",
        created() {
            axios.post('/api/auth/email-verification', {
              id: this.$route.query.id,
              hash: this.$route.query.hash
            }).then(() => {
                    this.$router.push('/login')
                  })
        }
    }
</script>

<style scoped>
</style>
