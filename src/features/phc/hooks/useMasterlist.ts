import { useEffect, useState } from "react";
import * as api from "../services/phcApi";
import type { DrugMaster } from "../types";

export default function useMasterlist({ page = 1, q = "", pageSize = 10 } = {}) {
  const [data, setData] = useState<DrugMaster[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.listMasterlist({ q, page, pageSize }).then((res) => {
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
