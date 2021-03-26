<template>
    <div class="fill-height" style="background-color:#29bdc1">
        <v-snackbar
        top
        multi-line
        color="success"
        v-model="isSuccess"
        :timeout="2000"
        >{{successMsg}}</v-snackbar>

        <v-dialog
        v-model="isError"
        width="500"
        persistent
        >
        <v-card>
            <v-col
                v-for="error in errorMsg"
                :key="error.id"
                cols="12" lg="12" md="12" sm="12"
            >
                <li>
                    {{ error }}
                </li>
            </v-col>
            <v-divider></v-divider>
            <v-card-actions class="justify-center">
                <v-btn color="primary" depressed rounded  @click="closeErrorMessage()">Close</v-btn>
            </v-card-actions>
            
        </v-card>
        </v-dialog>

        <v-container class="fill-height">
            <v-row row wrap align-center>
                <v-row justify="space-around">
                    <v-card
                        class="mx-auto my-auto rounded-lg"
                        width="350"
                        outlined
                        
                        tile
                    >
                        <v-card-title primary-title class="justify-center">
                        <div>
                            <h3 class="headline black--text text--accent-2">Sign Up</h3>
                        </div>
                        </v-card-title>
                        <v-form>
                            <v-row>
                                <v-flex lg2 md3 sm3></v-flex>
                                <v-flex lg8 md6 sm6>
                                    <v-text-field
                                        label="First Name"
                                        filled
                                        clearable
                                        v-model="firstName"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex lg2 md3 sm3></v-flex>
                            </v-row>
                            <v-row>
                                <v-flex lg2 md3 sm3></v-flex>
                                <v-flex lg8 md6 sm6>
                                    <v-text-field
                                        label="Last Name"
                                        filled
                                        clearable
                                        v-model="lastName"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex lg2 md3 sm3></v-flex>
                            </v-row>
                            <v-row>
                                <v-flex lg2 md3 sm3></v-flex>
                                <v-flex lg8 md6 sm6>
                                    <v-text-field
                                        label="Email"
                                        filled
                                        clearable
                                        v-model="email"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex lg2 md3 sm3></v-flex>
                            </v-row>
                            <v-row>
                                <v-flex lg2 md3 sm3></v-flex>
                                <v-text-field
                                    label="Phone Number"
                                    filled
                                    clearable
                                    v-model="mobileNum"
                                ></v-text-field>
                                <v-flex lg2 md3 sm3></v-flex>
                            </v-row>
                            <v-row>
                                <v-flex lg2 md3 sm3></v-flex>
                                <v-text-field
                                    label="Website URL"
                                    filled
                                    clearable
                                    v-model="weburl"
                                ></v-text-field>
                                <v-flex lg2 md3 sm3></v-flex>
                            </v-row>
                            <v-flex lg12 md12 sm12>
                                <v-card-actions class="justify-center">
                                    <v-btn color="primary" depressed rounded  @click="submitUser()">Create Account</v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-form>
                    </v-card>
                </v-row>

                
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    isSuccess: false,
    isError: false,
    successMsg: null,
    errorMsg: [],
    firstName: '',
    lastName: '',
    email: '',
    mobileNum: '',
    weburl: ''
  }),
  computed: {
  },
  created() {
  },
  methods: {
    submitUser() {
        this.$store.dispatch("signup/createUser", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          mobile_number: this.mobileNum,
          website_url: this.weburl,
        })
        .then((res) => {
          if(res.every(elem => elem === true)){
            this.isSuccess = true;
            this.successMsg = 'You have successfully created an account.';
            this.firstName = '';
            this.lastName = '';
            this.email = '';
            this.mobileNum = '';
            this.weburl = '';
          }else{
            this.isError = true;
            for(let i = 0; i < res.length; i++){
                if(i == 0 && res[0] == false){
                    this.errorMsg.push('First Name contains bad words/swear words/profanities.');
                }else if(i == 1 && res[1] == false){
                    this.errorMsg.push('Last Name contains bad words/swear words/profanities.');
                }else if(i == 2 && res[2] == false){
                    this.errorMsg.push('Email should be valid. Please use your google.com account.');
                }else if(i == 3 && res[3] == false){
                    this.errorMsg.push('Invalid Phone Number. Please use the local number +63');
                }else if(i == 4 && res[4] == false){
                    this.errorMsg.push('Invalid Website URL. Please do not use query strings.');
                }
            }
          }  
        });
    },
    closeErrorMessage(){
        this.isError = false;
        this.errorMsg = [];
    } 
  },
};
</script>