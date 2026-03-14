'use client';

import React, { useState, useEffect, useRef } from 'react';

// Country code to Highcharts map collection path mapping
const MAP_PATHS = {
    'in': () => import('@highcharts/map-collection/countries/in/in-all.topo.json'),
    'us': () => import('@highcharts/map-collection/countries/us/us-all.topo.json'),
    'bd': () => import('@highcharts/map-collection/countries/bd/bd-all.topo.json'),
    'gb': () => import('@highcharts/map-collection/countries/gb/gb-all.topo.json'),
    'ca': () => import('@highcharts/map-collection/countries/ca/ca-all.topo.json'),
    'au': () => import('@highcharts/map-collection/countries/au/au-all.topo.json'),
    'de': () => import('@highcharts/map-collection/countries/de/de-all.topo.json'),
    'fr': () => import('@highcharts/map-collection/countries/fr/fr-all.topo.json'),
    'br': () => import('@highcharts/map-collection/countries/br/br-all.topo.json'),
    'jp': () => import('@highcharts/map-collection/countries/jp/jp-all.topo.json'),
    'cn': () => import('@highcharts/map-collection/countries/cn/cn-all.topo.json'),
    'mx': () => import('@highcharts/map-collection/countries/mx/mx-all.topo.json'),
    'za': () => import('@highcharts/map-collection/countries/za/za-all.topo.json'),
    'id': () => import('@highcharts/map-collection/countries/id/id-all.topo.json'),
    'it': () => import('@highcharts/map-collection/countries/it/it-all.topo.json'),
    'es': () => import('@highcharts/map-collection/countries/es/es-all.topo.json'),
    'pk': () => import('@highcharts/map-collection/countries/pk/pk-all.topo.json'),
    'ng': () => import('@highcharts/map-collection/countries/ng/ng-all.topo.json'),
    'eg': () => import('@highcharts/map-collection/countries/eg/eg-all.topo.json'),
    'th': () => import('@highcharts/map-collection/countries/th/th-all.topo.json'),
    'ph': () => import('@highcharts/map-collection/countries/ph/ph-all.topo.json'),
    'my': () => import('@highcharts/map-collection/countries/my/my-all.topo.json'),
    'np': () => import('@highcharts/map-collection/countries/np/np-all.topo.json'),
    'lk': () => import('@highcharts/map-collection/countries/lk/lk-all.topo.json'),
    'ae': () => import('@highcharts/map-collection/countries/ae/ae-all.topo.json'),
    'sa': () => import('@highcharts/map-collection/countries/sa/sa-all.topo.json'),
    'tr': () => import('@highcharts/map-collection/countries/tr/tr-all.topo.json'),
    'kr': () => import('@highcharts/map-collection/countries/kr/kr-all.topo.json'),
    'sg': () => import('@highcharts/map-collection/countries/sg/sg-all.topo.json'),
    'nz': () => import('@highcharts/map-collection/countries/nz/nz-all.topo.json'),
    'nl': () => import('@highcharts/map-collection/countries/nl/nl-all.topo.json'),
    'se': () => import('@highcharts/map-collection/countries/se/se-all.topo.json'),
    'ch': () => import('@highcharts/map-collection/countries/ch/ch-all.topo.json'),
    'pl': () => import('@highcharts/map-collection/countries/pl/pl-all.topo.json'),
    'ar': () => import('@highcharts/map-collection/countries/ar/ar-all.topo.json'),
    'co': () => import('@highcharts/map-collection/countries/co/co-all.topo.json'),
    'cl': () => import('@highcharts/map-collection/countries/cl/cl-all.topo.json'),
    'ke': () => import('@highcharts/map-collection/countries/ke/ke-all.topo.json'),
};

const CountryMapSection = ({ category, location, countryCode, stateDistribution, totalRecords }) => {
    const chartRef = useRef(null);
    const [mapData, setMapData] = useState(null);
    const [Highcharts, setHighcharts] = useState(null);
    const [HighchartsReact, setHighchartsReact] = useState(null);
    const [loading, setLoading] = useState(true);

    const hasData = countryCode && stateDistribution && Object.keys(stateDistribution).length > 0;

    useEffect(() => {
        if (!hasData) {
            setLoading(false);
            return;
        }

        const loadDeps = async () => {
            try {
                // Dynamic import Highcharts with map support
                const hcModule = await import('highcharts/highmaps');
                const hc = hcModule.default;

                // Load accessibility (optional, safe to skip if fails)
                try {
                    const accModule = await import('highcharts/modules/accessibility');
                    const accInit = accModule.default || accModule;
                    if (typeof accInit === 'function') accInit(hc);
                } catch (e) {}

                // Load the map data
                const mapLoader = MAP_PATHS[countryCode];
                if (!mapLoader) {
                    setLoading(false);
                    return;
                }
                
                const topoData = await mapLoader();
                const topology = topoData.default || topoData;

                // Load Highcharts React
                const hcReactModule = await import('highcharts-react-official');

                setHighcharts(hc);
                setHighchartsReact(() => hcReactModule.default);
                setMapData(topology);
                setLoading(false);
            } catch (err) {
                console.error('Error loading map dependencies:', err);
                setLoading(false);
            }
        };

        loadDeps();
    }, [countryCode, hasData]);

    // Don't render if no data
    if (!hasData) {
        return null;
    }

    if (loading) {
        return (
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="animate-pulse">
                            <div className="h-8 bg-slate-200 rounded w-2/3 mx-auto mb-8"></div>
                            <div className="h-[400px] bg-slate-100 rounded-xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!mapData || !Highcharts || !HighchartsReact) {
        return null;
    }

    // Match state distribution keys to hc-key values in the map
    // The map features have properties like 'name', 'hc-key', etc.
    // We need to fuzzy match our state names to the map's state names
    const geoFeatures = Highcharts.geojson(mapData, 'map');
    
    const normalizeStr = (s) => s.toLowerCase().replace(/[^a-z]/g, '').trim();
    
    const seriesData = [];
    const matched = new Set();

    for (const feature of geoFeatures) {
        const featureName = feature.properties?.name || '';
        const featureKey = feature.properties?.['hc-key'] || '';
        
        // Try to find a match in stateDistribution
        let bestMatch = null;
        let bestValue = 0;
        
        for (const [stateName, count] of Object.entries(stateDistribution)) {
            const normState = normalizeStr(stateName);
            const normFeature = normalizeStr(featureName);
            
            if (normState === normFeature || normState.includes(normFeature) || normFeature.includes(normState)) {
                if (!bestMatch || count > bestValue) {
                    bestMatch = stateName;
                    bestValue = count;
                }
            }
        }
        
        if (bestMatch) {
            seriesData.push({
                'hc-key': featureKey,
                value: bestValue,
                name: featureName
            });
            matched.add(bestMatch);
        }
    }

    // Also add unmatched states as 0 value (they'll still appear on map but without data)
    
    const chartOptions = {
        chart: {
            map: mapData,
            backgroundColor: 'transparent',
            style: {
                fontFamily: 'inherit'
            },
            height: 500
        },
        title: {
            text: `Number of ${category} in ${location}`,
            style: {
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1e293b'
            }
        },
        subtitle: {
            text: null
        },
        credits: {
            enabled: false
        },
        mapNavigation: {
            enabled: false
        },
        colorAxis: {
            type: 'logarithmic',
            min: 1,
            max: Math.max(1000000, ...Object.values(stateDistribution)),
            stops: [
                [0, '#e8e0f0'],
                [0.25, '#c4b5d6'],
                [0.5, '#9b86bd'],
                [0.75, '#6f4e9e'],
                [1, '#3b1f6e']
            ],
            labels: {
                formatter: function () {
                    if (this.value >= 1000000) return '1M';
                    if (this.value >= 100000) return '100K';
                    if (this.value >= 10000) return '10K';
                    if (this.value >= 1000) return '1K';
                    if (this.value >= 100) return '100';
                    return '1';
                },
                style: {
                    color: '#64748b',
                    fontSize: '11px'
                }
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            floating: false,
            backgroundColor: 'transparent',
            borderWidth: 0,
            symbolWidth: 300,
            symbolHeight: 12,
            itemStyle: {
                color: '#64748b',
                fontWeight: 'normal',
                fontSize: '11px'
            }
        },
        tooltip: {
            backgroundColor: 'white',
            borderColor: '#e2e8f0',
            borderRadius: 8,
            shadow: true,
            useHTML: true,
            headerFormat: '',
            pointFormat: `
                <div style="padding: 8px 12px;">
                    <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                        <span style="width: 10px; height: 10px; border-radius: 50%; background: {point.color}; display: inline-block;"></span>
                        <span style="font-weight: 700; color: #1e293b; font-size: 13px;">Number of ${category}</span>
                    </div>
                    <div style="color: #475569; font-size: 12px;">{point.name}: <strong style="color: #1e293b;">{point.value:,.0f}</strong></div>
                </div>
            `
        },
        series: [{
            data: seriesData,
            name: category,
            states: {
                hover: {
                    color: '#3b82f6',
                    borderColor: '#1e40af',
                    borderWidth: 2
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                style: {
                    color: '#334155',
                    fontSize: '9px',
                    fontWeight: '500',
                    textOutline: '2px white'
                }
            },
            borderColor: '#94a3b8',
            borderWidth: 0.5,
            nullColor: '#f1f5f9'
        }]
    };

    return (
        <div className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8">
                        <HighchartsReact
                            highcharts={Highcharts}
                            constructorType="mapChart"
                            options={chartOptions}
                            ref={chartRef}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryMapSection;
