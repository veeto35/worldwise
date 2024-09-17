import styles from "./Login.module.css";
import { useState,useEffect } from "react";
import PageNav from "../components/PageNav";
import { useAuth } from "../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";



export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const { login,isAuthenticated} = useAuth();
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();

  useEffect(function (){
      if(isAuthenticated === true){
        navigate("/app/cities");
      }

  },[isAuthenticated,navigate]);

  function handleSubmit(e) {
    e.preventDefault()
    login(email,password);
  }


  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button type="primary">Login</button>
        </div>
      </form>
    </main>
  );
}
