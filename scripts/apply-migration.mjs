import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置数据库连接
// 仅允许通过环境变量 DATABASE_URL 指定；绝不在此文件写死连接串（本文件曾泄漏过生产库口令，须轮换）
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('ERROR: DATABASE_URL is not set. Aborting.');
  process.exit(1);
}

const { Pool } = pg;
const pool = new Pool({
  connectionString,
  ssl: process.env.PGSSLMODE === 'disable' ? false : { rejectUnauthorized: false },
});

async function applyMigration() {
  try {
    console.log('开始执行迁移文件...');
    // 读取迁移文件内容
    const migrationPath = path.join(__dirname, '..', 'migrations', '20251012_create_account_management_table.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    // 执行SQL
    console.log('正在创建 account_management 表...');
    await pool.query(sql);
    console.log('迁移成功完成！account_management 表已创建。');
  } catch (error) {
    console.error('执行迁移文件时发生错误:', error);
    // 如果错误是表已存在，则视为成功
    if (error.message && error.message.includes('already exists')) {
      console.log('表已存在，无需创建。');
    } else {
      // 之前这里会吞掉所有错误并以退出码 0 结束（假成功），例如迁移文件不存在(ENOENT)
      process.exitCode = 1;
    }
  } finally {
    await pool.end();
  }
}

// 执行迁移
applyMigration();