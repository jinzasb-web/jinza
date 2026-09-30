# migrations/_archive —— 已移出自动执行范围的迁移

本目录**不会被** `scripts/migrate.js` 扫描执行。

`migrate.js` 用 `fs.readdirSync(dir)`（**非递归**）读取 `migrations/` 下的 `.sql` 文件，
因此放进子目录的文件不会进入自动迁移流程。这是有意为之。

## 为什么归档

以下脚本是历史上的一次性数据清理 / 废弃对象清理脚本，包含
`TRUNCATE` / `DROP TABLE` 等**不可逆**的破坏性语句。
它们曾经因为编码问题（UTF-16LE 被当 UTF-8 读取）无法执行而"意外安全"，
一旦编码被修正就会被真正执行，可能清空或删除生产数据表。
为消除该风险，已将它们移出自动执行范围，**保留原文以备查阅和手动执行**。

| 文件 | 破坏性语句 | 说明 |
| --- | --- | --- |
| `20251012_truncate_bank_data.sql` | `TRUNCATE TABLE receipts RESTART IDENTITY`、`TRUNCATE TABLE account_management RESTART IDENTITY` | 清空银行交易数据以便重新导入。执行会丢失全部 receipts / account_management 数据，且自增 ID 归零。 |
| `20251022_drop_fx_rates.sql` | `DROP TABLE IF EXISTS fx_rates` | 删除已废弃的汇率表。全仓库已无任何代码引用 `fx_rates`（`src/server/fx.js` 注明汇率接口已彻底移除），删除对运行无收益，但若历史库里仍有该表则数据不可恢复。 |
| `20251023_drop_legacy_bank_tables.sql` | `DROP TABLE IF EXISTS bank_statements / bank_transactions / account_management` | 删除历史遗留表。`account_management` 若仍有数据，删除后不可恢复。 |

## 如需手动执行

1. **务必先备份**（至少导出目标表数据 / 做数据库快照，确认备份可恢复）：
   ```powershell
   pg_dump "$env:DATABASE_URL" -t receipts -t account_management -f .\backup-before-cleanup.sql
   ```
2. 确认业务低峰期、且已确认这些表不再被使用后，再手动执行：
   ```powershell
   psql "$env:DATABASE_URL" -f migrations/_archive/20251012_truncate_bank_data.sql
   ```
3. 手动执行的脚本**不会**写入 `schema_migrations` 表；请自行记录执行时间与操作人。

## 编码说明

`20251012_truncate_bank_data.sql` 与 `20251012_add_unique_index_bank_transactions.sql`
原为 UTF-16LE（BOM `FF FE`）编码，已统一转为 **UTF-8 无 BOM**，内容一字未改。
