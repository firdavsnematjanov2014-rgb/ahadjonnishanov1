import React, { useState } from 'react';
import {
  FolderDown,
  Upload,
  Video,
  FileText,
  FileCode,
  FileSpreadsheet,
  FileImage,
  Download,
  Plus,
  Search,
  ExternalLink,
  CheckCircle,
  Eye
} from 'lucide-react';
import { LearningResource, GradeLevel, UserProfile } from '../types';

interface FileLibraryProps {
  currentUser: UserProfile;
  resources: LearningResource[];
  onAddResource: (resource: LearningResource) => void;
}

export const FileLibrary: React.FC<FileLibraryProps> = ({
  currentUser,
  resources,
  onAddResource,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterGrade, setFilterGrade] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New resource form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newGrade, setNewGrade] = useState<GradeLevel | 'all'>('all');
  const [newType, setNewType] = useState<'video' | 'pdf' | 'document' | 'presentation' | 'code' | 'image'>('pdf');
  const [newUrl, setNewUrl] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [newFileSize, setNewFileSize] = useState('');

  // Handle local file picking
  const handleLocalFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setNewFileName(file.name);
    setNewFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');

    const reader = new FileReader();
    reader.onload = () => {
      setNewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const resource: LearningResource = {
      id: 'res-' + Date.now(),
      title: newTitle.trim(),
      description: newDescription.trim() || "Informatika darsi uchun o'quv materiali.",
      grade: newGrade,
      type: newType,
      fileName: newFileName || (newType === 'video' ? 'Videodars' : 'Fayl'),
      fileUrl: newUrl || '#',
      fileSize: newFileSize || (newType === 'video' ? 'Online Video' : '4.5 MB'),
      uploadedBy: currentUser.role === 'teacher' ? 'Axadboy Nishanov' : currentUser.name,
      createdAt: new Date().toISOString().split('T')[0],
      downloadCount: 0,
    };

    onAddResource(resource);
    setShowAddModal(false);
    setNewTitle('');
    setNewDescription('');
    setNewUrl('');
    setNewFileName('');
    setNewFileSize('');
  };

  const filteredResources = resources.filter((res) => {
    const matchesType = filterType === 'all' || res.type === filterType;
    const matchesGrade = filterGrade === 'all' || String(res.grade) === filterGrade;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesGrade && matchesSearch;
  });

  const getIconForType = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5 text-rose-400" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-400" />;
      case 'code':
        return <FileCode className="w-5 h-5 text-cyan-400" />;
      case 'presentation':
        return <FileSpreadsheet className="w-5 h-5 text-amber-400" />;
      default:
        return <FileText className="w-5 h-5 text-blue-400" />;
    }
  };

  const handleDownloadFile = (res: LearningResource) => {
    if (res.fileUrl.startsWith('data:')) {
      const a = document.createElement('a');
      a.href = res.fileUrl;
      a.download = res.fileName;
      a.click();
    } else if (res.fileUrl.startsWith('http')) {
      window.open(res.fileUrl, '_blank');
    } else {
      alert(`"${res.fileName}" yuklab olish uchun tayyorlanmoqda... (Axadboy Nishanov dars arxivi)`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/30">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
            <FolderDown className="w-4 h-4" />
            Media & Fayllar Kutubxonasi
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
            Videolar, Kitoblar va O'quv Fayllari
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Axadboy Nishanovning 5-11 sinf informatika darslari bo'yicha video darslari, taqdimotlari va elektron darsliklari.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-lg shadow-cyan-600/30 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Yangi Video yoki Fayl Qo'shish
        </button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Fayl yoki video nomini qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Type filter */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: 'all', label: 'Barchasi' },
            { id: 'video', label: 'Videolar' },
            { id: 'pdf', label: 'PDF Kitoblar' },
            { id: 'presentation', label: 'Taqdimotlar' },
            { id: 'code', label: 'Kodlar' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilterType(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterType === item.id
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Grade filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-xs text-slate-400 font-semibold mr-1">Sinf:</span>
          {['all', '5', '6', '7', '8', '9', '10', '11'].map((g) => (
            <button
              key={g}
              onClick={() => setFilterGrade(g)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                filterGrade === g
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {g === 'all' ? 'Bari' : `${g}`}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of files and videos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center flex-shrink-0">
                  {getIconForType(res.type)}
                </div>
                <div className="flex flex-col items-end">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-cyan-300 border border-slate-700">
                    {res.grade === 'all' ? 'Barcha sinflar' : `${res.grade}-sinf`}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1">{res.fileSize}</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {res.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {res.description}
                </p>
              </div>

              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-850 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="truncate max-w-[180px]">{res.fileName}</span>
                <span className="text-slate-500">{res.uploadedBy.split(' ')[0]}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                {res.createdAt}
              </span>

              <button
                onClick={() => handleDownloadFile(res)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-cyan-600 hover:text-white text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              >
                {res.type === 'video' ? <Eye className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                {res.type === 'video' ? 'Tomosha qilish' : 'Yuklab olish'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Resource Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 sm:p-8 space-y-4 shadow-2xl">
            <h3 className="text-xl font-bold text-white">
              Yangi Resurs yoki Video Qo'shish
            </h3>
            <p className="text-xs text-slate-400">
              Axadboy Nishanov informatika darslariga yangi video qo'llanma, darslik yoki fayl joylashtiring.
            </p>

            <form onSubmit={handleSaveResource} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Resurs nomi / Sarlavhasi:
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Masalan: 8-sinf Python masalalar to'plami"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Sinf:
                  </label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value === 'all' ? 'all' : (Number(e.target.value) as GradeLevel))}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  >
                    <option value="all">Barcha sinflar</option>
                    {[5, 6, 7, 8, 9, 10, 11].map((g) => (
                      <option key={g} value={g}>
                        {g}-sinf
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Fayl turi:
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  >
                    <option value="video">Videodars (YouTube / Link)</option>
                    <option value="pdf">PDF Darslik / Hujjat</option>
                    <option value="presentation">Prezentatsiya (.pptx)</option>
                    <option value="code">Kod (.py, .html, .sql)</option>
                    <option value="document">Hujjat (.docx, .xlsx)</option>
                  </select>
                </div>
              </div>

              {newType === 'video' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Video havolasi (YouTube / URL):
                  </label>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Faylni tanlang:
                  </label>
                  <input
                    type="file"
                    onChange={handleLocalFile}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-300 text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-500"
                  />
                  {newFileName && (
                    <div className="mt-1 text-xs text-cyan-300">
                      Tanlandi: {newFileName} ({newFileSize})
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Qisqacha tavsif:
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Darsda nimalar o'rgatilishi haqida qisqacha ma'lumot..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg"
                >
                  Resursni Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
