/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Helper function to convert a File object to a Gemini API Part
const fileToPart = async (file: File): Promise<{ inlineData: { mimeType: string; data: string; } }> => {
    const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
    
    const arr = dataUrl.split(',');
    if (arr.length < 2) throw new Error("Invalid data URL");
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch || !mimeMatch[1]) throw new Error("Could not parse MIME type from data URL");
    
    const mimeType = mimeMatch[1];
    const data = arr[1];
    return { inlineData: { mimeType, data } };
};

const handleApiResponse = (
    response: GenerateContentResponse,
    context: string // e.g., "edit", "filter", "adjustment"
): string => {
    // 1. Check for prompt blocking first
    if (response.promptFeedback?.blockReason) {
        const { blockReason, blockReasonMessage } = response.promptFeedback;
        const errorMessage = `Request was blocked. Reason: ${blockReason}. ${blockReasonMessage || ''}`;
        console.error(errorMessage, { response });
        throw new Error(errorMessage);
    }

    // 2. Try to find the image part
    const imagePartFromResponse = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

    if (imagePartFromResponse?.inlineData) {
        const { mimeType, data } = imagePartFromResponse.inlineData;
        console.log(`Received image data (${mimeType}) for ${context}`);
        return `data:${mimeType};base64,${data}`;
    }

    // 3. If no image, check for other reasons
    const finishReason = response.candidates?.[0]?.finishReason;
    if (finishReason && finishReason !== 'STOP') {
        const errorMessage = `Image generation for ${context} stopped unexpectedly. Reason: ${finishReason}. This often relates to safety settings.`;
        console.error(errorMessage, { response });
        throw new Error(errorMessage);
    }
    
    const textFeedback = response.text?.trim();
    const errorMessage = `The AI model did not return an image for the ${context}. ` + 
        (textFeedback 
            ? `The model responded with text: "${textFeedback}"`
            : "This can happen due to safety filters or if the request is too complex. Please try rephrasing your prompt to be more direct.");

    console.error(`Model response did not contain an image part for ${context}.`, { response });
    throw new Error(errorMessage);
};

/**
 * Generates an edited image using generative AI based on a text prompt and a specific point.
 * @param originalImage The original image file.
 * @param userPrompt The text prompt describing the desired edit.
 * @param hotspot The {x, y} coordinates on the image to focus the edit.
 * @returns A promise that resolves to the data URL of the edited image.
 */
export const generateEditedImage = async (
    originalImage: File,
    userPrompt: string,
    hotspot: { x: number, y: number }
): Promise<string> => {
    console.log('Starting generative edit at:', hotspot);
    const ai = new GoogleGenAI(import.meta.env.VITE_GEMINI_API_KEY);
    
    const originalImagePart = await fileToPart(originalImage);
    const prompt = `You are an expert photo editor AI specializing in product photography. Your task is to perform a natural, localized edit on the provided product image based on the user's request.

User Request: "${userPrompt}"
Edit Location: Focus on the area around pixel coordinates (x: ${hotspot.x}, y: ${hotspot.y}).

Product Photography Guidelines:
- The edit must be realistic and blend seamlessly with the surrounding area.
- Maintain professional product photography standards.
- Preserve product integrity and authenticity.
- The rest of the image (outside the immediate edit area) must remain identical to the original.
- Focus on enhancing the product's visual appeal for marketing purposes.

Output: Return ONLY the final edited image. Do not return text.`;
    const textPart = { text: prompt };

    console.log('Sending image and prompt to the model...');
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: { parts: [originalImagePart, textPart] },
    });
    console.log('Received response from model.', response);

    return handleApiResponse(response, 'edit');
};

/**
 * Generates an image with a filter applied using generative AI.
 * @param originalImage The original image file.
 * @param filterPrompt The text prompt describing the desired filter.
 * @returns A promise that resolves to the data URL of the filtered image.
 */
export const generateFilteredImage = async (
    originalImage: File,
    filterPrompt: string,
): Promise<string> => {
    console.log(`Starting filter generation: ${filterPrompt}`);
    const ai = new GoogleGenAI(import.meta.env.VITE_GEMINI_API_KEY);
    
    const originalImagePart = await fileToPart(originalImage);
    const prompt = `You are an expert photo editor AI specializing in product photography filters. Your task is to apply a stylistic filter to the entire product image based on the user's request. Do not change the composition or content, only apply the style.

Filter Request: "${filterPrompt}"

Product Photography Guidelines:
- Apply professional-grade filters suitable for marketing and e-commerce.
- Maintain product authenticity while enhancing visual appeal.
- Ensure the filter enhances the product's marketability.
- Keep the product as the main focus.

Output: Return ONLY the final filtered image. Do not return text.`;
    const textPart = { text: prompt };

    console.log('Sending image and filter prompt to the model...');
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: { parts: [originalImagePart, textPart] },
    });
    console.log('Received response from model for filter.', response);
    
    return handleApiResponse(response, 'filter');
};

/**
 * Generates an image with a global adjustment applied using generative AI.
 * @param originalImage The original image file.
 * @param adjustmentPrompt The text prompt describing the desired adjustment.
 * @returns A promise that resolves to the data URL of the adjusted image.
 */
export const generateAdjustedImage = async (
    originalImage: File,
    adjustmentPrompt: string,
): Promise<string> => {
    console.log(`Starting global adjustment generation: ${adjustmentPrompt}`);
    const ai = new GoogleGenAI(import.meta.env.VITE_GEMINI_API_KEY);
    
    const originalImagePart = await fileToPart(originalImage);
    const prompt = `You are an expert photo editor AI specializing in product photography adjustments. Your task is to perform a natural, global adjustment to the entire product image based on the user's request.

User Request: "${adjustmentPrompt}"

Product Photography Guidelines:
- The adjustment must be applied across the entire image.
- The result must be photorealistic and suitable for professional marketing.
- Enhance the product's visual appeal while maintaining authenticity.
- Optimize for e-commerce and social media use.
- Maintain professional lighting and color accuracy.

Output: Return ONLY the final adjusted image. Do not return text.`;
    const textPart = { text: prompt };

    console.log('Sending image and adjustment prompt to the model...');
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: { parts: [originalImagePart, textPart] },
    });
    console.log('Received response from model for adjustment.', response);
    
    return handleApiResponse(response, 'adjustment');
};

/**
 * Removes background from product image using AI
 * @param originalImage The original product image file
 * @returns A promise that resolves to the data URL of the image with background removed
 */
export const removeBackground = async (originalImage: File): Promise<string> => {
    console.log('Starting AI background removal...');
    const ai = new GoogleGenAI(import.meta.env.VITE_GEMINI_API_KEY);
    
    const originalImagePart = await fileToPart(originalImage);
    const prompt = `You are an expert photo editor AI specializing in product photography. Your task is to remove the background from this product image, leaving only the main product visible on a transparent background.

Product Background Removal Guidelines:
- Remove all background elements completely.
- Preserve the product with perfect edge detection.
- Maintain all product details, shadows, and reflections that are part of the product itself.
- Create a clean, professional cutout suitable for e-commerce.
- Ensure smooth, anti-aliased edges.
- The result should have a transparent background.

Output: Return ONLY the final image with background removed. Do not return text.`;
    const textPart = { text: prompt };

    console.log('Sending image for background removal...');
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: { parts: [originalImagePart, textPart] },
    });
    console.log('Received response from model for background removal.');

    return handleApiResponse(response, 'background removal');
};

/**
 * Enhances product image quality using AI
 * @param originalImage The original product image file
 * @returns A promise that resolves to the data URL of the enhanced image
 */
export const enhanceProductImage = async (originalImage: File): Promise<string> => {
    console.log('Starting AI product enhancement...');
    const ai = new GoogleGenAI(import.meta.env.VITE_GEMINI_API_KEY);
    
    const originalImagePart = await fileToPart(originalImage);
    const prompt = `You are an expert photo editor AI specializing in product photography enhancement. Your task is to enhance this product image to professional marketing standards.

Product Enhancement Guidelines:
- Improve image sharpness and clarity.
- Optimize lighting and contrast for product visibility.
- Enhance colors to make the product more appealing.
- Remove any noise or artifacts.
- Maintain product authenticity - do not alter the actual product.
- Optimize for e-commerce and social media marketing.
- Ensure the result looks natural and professional.

Output: Return ONLY the final enhanced image. Do not return text.`;
    const textPart = { text: prompt };

    console.log('Sending image for enhancement...');
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: { parts: [originalImagePart, textPart] },
    });
    console.log('Received response from model for enhancement.');

    return handleApiResponse(response, 'enhancement');
};