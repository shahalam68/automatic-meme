import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import React from "react";
import { IoCartOutline } from "react-icons/io5";

interface ModalProps {
    // showModal: boolean;
    handleModalClose: () => void;
    set: Set | null;
}

// export interface Set {
//     id: string;
//     name: string;
//     releaseDate: string;
//     images: {
//         logo: string;

//     };
// }

const Modal: React.FC<ModalProps> = ({  handleModalClose, set }) => {
    console.log(set);
    const {name,images} = set;
    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/60 backdrop-blur-sm">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] sm:max-w-[600px] lg:max-w-[984px] p-4 max-h-[90vh] overflow-auto">
                <div className="bg-white shadow-md rounded-2xl sm:grid sm:grid-cols-[2fr_1fr] overflow-hidden">
                    <img
                        className="sm:order-2 w-full object-cover p-2 h-full max-sm:max-h-[300px]"
                        src={images.logo}
                        alt="Set Image"
                    />
                    <div className="p-5 lg:p-11">
                        <div>
                            <h3 className="text-2xl lg:text-[40px]  font-bold mb-10">
                                {name}
                            </h3>
                          
                        </div>
                        
                        <div className="grid lg:grid-cols-2 gap-2">
                            <a
                                className="bg-yellow-600 rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
                                href="#"
                            >
                                <IoCartOutline />
                                Add to Cart
                            </a>
                            <button
                                className="border border-[#74766F] rounded-lg py-2 px-5 flex items-center justify-center gap-2 font-semibold text-sm"
                                onClick={handleModalClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
