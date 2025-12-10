import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full w-[60%] mx-auto space-y-16">
      <p className="text-2xl font-semibold text-ray-500">Pick a Dashboard</p>
      <div className="flex gap-10">
        <div className="h-40 w-full rounded-md bg-primary shadow-md mx-auto hover:-translate-y-2 hover:bg-primary/70 transition flex items-center justify-center p-4" onClick={()=>navigate("/pharmacy/dashboard")}>
          <p className="text-4xl font-bold text-white  text-center">
            Pharmacy Dashboard
          </p>
        </div>

        <div className="h-40 w-full rounded-md bg-primary shadow-md mx-auto hover:-translate-y-2 hover:bg-primary/70 transition flex items-center justify-center p-4" onClick={()=>navigate("/phc/dashboard")}>
          <p className="text-4xl font-bold text-white  text-center">
            PHC's Dashboard
          </p>
        </div>
      </div>
    </div>
  );
}
