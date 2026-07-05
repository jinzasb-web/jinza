<template>
  <div class="login-page">
    <div class="login-bg">
      <div class="bg-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </div>
    <div class="login-container">
      <div class="login-card">
        <div class="card-header">
          <div class="brand">
            <div class="brand-icon">
              <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
                <rect width="40" height="40" rx="10" fill="var(--el-color-primary)"/>
                <text x="20" y="26" text-anchor="middle" fill="#fff" font-size="20" font-weight="700" font-family="system-ui">J</text>
              </svg>
            </div>
            <div class="brand-text">
              <h1 class="brand-name">JINZA</h1>
              <p class="brand-subtitle">{{ t('app.subtitle') || 'Enterprise Management' }}</p>
            </div>
          </div>
          <div class="lang-toggle">
            <el-switch
              :model-value="locale.value === 'en'"
              :active-text="'EN'"
              :inactive-text="'中文'"
              inline-prompt
              size="small"
              @change="v => setLang(v ? 'en' : 'zh')"
            />
          </div>
        </div>

        <div class="card-body">
          <h2 class="welcome-title">{{ t('login.welcome') }}</h2>
          <p class="welcome-desc">{{ t('login.pleaseSignIn') }}</p>

          <el-form @submit.prevent="onSubmit" class="login-form" label-position="top">
            <el-form-item :label="t('login.username')">
              <el-input v-model.trim="form.username" :placeholder="t('login.usernamePlaceholder') || t('login.username')" size="large" autofocus @keyup.enter="focusPassword">
                <template #prefix><el-icon><User /></el-icon></template>
              </el-input>
            </el-form-item>

            <el-form-item :label="t('login.password')">
              <el-input ref="passwordInput" v-model.trim="form.password" type="password" show-password size="large" :placeholder="t('login.passwordPlaceholder') || t('login.password')" @keyup.enter="onSubmit">
                <template #prefix><el-icon><Lock /></el-icon></template>
              </el-input>
            </el-form-item>

            <div class="login-options">
              <el-checkbox v-model="remember">{{ t('login.rememberMe') }}</el-checkbox>
            </div>

            <el-button type="primary" :loading="submitting" @click="onSubmit" class="login-button" size="large">
              {{ t('login.submit') }}
            </el-button>
          </el-form>
        </div>

        <div class="card-footer">
          <p class="footer-text">JINZA Trading Sdn. Bhd. &copy; {{ new Date().getFullYear() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { api } from '@/api'
import { useAuth } from '@/composables/useAuth'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const form = ref({ username: '', password: '' })
const remember = ref(true)
const submitting = ref(false)
const passwordInput = ref(null)
const { t, locale } = useI18n()
const { save } = useAuth()

function setLang(value) {
  if (locale.value === value) return
  locale.value = value
  sessionStorage.setItem('lang', value)
  localStorage.setItem('lang', value)
}

const focusPassword = () => { passwordInput.value?.focus() }

const onSubmit = async () => {
  if (!form.value.username || !form.value.password) {
    ElMessage({ message: t('login.errors.missingCredentials'), type: 'warning', duration: 2000 })
    return
  }
  submitting.value = true
  try {
    const res = await api.login(form.value.username, form.value.password)
    save({ token: res.token, user: res.user, perms: res.perms, must_change_password: !!res.must_change_password }, remember.value)
    const redirect = res.must_change_password ? '/change-password' : (route.query.redirect || '/')
    if (res.must_change_password) {
      ElMessage({ message: t('login.firstLoginTip'), type: 'warning', duration: 1800 })
    } else {
      ElMessage({ message: t('login.successEntering'), type: 'success', duration: 1500 })
    }
    setTimeout(() => { window.location.href = redirect === '/' ? '/' : String(redirect) }, 500)
  } catch (e) {
    const code = e?.code
    let text = ''
    if (code === 'MISSING_CREDENTIALS') text = t('login.errors.missingCredentials')
    else if (code === 'USER_NOT_FOUND') text = t('login.errors.userNotFound')
    else if (code === 'USER_DISABLED') text = t('login.errors.userDisabled')
    else if (code === 'INVALID_PASSWORD') text = t('login.errors.invalidPassword')
    else {
      try { const data = JSON.parse(e.message); text = data?.error || data?.message || '' } catch { text = e?.message || '' }
    }
    if (!text) text = t('login.errors.defaultError')
    ElMessage({ message: t('login.failedWithMsg', { msg: text }), type: 'error', duration: 3200 })
  } finally { submitting.value = false }
}
</script>

<style scoped>
.login-page {
  position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center;
  padding: 24px; overflow: hidden;
}
.login-bg {
  position: fixed; inset: 0; z-index: 0; overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.bg-shapes { position: absolute; inset: 0; }
.shape {
  position: absolute; border-radius: 50%; opacity: 0.15;
}
.shape-1 {
  width: 600px; height: 600px; top: -150px; right: -100px;
  background: radial-gradient(circle, #fff 0%, transparent 70%);
  animation: float 12s ease-in-out infinite;
}
.shape-2 {
  width: 400px; height: 400px; bottom: -80px; left: -80px;
  background: radial-gradient(circle, #fff 0%, transparent 70%);
  animation: float 16s ease-in-out infinite reverse;
}
.shape-3 {
  width: 250px; height: 250px; top: 40%; left: 60%;
  background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
  animation: float 10s ease-in-out infinite 2s;
}
@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}
.login-container {
  position: relative; z-index: 1; width: 100%; max-width: 420px;
  animation: cardEnter 0.6s cubic-bezier(.22,.98,.34,1.02) both;
}
@keyframes cardEnter {
  0% { opacity: 0; transform: translateY(24px) scale(.97); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
.login-card {
  background: #fff; border-radius: 16px;
  box-shadow: 0 20px 60px -12px rgba(0,0,0,.25), 0 4px 18px -6px rgba(0,0,0,.15);
  overflow: hidden;
}
.card-header {
  display: flex; align-items: center; justify-content: space-between; padding: 28px 32px 0;
}
.brand { display: flex; align-items: center; gap: 12px; }
.brand-icon { flex-shrink: 0; }
.brand-name { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 1px; color: #303133; line-height: 1.2; }
.brand-subtitle { margin: 2px 0 0; font-size: 12px; color: #909399; }
.lang-toggle { flex-shrink: 0; }
.card-body { padding: 28px 32px 20px; }
.welcome-title { margin: 0 0 4px; font-size: 20px; font-weight: 700; color: #303133; }
.welcome-desc { margin: 0 0 24px; font-size: 14px; color: #909399; }
.login-form { display: flex; flex-direction: column; gap: 18px; }
.login-form :deep(.el-form-item) { margin-bottom: 0; }
.login-form :deep(.el-form-item__label) { font-size: 13px; font-weight: 600; color: #303133; padding-bottom: 4px; }
.login-form :deep(.el-input__wrapper) { border-radius: 10px; box-shadow: 0 0 0 1px #dcdfe6 inset; transition: box-shadow .2s; }
.login-form :deep(.el-input__wrapper:hover) { box-shadow: 0 0 0 1px #409eff inset; }
.login-form :deep(.is-focus.el-input__wrapper) { box-shadow: 0 0 0 2px #409eff inset !important; }
.login-form :deep(.el-input__inner) { font-weight: 500; }
.login-form :deep(.el-input__prefix) { color: #c0c4cc; }
.login-options { display: flex; justify-content: space-between; align-items: center; margin: 2px 0; }
.login-button { width: 100%; height: 46px; font-size: 15px; font-weight: 700; letter-spacing: .5px; border-radius: 10px; margin-top: 4px; transition: transform .15s, box-shadow .2s; }
.login-button:hover { transform: translateY(-1px); box-shadow: 0 6px 20px -6px #409eff; }
.login-button:active { transform: translateY(0); }
.card-footer { padding: 16px 32px 20px; border-top: 1px solid #ebeef5; }
.footer-text { margin: 0; font-size: 12px; color: #c0c4cc; text-align: center; }
@media (max-width: 480px) {
  .login-page { padding: 16px; }
  .card-header { padding: 24px 24px 0; }
  .card-body { padding: 24px 24px 16px; }
  .card-footer { padding: 12px 24px 16px; }
}
</style>
