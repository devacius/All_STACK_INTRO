import { useNavigate } from "react-router-dom"

export const Games=()=>{
    const navigate=useNavigate();
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Games Page</h1>
            <p className="text-lg text-gray-600">This page is under construction. Please check back later!</p>
            <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={()=>navigate('/tetris')}>
                Tetris
            </button>
        </div>
    )
}