import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error: error
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col gap-5 items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                    <div className="w-full space-y-6 text-center">
                        <div className="space-y-3">

                            {this.state.error && (
                                <div className="flex flex-col gap-5">

                                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl transition-transform hover:scale-110">{this.state.error?.response?.status || ""}</h1>


                                    <p className="text-gray-500">{this.state.error.message || "Something went wrong, try refreshing the page."}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}