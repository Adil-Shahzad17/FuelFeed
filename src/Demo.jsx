import * as React from "react";

export default function Demo() {
    const [imageUrl, setImageUrl] = React.useState(null);
    const fileInputRef = React.useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageUrl(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="border border-altColor h-auto rounded-lg p-4 flex flex-col gap-4">

            <h1 className="text-2xl font-title">Upload Images</h1>

            <hr />

            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="Preview"
                    className="max-w-full max-h-96 object-contain mb-4"
                />
            ) : (
                <div className="border-2 border-dashed border-gray-400 p-8 text-center mb-4">
                    <p>No image selected</p>
                </div>
            )}

            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
            // className="block mx-auto"
            />
        </div>
    );
}


