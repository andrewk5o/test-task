interface LoadingIndicatorProps {
    message?: string;
    size?: 'sm' | 'md' | 'lg';
    fullScreen?: boolean;
}

export function LoadingIndicator({
    message = "Loading...",
    size = 'md',
    fullScreen = true
}: LoadingIndicatorProps) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12'
    };

    const containerClasses = fullScreen
        ? "flex items-center justify-center min-h-screen"
        : "flex items-center justify-center p-6";

    return (
        <div className={containerClasses}>
            <div className="flex flex-col items-center space-y-4">
                <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}></div>
                <p className="text-gray-600">{message}</p>
            </div>
        </div>
    );
}
