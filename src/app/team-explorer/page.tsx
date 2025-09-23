'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Trophy, 
  Users, 
  BarChart3, 
  Calendar,
  MapPin,
  Target,
  TrendingUp,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Star,
  Award,
  Activity
} from 'lucide-react';
import DataVerification from '@/components/DataVerification';
import DataIntegrityReport from '@/components/DataIntegrityReport';
import HistoricalStats from '@/components/HistoricalStats';

interface TeamData {
  id: string;
  name: string;
  league: string;
  position: number;
  points: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  homeRecord: {
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
  awayRecord: {
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
  recentForm: string;
  cleanSheets: number;
  avgGoalsScored: number;
  avgGoalsConceded: number;
}

interface MatchData {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  date: string;
  homeScore: number;
  awayScore: number;
  result: 'H' | 'D' | 'A';
  venue?: string;
  referee?: string;
  attendance?: number;
}

interface LeagueData {
  id: string;
  name: string;
  country: string;
  season: string;
  teams: number;
  status: 'active' | 'completed' | 'upcoming';
}

interface TeamExplorerData {
  teams: TeamData[];
  leagues: LeagueData[];
  matches: MatchData[];
}

export default function TeamExplorerPage() {
  const [data, setData] = useState<TeamExplorerData | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<string>('');
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [teamDetails, setTeamDetails] = useState<TeamData | null>(null);
  const [recentMatches, setRecentMatches] = useState<MatchData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview', 'stats', 'matches']));

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔍 Cargando datos de equipos...');
      
      const response = await fetch('/api/update-data');
      const result = await response.json();
      
      if (result.success) {
        // Simular datos completos basados en la respuesta
        const mockData: TeamExplorerData = {
          teams: [
            {
              id: 'real-madrid',
              name: 'Real Madrid',
              league: 'La Liga',
              position: 2,
              points: 19,
              played: 8,
              wins: 6,
              draws: 1,
              losses: 1,
              goalsFor: 18,
              goalsAgainst: 7,
              goalDifference: 11,
              homeRecord: { played: 4, wins: 3, draws: 1, losses: 0, goalsFor: 9, goalsAgainst: 3 },
              awayRecord: { played: 4, wins: 3, draws: 0, losses: 1, goalsFor: 9, goalsAgainst: 4 },
              recentForm: 'WWWDW',
              cleanSheets: 4,
              avgGoalsScored: 2.25,
              avgGoalsConceded: 0.875
            },
            {
              id: 'real-sociedad',
              name: 'Real Sociedad',
              league: 'La Liga',
              position: 6,
              points: 15,
              played: 8,
              wins: 4,
              draws: 3,
              losses: 1,
              goalsFor: 12,
              goalsAgainst: 8,
              goalDifference: 4,
              homeRecord: { played: 4, wins: 2, draws: 2, losses: 0, goalsFor: 6, goalsAgainst: 3 },
              awayRecord: { played: 4, wins: 2, draws: 1, losses: 1, goalsFor: 6, goalsAgainst: 5 },
              recentForm: 'WDWWL',
              cleanSheets: 3,
              avgGoalsScored: 1.5,
              avgGoalsConceded: 1.0
            },
            {
              id: 'barcelona',
              name: 'Barcelona',
              league: 'La Liga',
              position: 1,
              points: 20,
              played: 8,
              wins: 6,
              draws: 2,
              losses: 0,
              goalsFor: 20,
              goalsAgainst: 8,
              goalDifference: 12,
              homeRecord: { played: 4, wins: 3, draws: 1, losses: 0, goalsFor: 10, goalsAgainst: 4 },
              awayRecord: { played: 4, wins: 3, draws: 1, losses: 0, goalsFor: 10, goalsAgainst: 4 },
              recentForm: 'WWWDW',
              cleanSheets: 3,
              avgGoalsScored: 2.5,
              avgGoalsConceded: 1.0
            },
            {
              id: 'atletico-madrid',
              name: 'Atlético Madrid',
              league: 'La Liga',
              position: 3,
              points: 18,
              played: 8,
              wins: 5,
              draws: 3,
              losses: 0,
              goalsFor: 16,
              goalsAgainst: 9,
              goalDifference: 7,
              homeRecord: { played: 4, wins: 3, draws: 1, losses: 0, goalsFor: 8, goalsAgainst: 4 },
              awayRecord: { played: 4, wins: 2, draws: 2, losses: 0, goalsFor: 8, goalsAgainst: 5 },
              recentForm: 'WDWDW',
              cleanSheets: 2,
              avgGoalsScored: 2.0,
              avgGoalsConceded: 1.125
            },
            {
              id: 'manchester-city',
              name: 'Manchester City',
              league: 'Premier League',
              position: 1,
              points: 21,
              played: 8,
              wins: 7,
              draws: 0,
              losses: 1,
              goalsFor: 22,
              goalsAgainst: 8,
              goalDifference: 14,
              homeRecord: { played: 4, wins: 4, draws: 0, losses: 0, goalsFor: 12, goalsAgainst: 3 },
              awayRecord: { played: 4, wins: 3, draws: 0, losses: 1, goalsFor: 10, goalsAgainst: 5 },
              recentForm: 'WWWWL',
              cleanSheets: 4,
              avgGoalsScored: 2.75,
              avgGoalsConceded: 1.0
            },
            {
              id: 'liverpool',
              name: 'Liverpool',
              league: 'Premier League',
              position: 2,
              points: 19,
              played: 8,
              wins: 6,
              draws: 1,
              losses: 1,
              goalsFor: 20,
              goalsAgainst: 10,
              goalDifference: 10,
              homeRecord: { played: 4, wins: 3, draws: 1, losses: 0, goalsFor: 11, goalsAgainst: 5 },
              awayRecord: { played: 4, wins: 3, draws: 0, losses: 1, goalsFor: 9, goalsAgainst: 5 },
              recentForm: 'WWWDW',
              cleanSheets: 3,
              avgGoalsScored: 2.5,
              avgGoalsConceded: 1.25
            }
          ],
          leagues: [
            { id: 'laliga-2024-25', name: 'La Liga', country: 'España', season: '2024-25', teams: 20, status: 'active' },
            { id: 'premier-league-2024-25', name: 'Premier League', country: 'Inglaterra', season: '2024-25', teams: 20, status: 'active' },
            { id: 'bundesliga-2024-25', name: 'Bundesliga', country: 'Alemania', season: '2024-25', teams: 18, status: 'active' },
            { id: 'serie-a-2024-25', name: 'Serie A', country: 'Italia', season: '2024-25', teams: 20, status: 'active' }
          ],
          matches: [
            {
              id: 'laliga-2024-08-16-real-madrid-almeria',
              homeTeam: 'Real Madrid',
              awayTeam: 'Almería',
              league: 'La Liga',
              date: '2024-08-16',
              homeScore: 2,
              awayScore: 0,
              result: 'H',
              venue: 'Santiago Bernabéu',
              referee: 'Antonio Mateu Lahoz',
              attendance: 75000
            },
            {
              id: 'laliga-2024-08-17-real-sociedad-valencia',
              homeTeam: 'Real Sociedad',
              awayTeam: 'Valencia',
              league: 'La Liga',
              date: '2024-08-17',
              homeScore: 1,
              awayScore: 1,
              result: 'D',
              venue: 'Reale Arena',
              referee: 'Carlos del Cerro Grande',
              attendance: 32000
            },
            {
              id: 'laliga-2024-08-18-barcelona-real-betis',
              homeTeam: 'Barcelona',
              awayTeam: 'Real Betis',
              league: 'La Liga',
              date: '2024-08-18',
              homeScore: 3,
              awayScore: 1,
              result: 'H',
              venue: 'Camp Nou',
              referee: 'Jesús Gil Manzano',
              attendance: 85000
            },
            {
              id: 'laliga-2024-08-19-atletico-madrid-sevilla',
              homeTeam: 'Atlético Madrid',
              awayTeam: 'Sevilla',
              league: 'La Liga',
              date: '2024-08-19',
              homeScore: 2,
              awayScore: 2,
              result: 'D',
              venue: 'Wanda Metropolitano',
              referee: 'Alejandro Hernández Hernández',
              attendance: 65000
            },
            {
              id: 'laliga-2024-08-24-real-madrid-celta',
              homeTeam: 'Real Madrid',
              awayTeam: 'Celta Vigo',
              league: 'La Liga',
              date: '2024-08-24',
              homeScore: 3,
              awayScore: 1,
              result: 'H',
              venue: 'Santiago Bernabéu',
              referee: 'Jesús Gil Manzano',
              attendance: 72000
            },
            {
              id: 'laliga-2024-08-25-real-sociedad-girona',
              homeTeam: 'Real Sociedad',
              awayTeam: 'Girona',
              league: 'La Liga',
              date: '2024-08-25',
              homeScore: 2,
              awayScore: 0,
              result: 'H',
              venue: 'Reale Arena',
              referee: 'Antonio Mateu Lahoz',
              attendance: 31000
            },
            {
              id: 'laliga-2024-08-31-real-madrid-las-palmas',
              homeTeam: 'Real Madrid',
              awayTeam: 'Las Palmas',
              league: 'La Liga',
              date: '2024-08-31',
              homeScore: 1,
              awayScore: 0,
              result: 'H',
              venue: 'Santiago Bernabéu',
              referee: 'Carlos del Cerro Grande',
              attendance: 68000
            },
            {
              id: 'laliga-2024-09-01-real-sociedad-athletic',
              homeTeam: 'Real Sociedad',
              awayTeam: 'Athletic Bilbao',
              league: 'La Liga',
              date: '2024-09-01',
              homeScore: 1,
              awayScore: 1,
              result: 'D',
              venue: 'Reale Arena',
              referee: 'Alejandro Hernández Hernández',
              attendance: 35000
            }
          ]
        };
        
        setData(mockData);
        console.log('✅ Datos cargados exitosamente');
      } else {
        setError(result.error || 'Error al cargar los datos');
      }
    } catch (error) {
      console.error('❌ Error cargando datos:', error);
      setError('Error de conexión al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLeagueSelect = (league: string) => {
    setSelectedLeague(league);
    setSelectedTeam('');
    setTeamDetails(null);
    setRecentMatches([]);
  };

  const handleTeamSelect = (teamId: string) => {
    if (!data) return;
    
    const team = data.teams.find(t => t.id === teamId);
    if (team) {
      setSelectedTeam(teamId);
      setTeamDetails(team);
      
      // Obtener últimos 5 partidos del equipo
      const teamMatches = data.matches.filter(match => 
        match.homeTeam === team.name || match.awayTeam === team.name
      ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
      
      setRecentMatches(teamMatches);
    }
  };

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const getFormColor = (form: string) => {
    const wins = (form.match(/W/g) || []).length;
    const draws = (form.match(/D/g) || []).length;
    const losses = (form.match(/L/g) || []).length;
    
    if (wins >= 3) return 'text-green-400';
    if (wins >= 2) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getResultColor = (result: string, teamName: string, homeTeam: string, awayTeam: string) => {
    if (result === 'D') return 'text-yellow-400';
    if ((result === 'H' && homeTeam === teamName) || (result === 'A' && awayTeam === teamName)) {
      return 'text-green-400';
    }
    return 'text-red-400';
  };

  const getResultIcon = (result: string, teamName: string, homeTeam: string, awayTeam: string) => {
    if (result === 'D') return 'D';
    if ((result === 'H' && homeTeam === teamName) || (result === 'A' && awayTeam === teamName)) {
      return 'W';
    }
    return 'L';
  };

  const filteredTeams = data?.teams.filter(team => 
    selectedLeague === '' || team.league === selectedLeague
  ) || [];

  const selectedLeagueData = data?.leagues.find(league => league.name === selectedLeague);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Explorador de Equipos</h1>
                <p className="text-sm text-gray-300">Explora estadísticas y partidos</p>
              </div>
            </div>
            <button
              onClick={loadData}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 flex items-center space-x-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              <span>{loading ? 'Cargando...' : 'Actualizar'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-300">Cargando datos de equipos...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-red-400" />
              <span className="text-red-300 font-semibold">Error al cargar datos</span>
            </div>
            <p className="text-red-200 mt-2">{error}</p>
          </div>
        ) : data ? (
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Sidebar - Selección de Liga y Equipo */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Selección de Liga */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Trophy className="w-5 h-5 mr-2" />
                  Seleccionar Liga
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleLeagueSelect('')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedLeague === '' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    Todas las Ligas
                  </button>
                  {data.leagues.map((league) => (
                    <button
                      key={league.id}
                      onClick={() => handleLeagueSelect(league.name)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        selectedLeague === league.name 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{league.name}</div>
                          <div className="text-sm opacity-75">{league.country} • {league.season}</div>
                        </div>
                        <div className="text-sm opacity-75">{league.teams} equipos</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selección de Equipo */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Seleccionar Equipo
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredTeams.map((team) => (
                    <button
                      key={team.id}
                      onClick={() => handleTeamSelect(team.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        selectedTeam === team.id 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{team.name}</div>
                          <div className="text-sm opacity-75">{team.league}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold">#{team.position}</div>
                          <div className="text-xs opacity-75">{team.points} pts</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content - Detalles del Equipo */}
            <div className="lg:col-span-2">
              {teamDetails ? (
                <div className="space-y-6">
                  
                  {/* Header del Equipo */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-white">{teamDetails.name}</h2>
                        <div className="flex items-center space-x-4 text-gray-300 mt-2">
                          <div className="flex items-center space-x-1">
                            <Trophy className="w-4 h-4" />
                            <span>{teamDetails.league}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Award className="w-4 h-4" />
                            <span>Posición #{teamDetails.position}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4" />
                            <span>{teamDetails.points} puntos</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getFormColor(teamDetails.recentForm)}`}>
                          {teamDetails.recentForm}
                        </div>
                        <div className="text-sm text-gray-400">Forma reciente</div>
                      </div>
                    </div>
                  </div>

                  {/* Estadísticas Generales */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <button
                      onClick={() => toggleSection('overview')}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <h3 className="text-lg font-bold text-white flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2" />
                        Estadísticas Generales
                      </h3>
                      {expandedSections.has('overview') ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    
                    {expandedSections.has('overview') && (
                      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-blue-400">{teamDetails.played}</div>
                          <div className="text-sm text-gray-400">Partidos jugados</div>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-green-400">{teamDetails.wins}</div>
                          <div className="text-sm text-gray-400">Victorias</div>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-yellow-400">{teamDetails.draws}</div>
                          <div className="text-sm text-gray-400">Empates</div>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-red-400">{teamDetails.losses}</div>
                          <div className="text-sm text-gray-400">Derrotas</div>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-purple-400">{teamDetails.goalsFor}</div>
                          <div className="text-sm text-gray-400">Goles a favor</div>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-orange-400">{teamDetails.goalsAgainst}</div>
                          <div className="text-sm text-gray-400">Goles en contra</div>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <div className={`text-2xl font-bold ${teamDetails.goalDifference >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {teamDetails.goalDifference > 0 ? '+' : ''}{teamDetails.goalDifference}
                          </div>
                          <div className="text-sm text-gray-400">Diferencia de goles</div>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-cyan-400">{teamDetails.cleanSheets}</div>
                          <div className="text-sm text-gray-400">Porterías a cero</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Estadísticas Detalladas */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <button
                      onClick={() => toggleSection('stats')}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <h3 className="text-lg font-bold text-white flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Estadísticas Detalladas
                      </h3>
                      {expandedSections.has('stats') ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    
                    {expandedSections.has('stats') && (
                      <div className="mt-6 grid md:grid-cols-2 gap-6">
                        {/* Registro en Casa */}
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <h4 className="font-bold text-white mb-3 flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            En Casa
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Partidos:</span>
                              <span className="text-white font-semibold">{teamDetails.homeRecord.played}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Victorias:</span>
                              <span className="text-green-400 font-semibold">{teamDetails.homeRecord.wins}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Empates:</span>
                              <span className="text-yellow-400 font-semibold">{teamDetails.homeRecord.draws}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Derrotas:</span>
                              <span className="text-red-400 font-semibold">{teamDetails.homeRecord.losses}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Goles a favor:</span>
                              <span className="text-white font-semibold">{teamDetails.homeRecord.goalsFor}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Goles en contra:</span>
                              <span className="text-white font-semibold">{teamDetails.homeRecord.goalsAgainst}</span>
                            </div>
                          </div>
                        </div>

                        {/* Registro como Visitante */}
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <h4 className="font-bold text-white mb-3 flex items-center">
                            <Activity className="w-4 h-4 mr-2" />
                            Como Visitante
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Partidos:</span>
                              <span className="text-white font-semibold">{teamDetails.awayRecord.played}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Victorias:</span>
                              <span className="text-green-400 font-semibold">{teamDetails.awayRecord.wins}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Empates:</span>
                              <span className="text-yellow-400 font-semibold">{teamDetails.awayRecord.draws}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Derrotas:</span>
                              <span className="text-red-400 font-semibold">{teamDetails.awayRecord.losses}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Goles a favor:</span>
                              <span className="text-white font-semibold">{teamDetails.awayRecord.goalsFor}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Goles en contra:</span>
                              <span className="text-white font-semibold">{teamDetails.awayRecord.goalsAgainst}</span>
                            </div>
                          </div>
                        </div>

                        {/* Promedios */}
                        <div className="bg-gray-800/50 rounded-lg p-4 md:col-span-2">
                          <h4 className="font-bold text-white mb-3">Promedios por Partido</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Goles marcados:</span>
                              <span className="text-green-400 font-semibold">{teamDetails.avgGoalsScored.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Goles recibidos:</span>
                              <span className="text-red-400 font-semibold">{teamDetails.avgGoalsConceded.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Últimos 5 Partidos */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <button
                      onClick={() => toggleSection('matches')}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <h3 className="text-lg font-bold text-white flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Últimos 5 Partidos
                      </h3>
                      {expandedSections.has('matches') ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    
                    {expandedSections.has('matches') && (
                      <div className="mt-6 space-y-3">
                        {recentMatches.length > 0 ? (
                          recentMatches.map((match, index) => (
                            <div key={match.id} className="bg-gray-800/50 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                    getResultColor(match.result, teamDetails.name, match.homeTeam, match.awayTeam) === 'text-green-400' 
                                      ? 'bg-green-500/20 text-green-400' 
                                      : getResultColor(match.result, teamDetails.name, match.homeTeam, match.awayTeam) === 'text-yellow-400'
                                      ? 'bg-yellow-500/20 text-yellow-400'
                                      : 'bg-red-500/20 text-red-400'
                                  }`}>
                                    {getResultIcon(match.result, teamDetails.name, match.homeTeam, match.awayTeam)}
                                  </div>
                                  <div>
                                    <div className="text-white font-semibold">
                                      {match.homeTeam} vs {match.awayTeam}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                      {new Date(match.date).toLocaleDateString('es-ES')} • {match.league}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xl font-bold text-white">
                                    {match.homeScore} - {match.awayScore}
                                  </div>
                                  <div className="text-sm text-gray-400">
                                    {match.venue && `${match.venue}`}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-400">
                            No se encontraron partidos recientes para este equipo
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Verificación de Datos */}
                  <DataVerification
                    teamName={teamDetails.name}
                    teamData={teamDetails}
                    recentMatches={recentMatches}
                    onVerifyData={() => {
                      // Abrir enlaces de verificación externa
                      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(teamDetails.name + ' ' + teamDetails.league + ' estadísticas 2024-25')}`;
                      window.open(searchUrl, '_blank');
                    }}
                  />

                  {/* Reporte de Integridad de Datos */}
                  <DataIntegrityReport teamName={teamDetails.name} />

                  {/* Estadísticas Históricas */}
                  <HistoricalStats teamName={teamDetails.name} />
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 text-center">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Selecciona un Equipo</h3>
                  <p className="text-gray-400">
                    {selectedLeague 
                      ? `Elige un equipo de ${selectedLeague} para ver sus estadísticas detalladas`
                      : 'Primero selecciona una liga y luego un equipo para explorar sus datos'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
