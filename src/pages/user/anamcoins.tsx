
import { useState, useEffect } from 'react';
import { Coins, ArrowRightLeft, History, Flame, Rocket, Gift, Check, X, Zap, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthProvider';
import anamCoinsService from '../../utils/anamcoins';
import type { AnamCoinsData, AnamCoinsHistory, RedemptionResponse } from '../../utils/anamcoins';
import { getUserSoulpoints, SoulpointsData } from '../../utils/soulpoints';
import { LoadingOutlined } from '@ant-design/icons';
const AnamCoinsPage = () => {
  const { userData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [anamCoinsData, setAnamCoinsData] = useState<AnamCoinsData | null>(null);
  const [history, setHistory] = useState<AnamCoinsHistory[]>([]);
  const [soulpointsData, setSoulpointsData] = useState<SoulpointsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showRedemptionModal, setShowRedemptionModal] = useState(false);
  const [redemptionAmount, setRedemptionAmount] = useState('');
  const [redemptionLoading, setRedemptionLoading] = useState(false);
  const [redemptionResult, setRedemptionResult] = useState<RedemptionResponse | null>(null);

  useEffect(() => {
    loadAnamCoinsData();
  }, [userData?.id]);

  const loadAnamCoinsData = async () => {
    if (!userData?.id) return;

    try {
      setLoading(true);
      setError(null);

      const [anamCoinsResponse, soulpointsResponse, historyResponse] = await Promise.all([
        anamCoinsService.getUserAnamCoins(userData.id),
        getUserSoulpoints(userData.id),
        anamCoinsService.getAnamCoinsHistory(userData.id, 20)
      ]);

      if (anamCoinsResponse.success) {
        setAnamCoinsData(anamCoinsResponse.data ?? null);
      } else {
        setError(anamCoinsResponse.error || 'Failed to load AnamCoins data.');
      }

      if (soulpointsResponse.success) {
        setSoulpointsData(soulpointsResponse.data);
      } else {
        setError(soulpointsResponse.message || 'Failed to load SoulPoints data.');
      }

      if (historyResponse.success) {
        setHistory(historyResponse.data);
      } else {
        setError(historyResponse.error || 'Failed to load history.');
      }

    } catch (err) {
      console.error('Error loading AnamCoins data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRedemption = async () => {
    if (!redemptionAmount || parseInt(redemptionAmount, 10) < 100) return;

    try {
      setRedemptionLoading(true);
      const result = await anamCoinsService.redeemSoulPointsForAnamCoins(userData.id as string, parseInt(redemptionAmount || '0'));

      setRedemptionResult(result);

      if (result.success) {
        await loadAnamCoinsData();
        setTimeout(() => {
          setShowRedemptionModal(false);
          setRedemptionResult(null);
          setRedemptionAmount('');
        }, 3000);
      }

    } catch (err) {
      console.error('Redemption error:', err);
      setRedemptionResult({
        success: false,
        message: 'Redemption failed. Please try again.'
      });
    } finally {
      setRedemptionLoading(false);
    }
  };

  // const conversionInfo = anamCoinsService.getConversionInfo();
  const maxRedeemableSP = soulpointsData ? anamCoinsService.calculateMaxRedeemableSoulPoints(soulpointsData.points) : 0;
  const potentialAC = redemptionAmount ? anamCoinsService.calculateAnamCoinsFromSoulPoints(parseInt(redemptionAmount)) : 0;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionIcon = (type: 'redeemed' | 'spent' | 'earned' | string) => {
    switch (type) {
      case 'redeemed':
        return <ArrowRightLeft className="w-4 h-4 text-green-400" />;
      case 'spent':
        return <Coins className="w-4 h-4 text-red-400" />;
      case 'earned':
        return <Star className="w-4 h-4 text-yellow-400" />;
      default:
        return <Coins className="w-4 h-4 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh]">
        <div className="relative">
          <LoadingOutlined
            style={{
              fontSize: window.innerWidth < 640 ? 36 : 48,
              color: '#00FFFF',
            }}
            spin
          />
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping" />
        </div>
        <div className="space-y-2 mt-2">
          <p className="text-cyan-400 font-mono text-lg sm:text-xl font-bold tracking-wider">
            LOADING ANAMCOINS...
          </p>
          <div className="flex items-center justify-center space-x-1">
            {[0, 0.2, 0.4].map((delay, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                style={{ animationDelay: `${delay}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh]">
        <div className="relative">
          <LoadingOutlined
            style={{
              fontSize: window.innerWidth < 640 ? 36 : 48,
              color: '#00FFFF',
            }}
            spin
          />
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping" />
        </div>
        <div className="space-y-2 mt-2">
          <p className="text-cyan-400 font-mono text-lg sm:text-xl font-bold tracking-wider">
            LOADING ANAMCOINS...
          </p>
          <div className="flex items-center justify-center space-x-1">
            {[0, 0.2, 0.4].map((delay, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                style={{ animationDelay: `${delay}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <X className="text-red-400 text-6xl mb-4 mx-auto" />
          <p className="text-red-400 font-mono text-xl mb-4">{error}</p>
          <button
            onClick={loadAnamCoinsData}
            className="px-6 py-2 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded font-mono hover:bg-amber-500/30 transition-all"
          >
            RETRY
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-4 md:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/50">
                  <Coins className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-950 flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 font-mowaq">
                  ANAMCOINS
                </h1>
                <p className="text-slate-400 font-mowaq text-sm">Digital Currency System</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-slate-400 text-sm font-mowaq">Welcome back,</p>
                <p className="text-amber-400 font-bold font-mowaq">{userData?.first_name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Available Coins */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6 hover:border-amber-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <Coins className="w-6 h-6 text-amber-400" />
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-sm">Available</p>
                <p className="text-2xl font-bold text-amber-400 font-mowaq">
                  {anamCoinsData?.available_coins || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>Ready to spend</span>
            </div>
          </div>

          {/* Total Coins */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6 hover:border-blue-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-sm">Total Earned</p>
                <p className="text-2xl font-bold text-blue-400 font-mowaq">
                  {anamCoinsData?.total_coins || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center text-blue-400 text-sm">
              <Rocket className="w-4 h-4 mr-1" />
              <span>Lifetime earnings</span>
            </div>
          </div>

          {/* Spent Coins */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-red-500/20 rounded-lg p-6 hover:border-red-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-red-400" />
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-sm">Spent</p>
                <p className="text-2xl font-bold text-red-400 font-mowaq">
                  {anamCoinsData?.spent_coins || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center text-red-400 text-sm">
              <Flame className="w-4 h-4 mr-1" />
              <span>Total purchases</span>
            </div>
          </div>

          {/* SoulPoints Balance */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6 hover:border-purple-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-sm">SoulPoints</p>
                <p className="text-2xl font-bold text-purple-400 font-mowaq">
                  {soulpointsData?.points || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center text-purple-400 text-sm">
              <ArrowRightLeft className="w-4 h-4 mr-1" />
              <span>Available to redeem</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Redemption Card */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <ArrowRightLeft className="w-6 h-6 text-amber-400 mr-3" />
              <h3 className="text-xl font-bold text-amber-400 font-mowaq">REDEEM ANAMCOINS</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400 text-sm">Conversion Rate:</span>
                  <span className="text-amber-400 font-mono">100 SP = 5 AC</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400 text-sm">Available SP:</span>
                  <span className="text-purple-400 font-mono">{soulpointsData?.points || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Max Redeemable:</span>
                  <span className="text-green-400 font-mono">{maxRedeemableSP} SP</span>
                </div>
              </div>

              <button
                onClick={() => setShowRedemptionModal(true)}
                disabled={!maxRedeemableSP}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-mono"
              >
                {maxRedeemableSP ? 'REDEEM ANAMCOINS' : 'INSUFFICIENT SOULPOINTS'}
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <History className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className="text-xl font-bold text-blue-400 font-mono">RECENT ACTIVITY</h3>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {history.length > 0 ? (
                history.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getTransactionIcon(transaction.transaction_type)}
                      <div>
                        <p className="text-white text-sm font-medium">
                          {transaction.description}
                        </p>
                        <p className="text-slate-400 text-xs">
                          {formatDate(transaction.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {transaction.coins_earned > 0 && (
                        <p className="text-green-400 font-mono text-sm">
                          +{transaction.coins_earned} AC
                        </p>
                      )}
                      {transaction.coins_spent > 0 && (
                        <p className="text-red-400 font-mono text-sm">
                          -{transaction.coins_spent} AC
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <History className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No transactions yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full Transaction History */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-500/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <History className="w-6 h-6 text-slate-400 mr-3" />
              <h3 className="text-xl font-bold text-slate-300 font-mono">TRANSACTION HISTORY</h3>
            </div>
            <button
              onClick={loadAnamCoinsData}
              className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-all font-mono text-sm"
            >
              REFRESH
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-400 font-mono text-sm">DATE</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-mono text-sm">TYPE</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-mono text-sm">DESCRIPTION</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-mono text-sm">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {history.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                    <td className="py-3 px-4 text-slate-300 font-mono text-sm">
                      {formatDate(transaction.created_at)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        {getTransactionIcon(transaction.transaction_type)}
                        <span className="text-slate-300 font-mono text-sm capitalize">
                          {transaction.transaction_type}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300 text-sm">
                      {transaction.description}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-sm">
                      {transaction.coins_earned > 0 && (
                        <span className="text-green-400">+{transaction.coins_earned} AC</span>
                      )}
                      {transaction.coins_spent > 0 && (
                        <span className="text-red-400">-{transaction.coins_spent} AC</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {history.length === 0 && (
              <div className="text-center py-12">
                <History className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 font-mono">No transaction history available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Redemption Modal */}
      {showRedemptionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-amber-500/30 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-amber-400 font-mono">REDEEM ANAMCOINS</h3>
              <button
                onClick={() => {
                  setShowRedemptionModal(false);
                  setRedemptionResult(null);
                  setRedemptionAmount('');
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {!redemptionResult ? (
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400 text-sm">Available SoulPoints:</span>
                    <span className="text-purple-400 font-mono">{soulpointsData?.points || 0}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400 text-sm">Conversion Rate:</span>
                    <span className="text-amber-400 font-mono">100 SP = 5 AC</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Minimum Redemption:</span>
                    <span className="text-green-400 font-mono">100 SP</span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 text-sm font-mono mb-2">
                    SoulPoints to Redeem (multiples of 100):
                  </label>
                  <input
                    type="number"
                    value={redemptionAmount}
                    onChange={(e) => setRedemptionAmount(e.target.value)}
                    min="100"
                    step="100"
                    max={maxRedeemableSP}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white font-mono focus:border-amber-500 focus:outline-none"
                    placeholder="Enter amount..."
                  />
                </div>

                {redemptionAmount && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-amber-400 font-mono">You will receive:</span>
                      <span className="text-amber-400 font-mono font-bold">
                        {potentialAC} AnamCoins
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowRedemptionModal(false);
                      setRedemptionAmount('');
                    }}
                    className="flex-1 bg-slate-700 text-slate-300 py-2 px-4 rounded-lg hover:bg-slate-600 transition-all font-mono"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleRedemption}
                    disabled={!redemptionAmount || parseInt(redemptionAmount, 10) < 100 || redemptionLoading}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 px-4 rounded-lg hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-mono"
                  >
                    {redemptionLoading ? 'PROCESSING...' : 'REDEEM'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                {redemptionResult.success ? (
                  <div>
                    <Check className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <p className="text-green-400 font-mono text-lg font-bold mb-2">
                      SUCCESS!
                    </p>
                    <p className="text-slate-300 text-sm mb-4">
                      {redemptionResult.message}
                    </p>
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">AnamCoins Earned:</span>
                          <span className="text-green-400 font-mono">
                            +{redemptionResult.data?.coinsEarned} AC
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">SoulPoints Used:</span>
                          <span className="text-red-400 font-mono">
                            -{redemptionResult.data?.soulpointsUsed} SP
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <X className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <p className="text-red-400 font-mono text-lg font-bold mb-2">
                      FAILED
                    </p>
                    <p className="text-slate-300 text-sm">
                      {redemptionResult.message}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnamCoinsPage;