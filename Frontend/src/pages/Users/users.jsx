import { useDispatch, useSelector } from "react-redux";
import Nav from "../../components/Header/nav";
import Transactions from "../../components/transactions/transaction";
import Footer from "../../components/Footer/footer";
import { useEffect, useState } from "react";
import { fetchUser } from "../../Store/API/getAPI";
import { updateUser } from "../../Store/API/getAPI";

function UserPage() {
  const dispatch = useDispatch();
  const { token, user, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token)); // Récupérer les données utilisateur et vérifie si le token est présent avant de les récuperer 
    }
  }, [dispatch, token]);

  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  // Création du state pour sauvegarder la valuer de userName 
  const [formData, setFormData] = useState({
    userName: user.userName || "",
  });

  // Permet de changer la valeur de l'input userName
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Enregistre la nouvelle valeur dans l'état setFormData 
  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName || "",
      });
    }
  }, [user]);
  // Sauvegarde dans le store le nouveau nom d'utilsateur une fois que le bouton save est cliqué 
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ token, userData: formData }));
    toggleEdit(); // Ferme le mode édition une fois que la modif est sauvgardé 
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
        <Transactions />
      </main>
      <Footer />
    </>
  );
}

export default UserPage;
