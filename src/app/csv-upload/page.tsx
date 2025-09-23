'use client';

import { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  Database, 
  Globe, 
  Trophy, 
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Download,
  Zap,
  Target,
  Activity
} from 'lucide-react';

export default function CSVUploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
    setError(null);
    setResults(null);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Por favor selecciona al menos un archivo CSV');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch('/api/process-csv', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setResults(result.data);
        console.log('🔥 "Gran Henki Dama de Goku" creada exitosamente!', result);
      } else {
        setError(result.error || 'Error procesando archivos');
      }
    } catch (error) {
      console.error('Error subiendo archivos:', error);
      setError('Error de conexión al procesar archivos');
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files).filter(
      file => file.type === 'text/csv' || file.name.endsWith('.csv')
    );
    setFiles(prev => [...prev, ...droppedFiles]);
    setError(null);
    setResults(null);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearFiles = () => {
    setFiles([]);
    setResults(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-12 h-12 text-yellow-400 mr-4" />
            <h1 className="text-4xl font-bold text-white">
              Gran Henki Dama de Goku
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-2">
            🔥 Sistema Masivo de Análisis de Datos de Fútbol Mundial
          </p>
          <p className="text-gray-400">
            Sube archivos CSV con datos históricos y crea la base de datos más poderosa del mundo
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
          <div
            className="border-2 border-dashed border-gray-400 rounded-xl p-12 text-center hover:border-yellow-400 transition-colors cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Arrastra archivos CSV aquí o haz clic para seleccionar
            </h3>
            <p className="text-gray-400 mb-4">
              Formatos soportados: Partidos, Equipos, Jugadores
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
              Seleccionar Archivos
            </button>
          </div>

          {/* Selected Files */}
          {files.length > 0 && (
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Archivos Seleccionados ({files.length})
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 text-blue-400 mr-2" />
                      <span className="text-white text-sm">{file.name}</span>
                      <span className="text-gray-400 text-xs ml-2">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-500 transition-colors disabled:opacity-50 flex items-center"
                >
                  {uploading ? (
                    <>
                      <Activity className="w-4 h-4 mr-2 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Crear Gran Henki Dama de Goku
                    </>
                  )}
                </button>
                <button
                  onClick={clearFiles}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-500 transition-colors"
                >
                  Limpiar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
              <span className="text-red-300 font-semibold">Error</span>
            </div>
            <p className="text-red-200 mt-2">{error}</p>
          </div>
        )}

        {/* Results Display */}
        {results && (
          <div className="space-y-6">
            {/* Success Header */}
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-400 mr-3" />
                <h2 className="text-2xl font-bold text-green-300">
                  ¡Gran Henki Dama de Goku Creada Exitosamente! 🔥
                </h2>
              </div>
              <p className="text-green-200">
                La base de datos masiva de fútbol mundial ha sido creada con éxito
              </p>
            </div>

            {/* Analysis Summary */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 font-semibold">Archivos</span>
                </div>
                <div className="text-2xl font-bold text-white">{results.analysis.totalFiles}</div>
                <div className="text-sm text-gray-400">Procesados</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-semibold">Partidos</span>
                </div>
                <div className="text-2xl font-bold text-white">{results.analysis.totalMatches}</div>
                <div className="text-sm text-gray-400">Analizados</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold">Equipos</span>
                </div>
                <div className="text-2xl font-bold text-white">{results.analysis.totalTeams}</div>
                <div className="text-sm text-gray-400">Procesados</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 font-semibold">Ligas</span>
                </div>
                <div className="text-2xl font-bold text-white">{results.analysis.leagues.length}</div>
                <div className="text-sm text-gray-400">Cubiertas</div>
              </div>
            </div>

            {/* Global Coverage */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Cobertura Global
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Total de Ligas</div>
                  <div className="text-2xl font-bold text-white">{results.globalCoverage.totalLeagues}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Países</div>
                  <div className="text-2xl font-bold text-white">{results.globalCoverage.totalCountries}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Regiones</div>
                  <div className="text-2xl font-bold text-white">{results.globalCoverage.totalRegions}</div>
                </div>
              </div>
            </div>

            {/* Processed Files Details */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Archivos Procesados
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {results.processedFiles.map((file: any, index: number) => (
                  <div key={index} className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 text-blue-400 mr-2" />
                      <div>
                        <div className="text-white font-semibold">{file.filename}</div>
                        <div className="text-sm text-gray-400">
                          {file.format} • {file.rows} filas • {file.league} • {file.season}
                        </div>
                      </div>
                    </div>
                    <div className="text-green-400 text-sm">✅</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Quality */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Calidad de Datos
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Partidos con Estadísticas</div>
                  <div className="text-2xl font-bold text-white">{results.analysis.dataQuality.matchesWithStats}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Equipos con Datos Completos</div>
                  <div className="text-2xl font-bold text-white">{results.analysis.dataQuality.teamsWithCompleteData}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Datos Verificados</div>
                  <div className="text-2xl font-bold text-white">{results.analysis.dataQuality.verifiedData}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Instrucciones de Uso
          </h3>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-start">
              <span className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
              <p>Selecciona archivos CSV con datos de fútbol (partidos, equipos, jugadores)</p>
            </div>
            <div className="flex items-start">
              <span className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
              <p>Asegúrate de que tengan headers apropiados (date, home_team, away_team, etc.)</p>
            </div>
            <div className="flex items-start">
              <span className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
              <p>Arrastra los archivos o haz clic para seleccionarlos</p>
            </div>
            <div className="flex items-start">
              <span className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
              <p>Haz clic en "Crear Gran Henki Dama de Goku" para procesar</p>
            </div>
            <div className="flex items-start">
              <span className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
              <p>El sistema detectará automáticamente el formato y procesará los datos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


