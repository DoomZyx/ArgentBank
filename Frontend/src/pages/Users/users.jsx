import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/footer";
import Nav from "../../components/Header/nav";
import { useEffect, useState } from "react";
import { fetchUser } from "../../Store/API/getAPI";
import { updateUser } from "../../Store/API/getAPI";

function UserPage() {
  const dispatch = useDispatch();
  const { token, user, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token)); // Récupérer les données utilisateur
    }
  }, [dispatch, token]);

  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const [formData, setFormData] = useState({
    userName: user.userName || "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName || "",
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ token, userData: formData }));
    toggleEdit(); // Fermez le mode édition après mise à jour
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

              <form className="editProfile" onSubmit={handleSubmit}>
                <div className="username-field">
                  <label htmlFor="username">Username :</label>
                  <input
                    type="text"
                    id="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="firstname-field">
                  <label htmlFor="name">First Name :</label>
                  <input type="text" id="name" disabled />
                </div>

                <div className="lastname-field">
                  <label htmlFor="lastname">Last Name :</label>
                  <input type="text" id="lastname" disabled />
                </div>

                <div className="field-button">
                  <button className="save-button" type="submit">
                    Save
                  </button>

                  <button onClick={toggleEdit} className="cancel-button">
                    Cancel
                  </button>
                </div>
              </form>
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
