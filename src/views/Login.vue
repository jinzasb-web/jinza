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
        <div class="card-left">
          <div class="brand-section">
            <img src="/logo.png" alt="JINZA" class="brand-logo" />
            <h1 class="brand-name">JINZA TRADING</h1>
            <p class="brand-subtitle">SDN. BHD.</p>
            <div class="brand-divider"></div>
            <p class="brand-tagline">企业管理系统</p>
          </div>
        </div>
        <div class="card-right">
          <h2 class="welcome-title">欢迎登录</h2>
          <p class="welcome-desc">请输入您的账号信息</p>
          <el-form @submit.prevent="onSubmit" class="login-form">
            <el-form-item>
              <el-input v-model.trim="form.username" placeholder="用户名" size="large" autofocus @keyup.enter="focusPassword">
                <template #prefix><el-icon><User /></el-icon></template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input ref="passwordInput" v-model.trim="form.password" type="password" show-password size="large" placeholder="密码" @keyup.enter="onSubmit">
                <template #prefix><el-icon><Lock /></el-icon></template>
              </el-input>
            </el-form-item>
            <el-button type="primary" :loading="submitting" @click="onSubmit" class="login-button" size="large">登 录</el-button>
          </el-form>
        </div>
      </div>
      <div class="login-footer">JINZA TRADING SDN. BHD.</div>
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
    const code = e?.code; let text = ''
    if (code === 'MISSING_CREDENTIALS') text = '请输入用户名和密码'
    else if (code === 'USER_NOT_FOUND') text = '用户不存在'
    else if (code === 'USER_DISABLED') text = '账号已被禁用'
    else if (code === 'INVALID_PASSWORD') text = '密码错误'
    else { try { text = JSON.parse(e.message)?.error || e?.message || '' } catch { text = e?.message || '' } }
    ElMessage({ message: '登录失败：' + (text || '请稍后重试'), type: 'error', duration: 3200 })
  } finally { submitting.value = false }
}
</script>

<style scoped>
.login-page {
  position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f0 100%);
  overflow: hidden;
}
.login-bg { position: fixed; inset: 0; z-index: 0; overflow: hidden; }
.bg-shapes { position: absolute; inset: 0; }
.shape { position: absolute; border-radius: 50%; }
.shape-1 {
  width: 600px; height: 600px; top: -200px; right: -150px;
  background: radial-gradient(circle, rgba(13,47,85,0.04) 0%, transparent 70%);
  animation: float1 14s ease-in-out infinite;
}
.shape-2 {
  width: 400px; height: 400px; bottom: -120px; left: -80px;
  background: radial-gradient(circle, rgba(238,128,37,0.05) 0%, transparent 70%);
  animation: float2 18s ease-in-out infinite;
}
@keyframes float1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-30px,25px) scale(1.04)} }
@keyframes float2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(25px,-30px) scale(1.06)} }
.login-container {
  position: relative; z-index: 1; width: 100%; max-width: 800px;
  animation: cardIn .6s cubic-bezier(.22,.98,.34,1.02) both;
}
@keyframes cardIn { 0%{opacity:0;transform:translateY(20px) scale(.98)} 100%{opacity:1;transform:translateY(0) scale(1)} }
.login-card {
  display: flex; border-radius: 20px; overflow: hidden;
  background: #fff;
  box-shadow: 0 20px 60px -12px rgba(0,0,0,0.15), 0 4px 18px -6px rgba(0,0,0,0.08);
}
.card-left {
  width: 320px; flex-shrink: 0;
  background: linear-gradient(135deg, #0d2f55 0%, #0a2540 100%);
  display: flex; align-items: center; justify-content: center;
  padding: 40px;
}
.brand-section { text-align: center; color: #fff; }
.brand-logo {
  width: 140px; height: auto; margin-bottom: 20px;
  background: #fff; padding: 12px; border-radius: 16px;
  box-shadow: 0 8px 30px -8px rgba(0,0,0,0.3);
}
.brand-name {
  margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 1px;
  color: #fff; line-height: 1.2;
}
.brand-subtitle {
  margin: 2px 0 0; font-size: 14px; color: rgba(255,255,255,0.7);
  letter-spacing: 3px;
}
.brand-divider {
  width: 60px; height: 3px;
  background: linear-gradient(90deg, #8daf50, #ee8025);
  margin: 20px auto; border-radius: 2px;
}
.brand-tagline {
  margin: 0; font-size: 15px; color: #8daf50;
  letter-spacing: 4px; font-weight: 600;
}
.card-right {
  flex: 1; padding: 48px 40px;
  display: flex; flex-direction: column; justify-content: center;
}
.welcome-title {
  margin: 0 0 4px; font-size: 24px; font-weight: 700;
  color: #0d2f55;
}
.welcome-desc {
  margin: 0 0 28px; font-size: 14px; color: #909399;
}
.login-form { display: flex; flex-direction: column; gap: 18px; }
.login-form :deep(.el-form-item) { margin-bottom: 0; }
.login-form :deep(.el-input__wrapper) { border-radius: 10px; box-shadow: 0 0 0 1px #e4e7ed inset; transition: all .25s; }
.login-form :deep(.el-input__wrapper:hover) { box-shadow: 0 0 0 1px #8daf50 inset; }
.login-form :deep(.is-focus.el-input__wrapper) { box-shadow: 0 0 0 2px #ee8025 inset!important; }
.login-form :deep(.el-input__inner) { font-weight: 500; color: #303133; }
.login-form :deep(.el-input__prefix) { color: #c0c4cc; }
.login-button {
  width: 100%; height: 46px; font-size: 16px; font-weight: 700; letter-spacing: 4px;
  border-radius: 10px; border: none;
  background: linear-gradient(135deg, #ee8025 0%, #d4650a 100%);
  box-shadow: 0 6px 20px -6px rgba(238,128,37,0.4);
  transition: transform .15s, box-shadow .2s;
}
.login-button:hover { transform: translateY(-1px); box-shadow: 0 8px 28px -8px rgba(238,128,37,0.5); }
.login-button:active { transform: translateY(0); }
.login-footer {
  text-align: center; margin-top: 16px;
  font-size: 12px; color: #c0c4cc; letter-spacing: 1px;
}
@media (max-width: 700px) {
  .login-card { flex-direction: column; }
  .card-left { width: 100%; padding: 32px; }
  .card-right { padding: 32px 28px; }
  .brand-logo { width: 100px; }
  .brand-name { font-size: 18px; }
}
</style>
