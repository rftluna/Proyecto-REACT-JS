const IMGBB_API_KEY = "5f07d0e52d703f15ac5768c1b0e05355"; //👈reemplazan por la suya
const ENDPOINT = "https://api.imgbb.com/1/upload";

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch(`${ENDPOINT}?key=${IMGBB_API_KEY}`, {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error("Error al subir la imagen");
        }

        return data.data.url;
    } catch (error) {
        console.error("ImgBB error:", error);
        throw error;
    }
};
