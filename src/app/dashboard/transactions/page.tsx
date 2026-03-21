import TransactionList from "@/components/TranactionsList";

export default function Transaction(){
    return (
        <div>
        <h1 className="text-2xl font-bold mb-4">Transactions</h1>
        <div className="bg-white p-4 rounded-xl shadow"><TransactionList/></div>
      </div>
     );
    }
