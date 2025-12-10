import { useEffect } from "react";

// Example hook that would poll or subscribe to MyMedX linking events.
// In production you'd replace polling with websockets/webhooks.
export default function useSyncMyMedX(phone: string | null, onLinked?: () => void) {
  useEffect(() => {
    if (!phone) return;
    let mounted = true;
    const timer = setInterval(() => {
      // mock check: in real app call GET /api/mymedx/status?phone=
      // Here we just simulate no-op. Call onLinked() if linked.
      if (!mounted) return;
    }, 30_000);
    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, [phone, onLinked]);
}
