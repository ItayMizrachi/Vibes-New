import React from 'react';

const PopWindow = ({ onClose }) => {

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="modal-container bg-white rounded-lg p-8 border border-solid border-black">
                <p className="text-lg font-semibold mb-4">Choose an option:</p>

                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2">
                    Upload New Picture
                </button>

                <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                    onClick={onClose}
                >  Cancel
                </button>
            </div>
        </div >
    );
};


export default PopWindow;
