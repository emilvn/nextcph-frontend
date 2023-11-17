import Loading from "./components/Loading";

function App() {

  const useUser = () => ({
  isLoaded: false,
  isSignedIn: true, 
});

  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) return <Loading.LoadingPage />;
  if (!isSignedIn) return <div />;

  return (
    <div>
      App
    </div>
  );
}

export default App;

