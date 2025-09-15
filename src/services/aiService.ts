import OpenAI from 'openai';

// DeepSeek AI Service for Social Media Writeup
const deepseek = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY,
  dangerouslyAllowBrowser: true
});

// Gemini AI Service for Product Analysis
class GeminiService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  }

  async generateContent(prompt: string): Promise<string> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': this.apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  }

  async analyzeProduct(productDescription: string): Promise<string> {
    const prompt = `Analyze this product and provide professional marketing insights: "${productDescription}". 
    Include: target audience, key selling points, recommended marketing angles, and suggested improvements for product photography.
    Keep response concise and actionable for small business owners.`;
    
    return this.generateContent(prompt);
  }

  async suggestProductEnhancements(productType: string): Promise<string> {
    const prompt = `Provide specific product photography and presentation suggestions for: "${productType}".
    Include: lighting recommendations, background suggestions, composition tips, and styling advice.
    Format as bullet points for easy implementation.`;
    
    return this.generateContent(prompt);
  }
}

// Social Media Writeup Service using DeepSeek
export async function generateSocialWriteup(
  platform: string,
  wordLimit: number,
  tone: string,
  brief: string
): Promise<string> {
  try {
    const systemPrompt = `You are an expert social media copywriter specializing in ${platform} content. 
    Create engaging, platform-optimized content that drives engagement and conversions for small businesses.`;

    const userPrompt = `Write a ${tone} ${platform} post about: "${brief}". 
    Requirements:
    - Keep it under ${wordLimit} words
    - Include relevant hashtags for ${platform}
    - Add a clear call-to-action
    - Make it engaging and shareable
    - Focus on business value and customer benefits`;

    const completion = await deepseek.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      model: "deepseek-chat",
      temperature: 0.7,
      max_tokens: Math.min(wordLimit * 2, 500)
    });

    return completion.choices[0]?.message?.content?.trim() || 'Failed to generate content';
  } catch (error) {
    console.error('DeepSeek API error:', error);
    throw new Error('Failed to generate social media content. Please try again.');
  }
}

// Product Analysis Service using Gemini
export const geminiService = new GeminiService();

export async function analyzeProductImage(productDescription: string): Promise<string> {
  return geminiService.analyzeProduct(productDescription);
}

export async function getProductSuggestions(productType: string): Promise<string> {
  return geminiService.suggestProductEnhancements(productType);
}

// AI-powered background suggestions
export async function suggestBackgrounds(productType: string): Promise<string[]> {
  try {
    const prompt = `Suggest 5 professional background styles for photographing "${productType}" products.
    Return only the background names, one per line, suitable for e-commerce and social media.`;
    
    const response = await geminiService.generateContent(prompt);
    return response.split('\n').filter(line => line.trim()).slice(0, 5);
  } catch (error) {
    console.error('Background suggestion error:', error);
    return ['Clean White', 'Soft Gray', 'Natural Wood', 'Marble Texture', 'Gradient Blue'];
  }
}