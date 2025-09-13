export interface ImageTemplate {
  id: string;
  name: string;
  category: 'social' | 'product' | 'brand' | 'ecommerce';
  dimensions: { width: number; height: number };
  preview: string;
  platform?: string;
  productType?: string;
}

export interface EditingTool {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'basic' | 'ai' | 'product' | 'social';
}

export interface ExportPreset {
  id: string;
  name: string;
  format: 'jpeg' | 'png' | 'pdf';
  quality: number;
  dimensions?: { width: number; height: number };
  platform: string;
}

export interface Project {
  id: string;
  name: string;
  lastModified: Date;
  template: ImageTemplate;
  thumbnail: string;
}

export interface ProductTemplate {
  id: string;
  name: string;
  category: 'showcase' | 'lifestyle' | 'comparison' | 'feature';
  description: string;
  preview: string;
  socialPlatforms: string[];
}

export interface SocialMediaPost {
  id: string;
  platform: 'instagram' | 'facebook' | 'linkedin' | 'twitter' | 'tiktok';
  type: 'feed' | 'story' | 'reel' | 'carousel';
  dimensions: { width: number; height: number };
  template: string;
}