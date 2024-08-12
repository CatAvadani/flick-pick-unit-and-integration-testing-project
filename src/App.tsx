import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className=' flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-violet-800'>
      <button
        className=' bg-yellow-600 px-4 py-2 rounded-lg'
        onClick={() => setCount((count) => count + 1)}
      >
        count is {count}
      </button>
    </div>
  );
}

export default App;
