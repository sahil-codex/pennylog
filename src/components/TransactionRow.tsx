"use client";
export default function TransactionRow({ transaction }: any) {

  async function deleteTransaction() {
    const res = await fetch(`/api/transactions/${transaction.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      window.location.reload();
    } else {
      alert("Failed to delete transaction");
    }
  }

  return (
    <tr className="border-t">

      <td className="p-2">
        {new Date(transaction.transaction_date).toLocaleDateString()}
      </td>

      <td className="p-2">{transaction.category}</td>

      <td className="p-2">{transaction.description}</td>

      <td className="p-2 font-semibold">${Number(transaction.amount).toFixed(2)}</td>

      <td className="p-2">
        <button
          onClick={deleteTransaction}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </td>

    </tr>
  );
}