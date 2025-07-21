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
