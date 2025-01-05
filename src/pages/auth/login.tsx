import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert2";
import { getBaseUrl } from "../../helpers/api";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const validateInput = () => {
    if (!username) {
      swal.fire("Gagal!", "Nama tidak boleh kosong", "error");
      return false;
    }

    if (!password) {
      swal.fire("Gagal!", "Password tidak boleh kosong", "error");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInput()) return;

    const payload = {
      username: username,
      password: password,
    };

    try {
      await axios.post(`${getBaseUrl()}/user/public/login`, payload);
      localStorage.setItem("token", "token");
      localStorage.setItem("role", "admin");
      await swal.fire("Berhasil!", "Anda berhasil masuk", "success");
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(`error login: ${error}`);
      swal.fire(
        "Gagal!",
        "Kredensial yang Anda masukkan salah. Silakan coba lagi.",
        "error"
      );
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-default-50 w-screen min-h-screen">
      <h1 className="text-4xl font-bold">VMUC FinTech</h1>
      <div className="shadow-md p-4 rounded-md w-96 mt-4 flex flex-col bg-primary-200">
        <h3 className="text-xl font-bold mb-4">Login</h3>
        <Input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="h-4" />
        <Input
          placeholder="Password"
          type={isShowPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          endContent={
            !isShowPassword ? (
              <EyeIcon
                className="cursor-pointer text-gray-500 w-6 h-6"
                onClick={() => setIsShowPassword(false)}
              />
            ) : (
              <EyeSlashIcon
                className="cursor-pointer text-gray-500 w-6 h-6"
                onClick={() => setIsShowPassword(true)}
              />
            )
          }
        />
        <div className="flex justify-between items-center mt-4">
          <div className="flex">
            <input
              type="checkbox"
              className="border border-gray-300 rounded-md"
              onChange={() => setIsRemember(!isRemember)}
            />
            <p className="ml-2">Ingat Saya</p>
          </div>
          <Button color="primary" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
