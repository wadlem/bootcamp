<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Connect with facebook</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <v-btn
                    icon
                    large
                    target="_blank"
                    slot="activator"
                  >
                    <v-icon large></v-icon>
                  </v-btn>
                  <span>Problem!</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-actions>
                <v-flex class="text-xs-center">
                  <a href="http://localhost:1337/connect"><v-btn color="primary" dark large>Launch</v-btn></a>
                </v-flex>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {}
</script>