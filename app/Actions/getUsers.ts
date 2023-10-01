import axios from "axios";

const getUsers = async () => {
  try {
    const response = await axios.get(`https://ecco-two.vercel.app/api/users`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default getUsers;
