import * as React from "react";

const DropZone = React.forwardRef(({ onChange, value, ...props }, ref) => {
    const [imageUrl, setImageUrl] = React.useState(null);
    const [error, setError] = React.useState(null);

    const handleImageChange = (e) => {
        setError(null);
        const file = e.target.files[0];

        if (!file) {
            onChange(null);
            return;
        }

        // Validation
        const validTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            setError('Please select a valid image type (JPG, JPEG, or PNG)');
            onChange(null);
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setError('File size exceeds 2MB limit');
            onChange(null);
            return;
        }

        // For preview
        const reader = new FileReader();
        reader.onload = (event) => {
            setImageUrl(event.target.result);
        };
        reader.readAsDataURL(file);

        // Pass the file to react-hook-form
        onChange(file);
    };

    return (
        <div className="border border-altColor/45 p-2 w-full rounded-lg flex flex-col gap-4">

            <h1 className="text-2xl font-title">
                Upload Image
            </h1>
            <hr />

            {error && (
                <div className="text-red-500 mb-4 text-center font-medium">
                    {error}
                </div>
            )}

            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="Preview"
                    className="max-w-full max-h-96 object-contain mb-4 mx-auto"
                />
            ) : (
                <div className="border-2 border-dashed border-gray-400 text-center mb-2 py-12">
                    <p>No image selected</p>
                </div>
            )}

            <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleImageChange}
                ref={ref}
                className="font-body mt-5 w-full "
                {...props}
            />
        </div>
    );
});


export default DropZone;