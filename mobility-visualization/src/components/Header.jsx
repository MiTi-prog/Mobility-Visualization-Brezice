import React from 'react'
import { useState } from 'react';
import { Transition } from "@headlessui/react";
import { Link } from 'react-router-dom';

function Header() {
    
    const [isOpen, setIsOpen] = useState(false);

    return (
		<div>
		{/*<nav className="bg-blue-800 shadow-lg bg-opacity-90">*/}
		<nav className="main-header bg-purple-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
			<div className="main-header-down max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
			<div className="flex items-center justify-between h-16">
				<div className="flex items-center">
					<div className="flex-shrink-0">
	
						<div className="app-logo w-32">
							<img src="logotip-brezice.svg" alt="Logotip občine Brežice" />
						</div>
					</div>
					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-4">
							<Link to="/parkirna-mesta">
								<span className="text-gray-400 hover:border-gray-400 border-transparent border-2 p-8 px-3 py-2 rounded-md text-sm font-medium ">Parkirna mesta</span>
							</Link>

							<Link to="/izposojevalnice-koles">
								<span className="text-gray-400 hover:border-gray-400 border-transparent border-2 p-8 px-3 py-2 rounded-md text-sm font-medium ">Izposojevalnica koles</span>
							</Link>

							<Link to="/elektricne-polnilnice">
								<span className="text-gray-400 hover:border-gray-400 border-transparent border-2 p-8 px-3 py-2 rounded-md text-sm font-medium ">Električne polnilnice</span>
							</Link>

							<Link to="/defibrilatorji">
								<span className="text-gray-400 hover:border-gray-400 border-transparent border-2 px-3 py-2 rounded-md text-sm font-medium ">Defibrilatorji</span>
							</Link>
						</div>
					</div>
				</div>
				<div className="-mr-2 flex md:hidden">
				<button
					onClick={() => setIsOpen(!isOpen)}
					type="button"
					className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
					aria-controls="mobile-menu"
					aria-expanded="false"
				>
					<span className="sr-only">Open main menu</span>
					{!isOpen ? (
					<svg
						className="block h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
					) : (
					<svg
						className="block h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
					)}
				</button>
				</div>
			</div>
			</div>

			<Transition
				show={isOpen}
				enter="transition ease-out duration-100 transform"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="transition ease-in duration-75 transform"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
			>
				{(ref) => (
					<div className="md:hidden" id="mobile-menu">
						<div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
							<Link to="/parkirna-mesta">
								<span className="text-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 border border-gray-100 hover:bg-blue-900 block px-3 py-2 rounded-md text-base font-medium">Parkirna mesta</span>
							</Link>
							<Link to="/izposojevalnice-koles">
								<span className="text-gray-400 hover:bg-blue-900 block px-3 py-2 rounded-md text-base font-medium">Izposojevalnica koles</span>
							</Link>
							<Link to="/elektricne-polnilnice">
								<span className="text-gray-400 hover:bg-blue-900 block px-3 py-2 rounded-md text-base font-medium">Električne polnilnice</span>
							</Link>
							<Link to="/defibrilatorji">
								<span className="text-gray-400 hover:bg-blue-900 block px-3 py-2 rounded-md text-base font-medium">Defibrilatorji</span>
							</Link>
						</div>
					</div>
				)}
			</Transition>
		</nav>
		</div>
	);
	
}

export default Header;