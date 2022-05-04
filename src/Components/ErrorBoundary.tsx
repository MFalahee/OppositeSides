import * as React from 'react';

const ErrorBoundary: React.FC<{children: React.ReactNode}> = (props) => {
    const [error, setError] = React.useState<Error | null>(null);
    const [errorInfo, setErrorInfo] = React.useState<React.ErrorInfo | null>(null);
    const ref = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        if (ref.current && !error) {
            setError(null);
            setErrorInfo(null);
        }
    }, [error]);
    React.useEffect(() => {
        if (error) {
            console.error(error, errorInfo);
        }
    }, [error, errorInfo]);
    React.useEffect(() => {
        if (ref.current) {
        }
    }, [ref]);
    return (
        <div ref={ref}>
            {props.children}
        </div>
    );
}
export default ErrorBoundary;