import ModifyImage from "./ModifyImage";

function App() {

  return (
    <>
      <header>
        <nav className="bg-gray-800 p-3 pt-2 flex items-center">
          <h1 className="text-white font-bold text-xl ml-6">PeCeDe</h1>
          <div className="flex space-x-4 mx-6">
            <a href="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Home</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">About</a>
          </div>
        </nav>
      </header>

      <main className="flex flex-row p-8 w-screen">
        <ModifyImage />
      </main>
    </>
  );
}

export default App;
