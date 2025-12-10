import { useEffect, useState } from "react";
import * as api from "../services/phcApi";
import type { Patient } from "../types";

export default function usePatients({ page = 1, q = "", pageSize = 10 } = {}) {
  const [data, setData] = useState<Patient[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.listPatients({ page, q, pageSize }).then((res) => {
      if (!mounted) return;
      setData(res.data);
      setTotal(res.total);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [page, q, pageSize]);

  return { data, total, loading };
}
