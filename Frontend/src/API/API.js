// Connexion à l'API baseURL

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

// Connexion à l'API profile

export async function getProfile(userName) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ userName });

  const requestOption = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/v1/user/profile`);
    requestOption;
    if (!response.ok) {
      throw new Error("Erreur :"`${response.status}`);
    }
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Erreur lors de la récupération:", error);
    throw error;
  }
}
