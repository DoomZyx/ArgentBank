import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/footer";
import Nav from "../../components/Header/nav";
import { useEffect, useState } from "react";
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

  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  return (
    <>
      <Nav />
      <main className="main bg-dark">
        <div className="header">
          {/* Affiche le titre et le bouton Edit Name si edit est false */}
          {!edit && (
            <>
              <h1>
                Welcome back
                <br />
                {user && user.userName
                  ? `${user.userName} !`
                  : "Impossible de récupérer les données.."}
              </h1>
              <button
                className="edit-button"
                id="edit-button"
                onClick={toggleEdit} // Active le mode édition
              >
                Edit Name
              </button>
            </>
          )}

          {/* Affiche les champs de formulaire si edit est true */}
          {edit && (
            <>
              <h1 className="edit-title">Edit user info</h1>

              <div className="editProfile">
                <div className="username-field">
                  <label htmlFor="username">Username :</label>
                  <input type="text" id="username" />
                </div>

                <div className="firstname-field">
                  <label htmlFor="name">First Name :</label>
                  <input type="text" id="name" />
                </div>

                <div className="lastname-field">
                  <label htmlFor="lastname">Last Name :</label>
                  <input type="text" id="lastname" />
                </div>

                <div className="field-button">
                  <button className="save-button">Save</button>

                  <button onClick={toggleEdit} className="cancel-button">
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}
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
