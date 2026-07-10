interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}
function ErrorFallBack({ error, resetError }: ErrorFallbackProps) {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button onClick={resetError}>Try again</button>
    </div>
  );
}
export default ErrorFallBack;
