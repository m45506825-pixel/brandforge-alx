import React, { useState } from 'react';
import { Instagram, Facebook, Linkedin, Twitter, Download, Eye, Copy, Calendar, Hash, AtSign } from 'lucide-react';

interface SocialMediaPostsProps {
  onBack: () => void;
}

export const SocialMediaPosts: React.FC<SocialMediaPostsProps> = ({ onBack }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('instagram');
  const [selectedPostType, setSelectedPostType] = useState<string>('feed');
  const [caption, setCaption] = useState('');
  const [status, setStatus] = useState<string>('');

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-700' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'from-blue-700 to-blue-800' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'from-blue-400 to-blue-500' }
  ];

  const postTypes = {
    instagram: [
      { id: 'feed', name: 'Feed Post', dimensions: '1080×1080', description: 'Square post for main feed' },
      { id: 'story', name: 'Story', dimensions: '1080×1920', description: 'Vertical story format' },
      { id: 'reel', name: 'Reel Cover', dimensions: '1080×1920', description: 'Reel thumbnail' },
      { id: 'carousel', name: 'Carousel', dimensions: '1080×1080', description: 'Multi-image post' }
    ],
    facebook: [
      { id: 'feed', name: 'Feed Post', dimensions: '1200×630', description: 'Standard feed post' },
      { id: 'story', name: 'Story', dimensions: '1080×1920', description: 'Facebook story' },
      { id: 'cover', name: 'Cover Photo', dimensions: '1640×859', description: 'Page cover image' }
    ],
    linkedin: [
      { id: 'feed', name: 'Feed Post', dimensions: '1200×627', description: 'Professional feed post' },
      { id: 'article', name: 'Article Header', dimensions: '1200×627', description: 'Article cover image' },
      { id: 'company', name: 'Company Banner', dimensions: '1536×768', description: 'Company page banner' }
    ],
    twitter: [
      { id: 'feed', name: 'Tweet Image', dimensions: '1200×675', description: 'Tweet attachment' },
      { id: 'header', name: 'Header Image', dimensions: '1500×500', description: 'Profile header' }
    ]
  };

  const templates = [
    { id: '1', name: 'Product Showcase', preview: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: '2', name: 'Behind the Scenes', preview: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: '3', name: 'Customer Feature', preview: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: '4', name: 'Brand Story', preview: 'https://images.pexels.com/photos/1598506/pexels-photo-1598506.jpeg?auto=compress&cs=tinysrgb&w=300' }
  ];

  const hashtagSuggestions = [
    '#productlaunch', '#brandstory', '#smallbusiness', '#entrepreneur', '#innovation',
    '#quality', '#handmade', '#sustainable', '#customerFirst', '#brandedcontent'
  ];

  const currentPlatform = platforms.find(p => p.id === selectedPlatform);
  const currentPostTypes = postTypes[selectedPlatform as keyof typeof postTypes] || [];
  const currentPostType = currentPostTypes.find(pt => pt.id === selectedPostType);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Social Media Posts</h1>
            <p className="text-gray-600">Create engaging social media content optimized for each platform</p>
          </div>
          <button
            onClick={onBack}
            className="text-purple-600 hover:text-purple-700 font-medium"
            data-testid="sm-back"
          >
            ← Back to Brand Style
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Platform Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Platform</h3>
              <div className="space-y-2">
                {platforms.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <button
                      key={platform.id}
                      onClick={() => {
                        setSelectedPlatform(platform.id);
                        setSelectedPostType(postTypes[platform.id as keyof typeof postTypes][0].id);
                        setStatus(`platform-${platform.id}`);
                      }}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        selectedPlatform === platform.id
                          ? 'bg-gradient-to-r ' + platform.color + ' text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                      data-testid={`sm-platform-${platform.id}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{platform.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Post Type Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Type</h3>
              <div className="space-y-2">
                {currentPostTypes.map((postType) => (
                  <button
                    key={postType.id}
                    onClick={() => { setSelectedPostType(postType.id); setStatus(`posttype-${postType.id}`); }}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedPostType === postType.id
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    data-testid={`sm-posttype-${postType.id}`}
                  >
                    <div className="font-medium">{postType.name}</div>
                    <div className="text-sm opacity-75">{postType.dimensions}</div>
                    <div className="text-xs opacity-60 mt-1">{postType.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {currentPlatform?.name} {currentPostType?.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={() => setStatus('preview')} data-testid="sm-preview">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={() => { navigator.clipboard?.writeText(caption); setStatus('copied'); }} data-testid="sm-copy">
                      <Copy className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  Optimized for {currentPostType?.dimensions} • {currentPostType?.description}
                </p>
              </div>

              {/* Canvas Preview */}
              <div className="p-8 bg-gray-50">
                <div className="max-w-md mx-auto">
                  <div 
                    className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                      selectedPostType === 'story' || selectedPostType === 'reel' 
                        ? 'aspect-[9/16]' 
                        : selectedPostType === 'header' 
                        ? 'aspect-[3/1]' 
                        : 'aspect-square'
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          {currentPlatform && <currentPlatform.icon className="w-8 h-8 text-purple-600" />}
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Your Product Here</h4>
                        <p className="text-sm text-gray-600">Upload your crafted product visual</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Template Selection */}
              <div className="p-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Quick Templates</h4>
                <div className="grid grid-cols-4 gap-3">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      className="aspect-square bg-gray-100 rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500 transition-all"
                      onClick={() => setStatus(`template-${template.id}`)}
                      data-testid={`sm-template-${template.id}`}
                    >
                      <img src={template.preview} alt={template.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Caption & Settings */}
          <div className="lg:col-span-1 space-y-6">
            {/* Caption Editor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Caption & Copy</h3>
              <textarea
                value={caption}
                onChange={(e) => { setCaption(e.target.value); setStatus('caption-edit'); }}
                placeholder={`Write your ${currentPlatform?.name} caption...`}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                data-testid="sm-caption"
              />
              <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                <span>{caption.length} characters</span>
                <span>
                  {selectedPlatform === 'twitter' ? '280 max' : 
                   selectedPlatform === 'instagram' ? '2200 max' : 
                   selectedPlatform === 'linkedin' ? '3000 max' : '63206 max'}
                </span>
              </div>
            </div>

            {/* Hashtag Suggestions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <Hash className="w-5 h-5 inline mr-2" />
                Hashtag Suggestions
              </h3>
              <div className="flex flex-wrap gap-2">
                {hashtagSuggestions.map((hashtag) => (
                  <button
                    key={hashtag}
                    onClick={() => { setCaption(prev => prev + ' ' + hashtag); setStatus('hashtag-add'); }}
                    className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors"
                    data-testid={`sm-hashtag-${hashtag}`}
                  >
                    {hashtag}
                  </button>
                ))}
              </div>
            </div>

            {/* Scheduling */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <Calendar className="w-5 h-5 inline mr-2" />
                Publishing
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors" onClick={() => setStatus('download')} data-testid="sm-download">
                  <Download className="w-4 h-4 inline mr-2" />
                  Download Post
                </button>
                <button className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors" onClick={() => setStatus('schedule')} data-testid="sm-schedule">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Schedule Post
                </button>
                <button className="w-full bg-blue-100 text-blue-700 p-3 rounded-lg hover:bg-blue-200 transition-colors" onClick={() => setStatus('connect')} data-testid="sm-connect">
                  <AtSign className="w-4 h-4 inline mr-2" />
                  Connect Account
                </button>
              </div>
              <div className="mt-2 text-xs text-gray-500" data-testid="sm-status">{status}</div>
            </div>

            {/* Platform Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
              <h4 className="font-semibold text-blue-900 mb-2">
                {currentPlatform?.name} Tips
              </h4>
              <div className="text-sm text-blue-800 space-y-1">
                {selectedPlatform === 'instagram' && (
                  <>
                    <p>• Use 3-5 relevant hashtags</p>
                    <p>• Post during peak hours (11am-1pm)</p>
                    <p>• Include a call-to-action</p>
                  </>
                )}
                {selectedPlatform === 'linkedin' && (
                  <>
                    <p>• Focus on professional value</p>
                    <p>• Ask questions to drive engagement</p>
                    <p>• Share industry insights</p>
                  </>
                )}
                {selectedPlatform === 'facebook' && (
                  <>
                    <p>• Keep text concise and engaging</p>
                    <p>• Use emojis sparingly</p>
                    <p>• Encourage comments and shares</p>
                  </>
                )}
                {selectedPlatform === 'twitter' && (
                  <>
                    <p>• Keep it under 280 characters</p>
                    <p>• Use trending hashtags</p>
                    <p>• Tweet during business hours</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};