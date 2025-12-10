

export function Toast({ message }: { message: string }) {
  return (
    <div role="status" aria-live="polite" className="fixed right-4 bottom-4 bg-black text-white px-4 py-2 rounded">
      {message}
    </div>
  );
}
