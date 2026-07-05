<template>
  <div class="login-page">
    <div class="login-bg">
      <div class="bg-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
      </div>
    </div>
    <div class="login-container">
      <div class="login-card">
        <div class="card-body">
          <div class="brand-section">
            <img src="/logo.png" alt="JINZA TRADING" class="brand-logo" />
            <h1 class="brand-name">JINZA TRADING SDN. BHD.</h1>
            <p class="brand-subtitle">企业管理系统</p>
          </div>

          <el-form @submit.prevent="onSubmit" class="login-form">
            <el-form-item>
              <el-input
                v-model.trim="form.username"
                placeholder="用户名"
                size="large"
                autofocus
                @keyup.enter="focusPassword"
              >
                <template #prefix><el-icon><User /></el-icon></template>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-input
                ref="passwordInput"
                v-model.trim="form.password"
                type="password" show-password size="large"
                placeholder="密码"
                @keyup.enter="onSubmit"
              >
                <template #prefix><el-icon><Lock /></el-icon></template>
              </el-input>
            </el-form-item>

            <el-button
              type="primary" :loading="submitting"
              @click="onSubmit" class="login-button" size="large"
            >
              登 录
            </el-button>
          </el-form>

          <div class="footer-text">JINZA TRADING SDN. BHD.</div>
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
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const form = ref({ username: '', password: '' })
const submitting = ref(false)
const passwordInput = ref(null)
const { save } = useAuth()

const focusPassword = () => { passwordInput.value?.focus() }

const onSubmit = async () => {
  if (!form.value.username || !form.value.password) {
    ElMessage({ message: '请输入用户名和密码', type: 'warning', duration: 2000 })
    return
  }
  submitting.value = true
  try {
    const res = await api.login(form.value.username, form.value.password)
    save({ token: res.token, user: res.user, perms: res.perms, must_change_password: !!res.must_change_password }, true)
    const redirect = res.must_change_password ? '/change-password' : (route.query.redirect || '/')
    if (res.must_change_password) {
      ElMessage({ message: '首次登录，请修改密码', type: 'warning', duration: 1800 })
    } else {
      ElMessage({ message: '登录成功', type: 'success', duration: 1500 })
    }
    setTimeout(() => { window.location.href = redirect === '/' ? '/' : String(redirect) }, 500)
  } catch (e) {
    const code = e?.code
    let text = ''
    if (code === 'MISSING_CREDENTIALS') text = '请输入用户名和密码'
    else if (code === 'USER_NOT_FOUND') text = '用户不存在'
    else if (code === 'USER_DISABLED') text = '账号已被禁用'
    else if (code === 'INVALID_PASSWORD') text = '密码错误'
    else {
      try { const data = JSON.parse(e.message); text = data?.error || data?.message || '' } catch { text = e?.message || '' }
    }
    if (!text) text = '登录失败，请稍后重试'
    ElMessage({ message: '登录失败：' + text, type: 'error', duration: 3200 })
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
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}
.bg-shapes { position: absolute; inset: 0; }
.shape {
  position: absolute; border-radius: 50%; opacity: 0.08;
}
.shape-1 {
  width: 600px; height: 600px; top: -200px; right: -150px;
  background: radial-gradient(circle, #e94560 0%, transparent 70%);
  animation: float1 14s ease-in-out infinite;
}
.shape-2 {
  width: 450px; height: 450px; bottom: -120px; left: -100px;
  background: radial-gradient(circle, #533483 0%, transparent 70%);
  animation: float2 18s ease-in-out infinite;
}
@keyframes float1 {
  0%, 100% { transform: translate(0,0) scale(1); }
  50% { transform: translate(-40px,30px) scale(1.08); }
}
@keyframes float2 {
  0%, 100% { transform: translate(0,0) scale(1); }
  50% { transform: translate(30px,-40px) scale(1.05); }
}
.login-container {
  position: relative; z-index: 1; width: 100%; max-width: 380px;
  animation: cardIn 0.7s cubic-bezier(.22,.98,.34,1.02) both;
}
@keyframes cardIn {
  0% { opacity: 0; transform: translateY(30px) scale(.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
.login-card {
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(20px) saturate(1.8);
  -webkit-backdrop-filter: blur(20px) saturate(1.8);
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 25px 80px -15px rgba(0,0,0,0.5);
  overflow: hidden;
}
.card-body { padding: 40px 36px 36px; }
.brand-section { text-align: center; margin-bottom: 32px; }
.brand-logo {
  width: 100px; height: auto; margin-bottom: 16px;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
}
.brand-name {
  margin: 0; font-size: 16px; font-weight: 700; letter-spacing: 1px;
  color: rgba(255,255,255,0.9); line-height: 1.3;
}
.brand-subtitle {
  margin: 6px 0 0; font-size: 13px; color: rgba(255,255,255,0.5);
  letter-spacing: 2px;
}
.login-form { display: flex; flex-direction: column; gap: 16px; }
.login-form :deep(.el-input__wrapper) {
  background: rgba(255,255,255,0.1) !important;
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.15) inset;
  transition: all .25s;
}
.login-form :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px rgba(255,255,255,0.3) inset;
}
.login-form :deep(.is-focus.el-input__wrapper) {
  box-shadow: 0 0 0 2px var(--el-color-primary) inset !important;
  background: rgba(255,255,255,0.15) !important;
}
.login-form :deep(.el-input__inner) { color: #fff; font-weight: 500; }
.login-form :deep(.el-input__inner::placeholder) { color: rgba(255,255,255,0.4); }
.login-form :deep(.el-input__prefix) { color: rgba(255,255,255,0.5); }
.login-button {
  width: 100%; height: 48px; margin-top: 4px;
  font-size: 16px; font-weight: 700; letter-spacing: 4px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--el-color-primary), #533483);
  border: none;
  transition: transform .15s, box-shadow .2s;
}
.login-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px -8px var(--el-color-primary);
}
.login-button:active { transform: translateY(0); }
.footer-text {
  text-align: center; margin-top: 24px; padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.08);
  font-size: 11px; color: rgba(255,255,255,0.3);
  letter-spacing: 1px;
}
</style>
