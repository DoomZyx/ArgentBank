import { useAuth } from "Store/Login/AuthCheck/AuthProvider";

const API_BASE_URL = "http://localhost:3001/api";

// Connexion à l'API login

export async function loginUser(email, password) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ email, password });

  const requestOption = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${API_BASE_URL}/v1/user/login`,
      requestOption
    );
    if (!response.ok) {
      throw new Error(`Erreur : ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error;
  }
}

// Récupération des données de l'utilsateur connecté 

export async function getUser(token) {
  const { getToken } = useAuth();
  const token = getToken();

  const requestOption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
       Authorization: `Bearer ${token}`
    }
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/v1/user/profile`,
      requestOption
    )
    if (!response.ok) {
      throw new Error(`Erreur : ${response.status}`)
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Erreur lors de la récupération des données de l'utilsateur connecté ;" , error)
    throw new Error
  }
}
