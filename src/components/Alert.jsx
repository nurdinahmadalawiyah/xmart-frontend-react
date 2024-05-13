import {useEffect} from "react";

const Alert = ({message, type = 'primary', onClose}) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    const alertClasses = {
        primary: 'bg-primary-400 text-white',
        success: 'bg-success-400 text-white',
        warning: 'bg-warning-400 text-white',
        danger: 'bg-danger text-white',
    }

    return (
        <div className={`fixed flex flex-row justify-between items-center top-0 left-0 right-0 m-4 p-4 rounded-md shadow-md ${alertClasses[type]}`} role="alert">
            <p>{message}</p>
            <button className="ml-2" onClick={onClose}>
                  <strong>X</strong>
            </button>
        </div>
    );
};

export default Alert;