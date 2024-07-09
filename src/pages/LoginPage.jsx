import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import { Link, useNavigate } from "react-router-dom";
import service from "../service/api";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    const value = event.currentTarget.value;
    const key = event.currentTarget.id;
    setFormData({ ...formData, [key]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await service.post("/auth/login", formData);
      console.log(response);
      if (response.status === 200) {
        storeToken(response.data.accessToken);
        await authenticateUser();
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }

  const { password, email } = formData;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" value={email} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handleChange}
        />
      </div>

      <p className="error">{errorMessage}</p>
      <p>
        You don't have an account ? <Link to={"/signup"}>Sing up</Link>
      </p>
      <button>Login</button>
    </form>
  );
}

export default LoginPage;
