import Account from "../../components/Map/TransactionModule/transactionCard";
import AccountCardData from "../../data/transactionCard/transactionCard.json";

function Transactions() {
  return (
    <>
      <h2 className="sr-only">Accounts</h2>
      {AccountCardData.map((data) => (
        <Account
          key={data.id}
          title={data.title}
          amount={data.amount}
          description={data.description}
        />
      ))}
    </>
  );
}

export default Transactions;
