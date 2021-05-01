<template>
    <nav class="navbar is-dark">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item"><strong>VueDjangoApp</strong>
            </router-link>
        </div>
        <div class="navbar-menu">
            <div class="navbar-end">
                
                <!--add leads link on the menu-->
                <router-link to="/dashboard/leads" class="navbar-item">Leads</router-link>

                <div class="navbar-item">
                    <div class="buttons">

                        <!--hide signup/login buttons when authenticated-->
                        <template v-if="!$store.state.isAuthenticated">
                            <router-link to="/sign-up" class="button is-success">
                                <strong>Sign Up</strong>
                            </router-link>
                            <router-link to="/log-in" class="button is-light">Log In</router-link>
                        </template>

                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>
