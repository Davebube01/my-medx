import { useEffect, useState } from "react";
import * as api from "../services/phcApi";
import type { PhcMetrics } from "../types";

export default function usePhcMetrics() {
  const [metrics, setMetrics] = useState<PhcMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.getPhcMetrics().then((m) => {
      if (!mounted) return;
      setMetrics(m);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return { metrics, loading };
}
