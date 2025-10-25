import { Eye, EyeClosed, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [viewPassword, setViewPassword] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="grid grid-cols-2 h-full">
        <div className="flex items-center justify-center">
          <div className="w-[80%] mx-auto">
            <div className="flex justify-center items-center space-x-2 mb-6">
              <div className="bg-blue-500 rounded-lg flex items-center justify-center text-white p-2">
                <MapPin />
              </div>
              <span className="text-2xl font-semibold text-foreground">
                My MedX Pharmacy App
              </span>
            </div>

            <div className="bg-white p-10 rounded-xl ">
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-800">Sign In</p>
                <p className="text-gray-400 ">
                  Welcome back! Please enter your details
                </p>
              </div>

              <div className="text-gray-700 mt-8 text-sm">
                <form action="">
                  <div>
                    <label htmlFor="">Email</label>
                    <br />
                    <input
                      type="text"
                      name=""
                      id=""
                      className="border w-full px-3 py-2 mt-1 rounded-md outline-none"
                    />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="">Password</label>
                    <br />
                    <div className="relative">
                      <input
                        type={`${viewPassword ? "text" : "password"}`}
                        name=""
                        id=""
                        className="border w-full px-3 py-2 mt-1 rounded-md outline-none"
                      />
                      <Eye
                        className={`absolute right-3 top-[15px] text-gray-500 ${
                          !viewPassword ? "block" : "hidden"
                        }`}
                        size={18}
                        onClick={() => setViewPassword(true)}
                      />
                      <EyeClosed
                        className={`absolute right-3 top-[15px] text-gray-500 ${
                          viewPassword ? "block" : "hidden"
                        }`}
                        size={18}
                        onClick={() => setViewPassword(false)}
                      />
                    </div>
                  </div>
                    <div className="flex justify-between mt-4 text-xs">
                        <div className="hover:cursor-pointer hover:text-blue-600" onClick={()=>navigate("/")}>
                            <p className="underline">Return to dashboard</p>
                        </div>
                        <p className="text-blue-600">Forgot Password</p>
                    </div>
                  <Button className="bg-blue-500 text-white rounded w-full mt-6 hover:bg-blue-500/90 hover:cursor-pointer">Sign In</Button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-500 h-full text-white rounded-lg"></div>
      </div>
    </>
  );
}
