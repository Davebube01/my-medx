import { useEffect, useState } from "react";
import * as api from "../services/phcApi";
import type { Patient } from "../types";

export default function usePatient(phone: string | null) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!phone) return;
    let mounted = true;
    setLoading(true);
    api.getPatientByPhone(phone).then((p) => {
      if (!mounted) return;
      setPatient(p);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [phone]);

  return { patient, loading };
}
