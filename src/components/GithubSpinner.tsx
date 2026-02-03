import { FaCode } from 'react-icons/fa';

export const GitHubSpinner = ({title} : {title?:string}) => {
  return (
    <div className="flex flex-col items-center justify-center from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-10">
      {/* Animated Logo Spinner */}
      <div className="relative">
        <div className="w-32 h-32 border-4 border-gray-200  border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <FaCode className="text-4xl text-gray-700 dark:text-gray-300" />
        </div>
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-400 animate-pulse">
        {
            title ? title :
            `Loading...`
        }
      </p>
    </div>
  );
};