import React, { useState } from 'react';
import { Search, Users, Trophy, Award, Target, Calendar, Star, PlusCircle, X } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';


interface Player {
  name: string;
  university: string;
  category: 'Batsman' | 'Bowler' | 'All-Rounder';
  totalRuns: number;
  ballsFaced: number;
  inningsPlayed: number;
  wickets: number;
  oversBowled: number;
  runsConceded: number;
}

const players: Player[] = [
  {
    name: "Chamika Chandimal",
    university: "University of the Visual & Performing Arts",
    category: "Batsman",
    totalRuns: 530,
    ballsFaced: 588,
    inningsPlayed: 10,
    wickets: 0,
    oversBowled: 3,
    runsConceded: 21
  },
  // ... other players can be added here
];

interface PlayerFormData {
  name: string;
  university: string;
  category: 'Batsman' | 'Bowler' | 'All-Rounder';
  totalRuns: number;
  ballsFaced: number;
  inningsPlayed: number;
  wickets: number;
  oversBowled: number;
  runsConceded: number;
}

const initialFormData: PlayerFormData = {
  name: '',
  university: '',
  category: 'Batsman',
  totalRuns: 0,
  ballsFaced: 0,
  inningsPlayed: 0,
  wickets: 0,
  oversBowled: 0,
  runsConceded: 0,
};

const universities = [
  "Eastern University",
  "South Eastern University",
  "University of Colombo",
  "University of Jaffna",
  "University of Kelaniya",
  "University of Moratuwa",
  "University of Peradeniya",
  "University of Ruhuna",
  "University of Sri Jayewardenepura",
  "University of the Visual & Performing Arts"
];

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<PlayerFormData>(initialFormData);

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.university.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRuns = players.reduce((sum, player) => sum + player.totalRuns, 0);
  const totalWickets = players.reduce((sum, player) => sum + player.wickets, 0);
  const highestScorer = players.reduce((prev, current) => 
    prev.totalRuns > current.totalRuns ? prev : current
  );
  const bestBowler = players.reduce((prev, current) => 
    prev.wickets > current.wickets ? prev : current
  );
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'category' ? value : 
              name === 'university' ? value :
              name === 'name' ? value :
              Math.max(0, Number(value)) // Ensure numeric values are non-negative
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData(initialFormData);
    setIsModalOpen(false);
  };

  const renderFormFields = () => {
    const commonFields = (
      <>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            University
          </label>
          <select
            name="university"
            value={formData.university}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          >
            <option value="">Select University</option>
            {universities.map(uni => (
              <option key={uni} value={uni}>{uni}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          >
            <option value="Batsman">Batsman</option>
            <option value="Bowler">Bowler</option>
            <option value="All-Rounder">All Rounder</option>
          </select>
        </div>
      </>
    );

    const battingFields = (
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Total Runs
          </label>
          <input
            type="number"
            name="totalRuns"
            value={formData.totalRuns}
            onChange={handleInputChange}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Balls Faced
          </label>
          <input
            type="number"
            name="ballsFaced"
            value={formData.ballsFaced}
            onChange={handleInputChange}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Innings Played
          </label>
          <input
            type="number"
            name="inningsPlayed"
            value={formData.inningsPlayed}
            onChange={handleInputChange}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>
    );

    const bowlingFields = (
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Wickets
          </label>
          <input
            type="number"
            name="wickets"
            value={formData.wickets}
            onChange={handleInputChange}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Overs Bowled
          </label>
          <input
            type="number"
            name="oversBowled"
            value={formData.oversBowled}
            onChange={handleInputChange}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Runs Conceded
          </label>
          <input
            type="number"
            name="runsConceded"
            value={formData.runsConceded}
            onChange={handleInputChange}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>
    );

    return (
      <div className="space-y-4">
        {commonFields}
        {(formData.category === 'Batsman' || formData.category === 'All-Rounder') && battingFields}
        {(formData.category === 'Bowler' || formData.category === 'All-Rounder') && bowlingFields}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="h-6 w-6" />
            <h1 className="text-xl font-bold">CricStats</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Add Player</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Players Count Card */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">Total Players</h3>
                <p className="text-4xl font-bold text-gray-900">{players.length}</p>
                <p className="text-gray-500 text-sm mt-1">Active in Tournament</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tournament Summary */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Trophy className="h-6 w-6 mr-2" />
            Tournament Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Total Runs</h3>
                <Target className="h-6 w-6 opacity-80" />
              </div>
              <p className="text-4xl font-bold">{totalRuns}</p>
              <p className="text-sm opacity-80 mt-2">Across all matches</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Total Wickets</h3>
                <Star className="h-6 w-6 opacity-80" />
              </div>
              <p className="text-4xl font-bold">{totalWickets}</p>
              <p className="text-sm opacity-80 mt-2">Tournament wickets</p>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Top Scorer</h3>
                  <p className="text-2xl font-bold">{highestScorer.name}</p>
                  <p className="text-xl font-semibold mt-1">{highestScorer.totalRuns} runs</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Best Bowler</h3>
                  <p className="text-2xl font-bold">{bestBowler.name}</p>
                  <p className="text-xl font-semibold mt-1">{bestBowler.wickets} wickets</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Players Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Players</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search players..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-x-auto pb-6">
            <div className="flex space-x-6">
              {filteredPlayers.map((player) => (
                <div key={player.name} className="bg-white rounded-lg shadow-md p-6 min-w-[300px]">
                  <div className="flex items-center space-x-4 mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{player.name}</h3>
                      <p className="text-gray-600">{player.university}</p>
                      <p className="text-blue-600 text-sm mt-1">{player.category}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {(player.category === 'Batsman' || player.category === 'All-Rounder') && (
                      <div>
                        <p className="text-gray-600 text-sm">Batting Stats</p>
                        <p className="font-semibold">Runs: {player.totalRuns}</p>
                        <p className="font-semibold">Innings: {player.inningsPlayed}</p>
                      </div>
                    )}
                    {(player.category === 'Bowler' || player.category === 'All-Rounder') && (
                      <div>
                        <p className="text-gray-600 text-sm">Bowling Stats</p>
                        <p className="font-semibold">Wickets: {player.wickets}</p>
                        <p className="font-semibold">Overs: {player.oversBowled}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Add Player Modal */}
      <Transition show={isModalOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsModalOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add New Player
                  </Dialog.Title>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {renderFormFields()}
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                      Add Player
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default App;