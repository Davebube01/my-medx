import { useEffect, useState } from "react";
import * as api from "../services/phcApi";
import type { DispenseRecord } from "../types";

export default function useDispenseHistory({ page = 1, q = "", pageSize = 10 } = {}) {
  const [data, setData] = useState<DispenseRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.listDispenseHistory({ page, q, pageSize }).then((res) => {
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
