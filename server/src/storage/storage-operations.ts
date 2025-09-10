import { supabase } from "./storage"

export const uploadCarImage = async (file: Express.Multer.File, registrationNumber: string): Promise<string> => {
    try{
        const { data, error } = await supabase.storage
            .from('car-images')
            .upload(`cars/${registrationNumber}/${file.originalname}`, file.buffer, {
                contentType: file.mimetype,
                upsert: true,
        })

        if (!data) {
            throw new Error(`Failed to upload image: ${error?.message}`);
        }

        return `Image uploaded successfully for registration number: ${registrationNumber} - File path: ${data?.path}`;


    } catch (error) {
        console.error(`Failed to upload image: ${error}`)
        return `Failed to upload image: ${error}`;
    }

}

export const getCarImages = async (registrationNumber: string): Promise<string[]> => {
    try {
        const { data, error } = await supabase.storage
            .from('car-images')
            .list(`cars/${registrationNumber}`);
        
        if (error) {
            throw new Error(`Failed to list images: ${error.message}`);
        }
        
        if (!data || data.length === 0) {
            console.log(`No images found for registration: ${registrationNumber}`);
            return [];
        }


        const imageUrls = data.map(file => {
            const publicUrl = supabase.storage
                .from('car-images')
                .getPublicUrl(`cars/${registrationNumber}/${file.name}`).data.publicUrl;
            
            return publicUrl;
        });

        return imageUrls;

    } catch (error) {
        console.error(`Failed to get images: ${error}`);
        throw error; // Throw the error instead of returning a rejected promise
    }
}