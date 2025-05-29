import { useState, useRef } from 'react';

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    if (!file || loading) return;

    setLoading(true);
    setProgress(0);
    setAnalysis(null);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 5, 90));
      }, 100);

      const response = await fetch('http://localhost:3001/analyze-resume', {
        method: 'POST',
        body: formData,
      });

      clearInterval(interval);
      setProgress(100);

      if (!response.ok) throw new Error('Ошибка анализа файла');
      
      const data = await response.json();
      setAnalysis(data.result);

    } catch (err) {
      setAnalysis({
        error: err.message || 'Произошла ошибка при анализе'
      });
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 500);
    }
  };

  // Функция сохранения результатов
  const saveResults = (format) => {
    if (!analysis) return;

    let content, mimeType, ext;

    switch(format) {
      case 'pdf':
        const { jsPDF } = require('jspdf');
        const doc = new jsPDF();
        doc.text(analysis, 10, 10);
        content = doc.output('blob');
        mimeType = 'application/pdf';
        ext = 'pdf';
        break;
      
      case 'json':
        content = JSON.stringify({ analysis }, null, 2);
        mimeType = 'application/json';
        ext = 'json';
        break;
      
      default: // txt
        content = analysis;
        mimeType = 'text/plain';
        ext = 'txt';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analysis_result.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setFile(null);
    setAnalysis(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-indigo-600">
        Анализатор резюме
      </h1>

      {/* Область загрузки файла (прежний вариант) */}
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 cursor-pointer transition-colors ${
          file ? 'border-indigo-300 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept=".pdf,.doc,.docx,.txt"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center space-y-2">
          <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          
          {file ? (
            <>
              <p className="font-medium text-indigo-700">{file.name}</p>
              <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
            </>
          ) : (
            <>
              <p className="font-medium">Перетащите файл или кликните для выбора</p>
              <p className="text-sm text-gray-500">Поддерживаемые форматы: PDF, DOCX, TXT</p>
            </>
          )}
        </div>
      </div>

      {/* Кнопки управления */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className={`px-6 py-3 rounded-lg font-medium flex items-center ${
            !file || loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Анализируется...
            </>
          ) : (
            'Анализировать'
          )}
        </button>

        {(file || analysis) && (
          <button
            onClick={handleClear}
            disabled={loading}
            className="px-6 py-3 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Очистить
          </button>
        )}
      </div>

      {/* Индикатор прогресса */}
      {loading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Результаты анализа с кнопками экспорта */}
      {analysis && (
        <div className={`mt-6 p-6 rounded-lg border ${
          analysis.error 
            ? 'bg-red-50 border-red-200' 
            : 'bg-indigo-50 border-indigo-200'
        }`}>
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              {analysis.error ? (
                <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {analysis.error ? 'Ошибка' : 'Результаты анализа'}
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={() => saveResults('txt')}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                title="Сохранить как TXT"
              >
                TXT
              </button>
              <button 
                onClick={() => saveResults('pdf')}
                className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                title="Сохранить как PDF"
              >
                PDF
              </button>
              <button 
                onClick={() => saveResults('json')}
                className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                title="Сохранить как JSON"
              >
                JSON
              </button>
              <button 
                onClick={() => setAnalysis(null)}
                className="text-gray-500 hover:text-gray-700"
                title="Закрыть"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="prose max-w-none text-gray-700 whitespace-pre-line bg-white p-4 rounded">
            {analysis.error || analysis}
          </div>
        </div>
      )}
    </div>
  );
}