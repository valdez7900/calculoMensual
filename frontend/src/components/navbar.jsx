import React from 'react'
import { Link } from "react-router-dom";

export default function Navbar() {
  
    return (
        <nav className="bg-white px-2 sm:px-4 py-2.5  fixed w-full z-20 top-0 left-0  ">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="https://flowbite.com/" className="flex items-center">
            <img src="data:image/png;base64,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" className="mr-3 h-6 sm:h-9" alt="Coppel"/>
            
        </a>
        <div className="flex md:order-2">
            <Link
            to={`/`}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Empleados
            </Link>
        </div>
        </div>
      </nav>
    )
  }