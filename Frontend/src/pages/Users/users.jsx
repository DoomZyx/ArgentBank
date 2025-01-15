import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/footer";
import Nav from "../../components/Header/nav";
import { useEffect } from "react";
import { fetchUser } from "../../Store/API/getAPI";

function UserPage() {
  const dispatch = useDispatch();
  const { token, user, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token)); // Récupérer les données utilisateur
    }
  }, [dispatch, token]);
  console.log("Token :", token);

  return (
    <>
      <Nav />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user && user.userName
              ? `${user.userName} !`
              : "Impossible de récupérer les données.."}
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>
        {error && <p className="error">Erreur : {error}</p>}
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default UserPage;
