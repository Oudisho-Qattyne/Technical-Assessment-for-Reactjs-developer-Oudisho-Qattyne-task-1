import React from 'react';

interface ErrorComponentProps {
    errorMessage?: string;
    onRetry?: () => void;
    retryButtonText?: string;
    className?: string;
    showIcon?: boolean;

}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
    errorMessage = 'Something went wrong',
    onRetry,
    retryButtonText = 'Try again',
    className = '',
    showIcon = true,

}) => {
    const handleRetry = () => {
        if (onRetry) {
            console.log("retrying");
            
            onRetry();
        }
    };

    return (
        <div className={`relative rounded-lg  p-6 ${className}`}>
        <>
    {
        showIcon && (
            <div className="relative mb-4 flex justify-center">
                <div className="relative rounded-full  p-3">
                    <svg
                        className="relative h-6 w-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
            </div>
        )
    }

    <p className="relative mb-4 text-center text-gray-700">{errorMessage}</p>

    {
        onRetry && (
            <div className="relative flex justify-center">
                <button
                    onClick={handleRetry}
                    className="rounded-md dark:bg-custom-gray px-4 py-2  transition-colors dark:hover:bg-custom-gray-hover cursor-pointer duration-150"
                >
                    {retryButtonText}
                </button>
            </div>
        )
    }
    </>
        </div>
    )




};

export default ErrorComponent;