<style lang="less" scoped>

    .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 40px; /*脚部的高度*/
        clear: both;
        margin-left: 6rem;
        z-index: 999;
    }

    .header {
        position: absolute;
        top: 0;
        width: 100%;
        height: 40px; /*脚部的高度*/
        clear: both;
        z-index: 999;
        margin-left: 6rem;
        margin-top: 10px;
    }

    .header a {
        color: #FFFFFF;
    }

    .homepage-hero-module,
    .video-container {
        position: relative;
        height: 100vh;
        overflow: hidden;
    }

    .video-container .poster img,
    .video-container video {
        z-index: 0;
        position: absolute;
    }

    .video-container .filter {
        z-index: 1;
        position: absolute;
        background: rgba(0, 0, 0, 0.4);
    }

    .div-a {
        position: absolute;
        width: 100%;

        .login-form-box{
            width: 100%;
            height: calc(100vh - 80px);
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>

<template>
    <div>
        <div class="header">
            <Row type="flex" justify="start" align="middle">
                <Col span="1">
                    <Button v-if="switchCode" type="default" ghost @click="register = true" size="small"
                            style="z-index: 9999">
                        {{ $t('sign') }}
                    </Button
                    >
                </Col>
            </Row>
        </div>
        <div style="z-index: 100" class="div-a">
            <div class="login-form-box">
                <Form label-position="right">
                    <FormItem>
                        <img src="../../assets/wyytlogo.png" width="80px" align="center">
                    </FormItem>
                    <form-item>
                        <span style="font-size: 50px;color: #2b85e4">数据管理平台</span>
                    </form-item>
                    <FormItem>
                        <Input style="opacity: 0.6" :placeholder="$t('account')"
                               v-model="formInline.user"></Input>
                    </FormItem>
                    <FormItem>
                        <Input style="opacity: 0.6" :placeholder="$t('password')" v-model="formInline.password"
                               type="password"></Input>
                    </FormItem>

                    <FormItem>
                        <Checkbox v-model="ldap_is_open"><span style="color: #FFFFFF;">{{ $t('ldap') }}</span>
                        </Checkbox>
                    </FormItem>
                    <FormItem>
                        <Button long type="primary" ghost @click="signIn"> 登录</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
        <div class="footer">
            <Row type="flex" justify="start" align="bottom" style="z-index: 999">
            </Row>
        </div>
        <div class="homepage-hero-module">
            <div class="video-container">
                <div :style="fixStyle" class="filter">

                </div>
                <img :style="fixStyle" src="../../assets/background.png" autoplay loop class="fillWidth" v-on:canplay="canplay" muted>
                </img>
            </div>
        </div>

        <Modal
                v-model="register"
                @on-ok="LoginRegister"
                :title="$t('sign')"
                :ok-text="$t('sign')"
                :mask-closable="false"
        >
            <Form ref="user_reg" :model="userinfo" :rules="userInfoValidate">
                <FormItem :label="$t('sign_userInfo.username')" prop="username">
                    <Input v-model="userinfo.username"></Input>
                </FormItem>

                <FormItem :label="$t('sign_userInfo.password')" prop="password">
                    <Input type="password" v-model="userinfo.password"></Input>
                </FormItem>

                <FormItem :label="$t('sign_userInfo.confirm')" prop="confirm_password">
                    <Input v-model="userinfo.confirm_password" type="password"></Input>
                </FormItem>

                <FormItem prop="real_name" :label="$t('sign_userInfo.real')">
                    <Input v-model="userinfo.real_name"></Input>
                </FormItem>

                <FormItem prop="department" :label="$t('sign_userInfo.department')">
                    <Input v-model="userinfo.department"></Input>
                </FormItem>

                <FormItem prop="mail" :label="$t('sign_userInfo.mail')">
                    <Input v-model="userinfo.mail"></Input>
                </FormItem>
            </Form>
        </Modal>



    </div>

</template>
<script lang="ts">
    import SIdentify from '@/components/identify.vue'
    import {Mixins, Component} from "vue-property-decorator";
    import i18n from '@/language';
    import Basic from "@/mixins/basic";
    import {AxiosResponse} from "axios";
    import {Res} from "@/interface";
    import {request} from "@/libs/requests";
    import {LoginApi} from "@/apis/loginApis";

    @Component({components: {SIdentify}})
    export default class login extends Mixins(Basic) {

        valid_password = (rule: any, value: string, callback: any) => {
            if (value !== this.userinfo.password) {
                callback(new Error(i18n.t('sign_up_validate.twice') as any))
            } else {
                callback()
            }
        };
        regExp_password = (rule: any, value: string, callback: any) => {
            let pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
            if (!pPattern.test(value)) {
                callback(new Error(i18n.t('sign_up_validate.regexp') as any))
            } else {
                callback()
            }
        };
        switchCode = false;
        sponsorship = false;
        register = false;
        userinfo = {
            username: '',
            password: '',
            confirm_password: '',
            mail: '',
            real_name: '',
            department: ''
        };
        userInfoValidate = {
            username: [
                {
                    required: true,
                    message: i18n.t('sign_up_validate.username'),
                    trigger: 'blur'
                }
            ],
            password: [
                {
                    required: true,
                    message: i18n.t('sign_up_validate.password'),
                    trigger: 'blur'
                },
                {
                    min: 6,
                    message: i18n.t('sign_up_validate.min'),
                    trigger: 'blur'
                },
                {
                    max: 32,
                    message: i18n.t('sign_up_validate.max'),
                    trigger: 'blur'
                },
                {
                    validator: this.regExp_password,
                    trigger: 'blur'
                }
            ],
            confirm_password: [
                {
                    required: true,
                    message: i18n.t('sign_up_validate.confirm'),
                    trigger: 'blur'
                },
                {
                    validator: this.valid_password,
                    trigger: 'blur'
                }
            ],
            real_name: [
                {
                    required: true,
                    message: i18n.t('sign_up_validate.real'),
                    trigger: 'blur'
                }
            ],
            department: [
                {
                    required: true,
                    message: i18n.t('sign_up_validate.department'),
                    trigger: 'blur'
                }
            ],
            mail: [
                {required: true, message: i18n.t('sign_up_validate.mail'), trigger: 'blur'},
                {type: 'email', message: i18n.t('sign_up_validate.mail_format'), trigger: 'blur'}
            ]
        };
        formInline = {
            user: '',
            password: '',
            code: ''
        };
        check_code = '';
        replace = false;

        checkCode(vl: string) {
            this.check_code = vl.toLowerCase()
        }

        LoginRegister() {
            let is_validate: any = this.$refs['user_reg'];
            is_validate.validate((valid: boolean) => {
                if (valid) {
                    request.post("/register", this.userinfo)
                        .finally(() => this.resetFields('user_reg'))
                } else {
                    this.$config.notice(i18n.t('sign_up_validate.sign_fail') as string)
                }
            })
        }

        signIn() {
            if (this.check_code !== this.formInline.code.toLowerCase()) {
                this.$config.message('warning', i18n.t('sign_up_validate.pin') as string)
                this.replace = !this.replace;
                return;
            }
            LoginApi(this.ldap_is_open, {
                username: this.formInline.user,
                password: this.formInline.password
            })
                .then((res: AxiosResponse<Res>) => {
                    if (res.data.payload.code === 1301) {
                        return
                    }
                    request.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.payload.token;
                    sessionStorage.setItem('jwt', 'Bearer ' + res.data.payload.token)
                    sessionStorage.setItem('user', this.formInline.user);
                    sessionStorage.setItem('auth', res.data.payload.permissions);
                    sessionStorage.setItem('real_name', res.data.payload.real_name);
                    let auth = res.data.payload.permissions
                    if (auth === 'guest') {
                        sessionStorage.setItem('access', '1')
                    } else if (auth === 'admin' || auth === 'perform') {
                        sessionStorage.setItem('access', '2')
                    } else if (auth === 'super') {
                        sessionStorage.setItem('access', '3')
                    }
                    this.$router.push({name: 'home_index'})
                })
        }

        vedioCanPlay = false
        fixStyle = '' as any

        canplay() {
            this.vedioCanPlay = true
        }

        mask() {
            const windowWidth = document.body.clientWidth
            const windowHeight = document.body.clientHeight
            const windowAspectRatio = windowHeight / windowWidth
            let videoWidth
            let videoHeight
            if (windowAspectRatio < 0.5625) {
                videoWidth = windowWidth
                videoHeight = videoWidth * 0.5625
                this.fixStyle = {
                    height: windowWidth * 0.5625 + 'px',
                    width: windowWidth + 'px',
                    'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
                    'margin-left': 'initial'
                }
            } else {
                videoHeight = windowHeight
                videoWidth = videoHeight / 0.5625
                this.fixStyle = {
                    height: windowHeight + 'px',
                    width: windowHeight / 0.5625 + 'px',
                    'margin-left': (windowWidth - videoWidth) / 2 + 'px',
                    'margin-bottom': 'initial'
                }
            }
        }

        mounted() {
            window.onresize = () => {
                this.mask()
            }
            this.mask()
            request.get(`/fetch`)
                .then((res: AxiosResponse<Res>) => {
                    this.switchCode = res.data.payload.reg;
                })
        }
    }
</script>
