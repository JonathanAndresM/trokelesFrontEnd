const Modal = ({ isOpen, onClose, title, children, onSave }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">{title}</h2>

                {children}

                <div className="flex justify-end mt-4">
                    <button className="bg-gray-500 text-white px-4 py-2 mr-2 rounded" onClick={onClose}>Cancelar</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onSave}>Guardar</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;