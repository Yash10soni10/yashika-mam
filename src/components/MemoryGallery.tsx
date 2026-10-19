import React, { useState, useEffect } from 'react';
import { ALL_15_MEMORIES } from '../data/storyContent';
import { MemoryPhoto } from '../types';
import { Heart, Sparkles, Upload, Image as ImageIcon, X, Maximize2, FolderUp, Check, RotateCcw } from 'lucide-react';
import albumBannerImage from '../assets/images/white_sibling_memories_1792430282928.jpg';

export const MemoryGallery: React.FC = () => {
  const [memories, setMemories] = useState<MemoryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem('yashika_mamm_15_memories');
      if (saved) return JSON.parse(saved);
    } catch {}
    return ALL_15_MEMORIES;
  });

  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [filter, setFilter] = useState<'all' | 'candids' | 'office' | 'festive'>('all');
  const [uploadedNotification, setUploadedNotification] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('yashika_mamm_15_memories', JSON.stringify(memories));
    } catch {}
  }, [memories]);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMemories((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
  };

  const handleSingleUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setMemories((prev) =>
        prev.map((item) => (item.id === id ? { ...item, imageSrc: result } : item))
      );
      setUploadedNotification(`Photo saved to ${id}!`);
      setTimeout(() => setUploadedNotification(null), 3000);
    };
    reader.readAsDataURL(file);
  };

  // Batch upload matching filenames or auto-filling sequential slots
  const handleBatchUpload = (files: FileList) => {
    const fileArray = Array.from(files);
    let updatedCount = 0;

    fileArray.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // Try matching by originalFileName or index
        setMemories((prev) =>
          prev.map((item, idx) => {
            const isMatch = item.originalFileName && file.name.includes(item.originalFileName.slice(0, 15));
            if (isMatch || idx === index) {
              return { ...item, imageSrc: result };
            }
            return item;
          })
        );
      };
      reader.readAsDataURL(file);
      updatedCount++;
    });

    setUploadedNotification(`Attached ${updatedCount} photo(s) to your memory book! ✨`);
    setTimeout(() => setUploadedNotification(null), 4000);
  };

  const handleResetPhotos = () => {
    if (confirm('Reset custom uploaded photos back to default polaroids?')) {
      setMemories(ALL_15_MEMORIES);
      localStorage.removeItem('yashika_mamm_15_memories');
    }
  };

  const filteredMemories = memories.filter((m) => {
    if (filter === 'candids') return m.tag.includes('Joy') || m.tag.includes('Moments') || m.tag.includes('Warmth');
    if (filter === 'office') return m.tag.includes('Office') || m.tag.includes('Classic') || m.tag.includes('Detail') || m.tag.includes('Ethnic');
    if (filter === 'festive') return m.tag.includes('Family') || m.tag.includes('Together') || m.tag.includes('Poetic');
    return true;
  });

  return (
    <section id="chapter-gallery" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-16">
      {/* Chapter Editorial Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-600 uppercase bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          <span>Chapter 04</span>
          <span aria-hidden="true">·</span>
          <span>15 Cherished Keepsakes</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-sans-main">
          Our 15 Cherished Moments 📸
        </h2>
        <p className="font-handwriting text-xl sm:text-2xl text-rose-600">
          Aapki 15 pyari photos, hazaar yaadein, aur hamesha rehne wala apnapan… ❤️
        </p>
      </div>

      {/* Sunlit Banner Card */}
      <div className="relative rounded-3xl overflow-hidden border border-rose-100 bg-white shadow-pearl">
        <img
          src={albumBannerImage}
          alt="Sunlit polaroid memory album for Yashika Mamm"
          className="w-full h-56 sm:h-72 object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent flex items-center p-6 sm:p-10">
          <div className="max-w-md space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-600">
              Interactive Photo Vault
            </span>
            <h3 className="text-2xl font-bold text-slate-900 font-sans-main">
              Yashika Mamm's Memory Album
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans-main">
              Every photo you uploaded represents a precious shade of our bond. You can view all 15 polaroids, read Yash's personal notes, or attach/replace original files directly!
            </p>

            {/* Batch Attach Button */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <label className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 rounded-xl shadow-xs transition-all cursor-pointer">
                <FolderUp className="w-3.5 h-3.5" />
                <span>Upload All 15 Photos</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleBatchUpload(e.target.files);
                    }
                  }}
                />
              </label>

              <button
                type="button"
                onClick={handleResetPhotos}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white/90 border border-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Toast */}
      {uploadedNotification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium text-center flex items-center justify-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{uploadedNotification}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-rose-100 shadow-xs text-xs font-medium">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-rose-500 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All 15 Photos ({memories.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('candids')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === 'candids'
                ? 'bg-rose-500 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Candids & Laughs
          </button>
          <button
            type="button"
            onClick={() => setFilter('office')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === 'office'
                ? 'bg-rose-500 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Elevator & Office Style
          </button>
          <button
            type="button"
            onClick={() => setFilter('festive')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === 'festive'
                ? 'bg-rose-500 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Festive & Sibling
          </button>
        </div>

        <span className="text-xs text-slate-500 font-sans-main">
          Click any polaroid to zoom & view details
        </span>
      </div>

      {/* Grid of 15 Polaroid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMemories.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="group cursor-pointer bg-white rounded-3xl border border-rose-100 hover:border-rose-300 p-4 transition-all duration-300 hover:-translate-y-1 shadow-pearl hover:shadow-pearl-hover flex flex-col justify-between"
          >
            {/* Photo / Polaroid Window */}
            <div className="relative w-full h-72 rounded-2xl overflow-hidden border border-rose-100/70 bg-gradient-to-br from-rose-50/60 via-amber-50/40 to-slate-50 flex flex-col items-center justify-center text-center p-5">
              {photo.imageSrc ? (
                <img
                  src={photo.imageSrc}
                  alt={photo.title}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="space-y-2.5 max-w-xs">
                  <span className="text-3xl block animate-float">📸</span>
                  <div className="text-[11px] font-mono text-rose-500 font-semibold uppercase tracking-wider">
                    Moment {String(index + 1).padStart(2, '0')}
                  </div>
                  <h4 className="font-serif-display font-medium text-lg text-slate-900">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-slate-600 italic font-sans-main line-clamp-3">
                    "{photo.caption}"
                  </p>
                  <span className="inline-block text-xs text-rose-600 font-handwriting text-base pt-1">
                    Click to view / attach photo ✨
                  </span>
                </div>
              )}

              {/* Tag Badge */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-rose-100 text-[11px] font-medium text-slate-700 shadow-xs">
                {photo.tag}
              </div>

              {/* Expand Icon */}
              <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/90 border border-rose-100 text-slate-600 hover:text-slate-900 shadow-xs">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card Content & Yash's Note */}
            <div className="pt-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 text-base group-hover:text-rose-600 transition-colors">
                  {photo.title}
                </h3>
                <button
                  type="button"
                  onClick={(e) => handleLike(photo.id, e)}
                  className="flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 active:scale-125 transition-transform cursor-pointer"
                  aria-label={`Like ${photo.title}`}
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500/20" />
                  <span className="font-mono">{photo.likes}</span>
                </button>
              </div>

              <p className="font-handwriting text-lg text-rose-600 leading-tight">
                {photo.subtitle}
              </p>

              <p className="text-xs text-slate-600 line-clamp-2 pt-1 font-sans-main">
                {photo.personalNote}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative w-full max-w-xl bg-white border border-rose-100 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 cursor-pointer"
              aria-label="Close photo preview"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Photo Window */}
            <div className="rounded-2xl overflow-hidden border border-rose-100 bg-rose-50/40 flex items-center justify-center min-h-[260px] max-h-[380px]">
              {selectedPhoto.imageSrc ? (
                <img
                  src={selectedPhoto.imageSrc}
                  alt={selectedPhoto.title}
                  className="max-h-[380px] w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="p-8 text-center space-y-3">
                  <ImageIcon className="w-10 h-10 text-rose-400 mx-auto animate-pulse" />
                  <h4 className="font-serif-display text-xl text-slate-900 font-medium">
                    {selectedPhoto.title}
                  </h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    {selectedPhoto.caption}
                  </p>
                </div>
              )}
            </div>

            {/* Note & Sister Love Caption */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider block">
                    {selectedPhoto.tag}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 font-sans-main">
                    {selectedPhoto.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={(e) => handleLike(selectedPhoto.id, e)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold cursor-pointer active:scale-110 transition-transform"
                >
                  <Heart className="w-4 h-4 fill-rose-500" />
                  <span>{selectedPhoto.likes} Loves</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-2">
                <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider block">
                  Yash's Note for Mamm
                </span>
                <p className="text-sm text-slate-800 leading-relaxed font-sans-main">
                  {selectedPhoto.personalNote}
                </p>
                <p className="font-handwriting text-2xl text-rose-600 pt-1">
                  “{selectedPhoto.subtitle}”
                </p>
              </div>

              {/* Attach / Replace File */}
              <div className="pt-2 border-t border-rose-100 flex items-center justify-between text-xs text-slate-500">
                <label className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors border border-slate-200">
                  <Upload className="w-3.5 h-3.5 text-rose-500" />
                  <span>Attach / Replace Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleSingleUpload(selectedPhoto.id, e.target.files[0]);
                      }
                    }}
                  />
                </label>

                <span className="text-slate-400">Saved to browser storage</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
