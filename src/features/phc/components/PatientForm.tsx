import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../services/phcApi";
import type { CreatePatientPayload } from "../types";
import { Button } from "../../../components/ui/button";

export default function PatientForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CreatePatientPayload = { name, phone, age: typeof age === "number" ? age : undefined, gender: gender as any, myMedxLinked: false };
    await api.createPatient(payload);
    navigate(`/phc/patients/${phone}`);
  };

  return (
    <div className="p-6 font-sans text-gray-800">
      <h2 className="text-lg font-semibold mb-4">Add Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <div>
          <label className="block text-sm">Name</label>
          <input required value={name} onChange={(e)=>setName(e.target.value)} className="w-full border px-2 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Phone</label>
          <input required value={phone} onChange={(e)=>setPhone(e.target.value)} className="w-full border px-2 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Age</label>
          <input value={age as any} onChange={(e)=>setAge(e.target.value ? Number(e.target.value) : "")} className="w-full border px-2 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Gender</label>
          <select value={gender} onChange={(e)=>setGender(e.target.value)} className="w-full border px-2 py-2 rounded">
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
}
