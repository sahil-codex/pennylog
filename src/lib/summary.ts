import { sql } from "@/lib/db";

export async function getUserSummary(userId: string) {
  const result = await sql`
    SELECT 
      COUNT(*) as transactions_count,
      COALESCE(SUM(amount), 0) as total_expense,
      COALESCE(
        SUM(amount) FILTER (
          WHERE DATE_TRUNC('month', transaction_date) =
                DATE_TRUNC('month', CURRENT_DATE)
        ),
        0
      ) as this_month_expense
    FROM transactions
    WHERE user_id = ${userId}
  `;

  return result[0];
}