import { useLogin } from "../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const [email, setEMail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginMutation.mutateAsync({ email, password });
      alert("berhasil login");
    } catch (error) {
      alert(error.response?.data?.message || "login gagal");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="card bg-base-100 w-96 shadow-xl p-5">
          <h1 className="text-2xl font-bold text-center pb-5">LOGIN</h1>
          <form onSubmit={handleLogin}>
            <label className="input input-bordered flex items-center gap-2">
              Email :
              <input
                type="email"
                className="grow"
                placeholder="masukan email"
                value={email}
                onChange={(e) => setEMail(e.target.value)}
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Password :
              <input
                type="password"
                className="grow"
                placeholder="masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
