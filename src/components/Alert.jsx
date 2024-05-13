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
            <button
                data-dismissible-target="alert"
                className="!absolute  top-3 right-3 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={onClose}
            >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                  strokeWidth="2"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </span>
            </button>
        </div>
    );
};

export default Alert;