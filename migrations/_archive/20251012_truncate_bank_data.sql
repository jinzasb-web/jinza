-- 清空银行交易数据，在数据结构变更后重新导入
-- 此脚本用于清空旧数据，让新的导入从零开始

DO $$
BEGIN
	IF to_regclass('public.receipts') IS NOT NULL THEN
		EXECUTE 'TRUNCATE TABLE receipts RESTART IDENTITY';
	END IF;
	IF to_regclass('public.account_management') IS NOT NULL THEN
		EXECUTE 'TRUNCATE TABLE account_management RESTART IDENTITY';
	END IF;
END $$;
