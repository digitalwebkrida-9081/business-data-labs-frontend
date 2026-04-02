'use client';

import React, { useState, useEffect, useRef } from 'react';

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
        if (!hasData) { setLoading(false); return; }
        const loadDeps = async () => {
            try {
                const hcModule = await import('highcharts/highmaps');
                const hc = hcModule.default;
                try { const accModule = await import('highcharts/modules/accessibility'); const accInit = accModule.default || accModule; if (typeof accInit === 'function') accInit(hc); } catch (e) {}
                const mapLoader = MAP_PATHS[countryCode];
                if (!mapLoader) { setLoading(false); return; }
                const topoData = await mapLoader();
                const topology = topoData.default || topoData;
                const hcReactModule = await import('highcharts-react-official');
                setHighcharts(hc); setHighchartsReact(() => hcReactModule.default); setMapData(topology); setLoading(false);
            } catch (err) { console.error('Error loading map dependencies:', err); setLoading(false); }
        };
        loadDeps();
    }, [countryCode, hasData]);

    if (!hasData) return null;

    if (loading) {
        return (
            <div className="section-padding" style={{ background: 'var(--bg-primary)' }}>
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="animate-pulse">
                            <div className="h-8 rounded w-2/3 mx-auto mb-8" style={{ background: 'var(--bg-elevated)' }}></div>
                            <div className="h-[400px] rounded-xl" style={{ background: 'var(--bg-elevated)' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!mapData || !Highcharts || !HighchartsReact) return null;

    const geoFeatures = Highcharts.geojson(mapData, 'map');
    const normalizeStr = (s) => s.toLowerCase().replace(/[^a-z]/g, '').trim();
    const seriesData = [];
    const matched = new Set();

    for (const feature of geoFeatures) {
        const featureName = feature.properties?.name || '';
        const featureKey = feature.properties?.['hc-key'] || '';
        let bestMatch = null; let bestValue = 0;
        for (const [stateName, count] of Object.entries(stateDistribution)) {
            const normState = normalizeStr(stateName);
            const normFeature = normalizeStr(featureName);
            if (normState === normFeature || normState.includes(normFeature) || normFeature.includes(normState)) {
                if (!bestMatch || count > bestValue) { bestMatch = stateName; bestValue = count; }
            }
        }
        if (bestMatch) { seriesData.push({ 'hc-key': featureKey, value: bestValue, name: featureName }); matched.add(bestMatch); }
    }

    const chartOptions = {
        chart: {
            map: mapData,
            backgroundColor: 'transparent',
            style: { fontFamily: 'var(--font-main, Inter, system-ui, sans-serif)' },
            height: 500
        },
        title: {
            text: `Number of ${category} in ${location}`,
            style: { fontSize: '18px', fontWeight: 'bold', color: '#f8fafc' }
        },
        subtitle: { text: null },
        credits: { enabled: false },
        mapNavigation: { enabled: false },
        colorAxis: {
            type: 'logarithmic',
            min: 1,
            max: Math.max(1000000, ...Object.values(stateDistribution)),
            stops: [
                [0, 'rgba(99, 102, 241, 0.1)'],
                [0.25, 'rgba(99, 102, 241, 0.25)'],
                [0.5, 'rgba(99, 102, 241, 0.45)'],
                [0.75, 'rgba(99, 102, 241, 0.7)'],
                [1, '#6366F1']
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
                style: { color: '#64748b', fontSize: '11px' }
            }
        },
        legend: {
            layout: 'horizontal', align: 'center', verticalAlign: 'bottom', floating: false,
            backgroundColor: 'transparent', borderWidth: 0, symbolWidth: 300, symbolHeight: 12,
            itemStyle: { color: '#64748b', fontWeight: 'normal', fontSize: '11px' }
        },
        tooltip: {
            backgroundColor: '#1a1f2e',
            borderColor: 'rgba(255,255,255,0.1)',
            borderRadius: 12,
            shadow: true,
            useHTML: true,
            headerFormat: '',
            pointFormat: `
                <div style="padding: 8px 12px;">
                    <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                        <span style="width: 10px; height: 10px; border-radius: 50%; background: {point.color}; display: inline-block;"></span>
                        <span style="font-weight: 700; color: #f8fafc; font-size: 13px;">Number of ${category}</span>
                    </div>
                    <div style="color: #94a3b8; font-size: 12px;">{point.name}: <strong style="color: #f8fafc;">{point.value:,.0f}</strong></div>
                </div>
            `
        },
        series: [{
            data: seriesData,
            name: category,
            states: { hover: { color: '#818CF8', borderColor: '#6366F1', borderWidth: 2 } },
            dataLabels: {
                enabled: true, format: '{point.name}',
                style: { color: '#94a3b8', fontSize: '9px', fontWeight: '500', textOutline: '2px #0A0E1A' }
            },
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 0.5,
            nullColor: 'rgba(255,255,255,0.04)'
        }]
    };

    return (
        <div className="section-padding" style={{ background: 'var(--bg-primary)' }}>
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="glass-card !p-6 md:!p-8 !rounded-2xl">
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
