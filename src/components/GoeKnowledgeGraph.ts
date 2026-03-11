import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';
import { Panel } from './Panel';

cytoscape.use(fcose);

/**
 * GoeKnowledgeGraph Panel
 * REWRITTEN: 100% India Centric Strategic Intelligence View.
 * Enhanced large-format knowledge graph with deep node hierarchy.
 */
export class GoeKnowledgeGraph extends Panel {
    private cy: cytoscape.Core | null = null;

    constructor() {
        super({ id: 'goe_knowledge_graph', title: 'GOE INTEL ENGINE' });
    }

    protected renderContent(content: HTMLElement): void {
        content.id = 'goe-kg-mount';
        content.style.width = '100%';
        content.style.height = '100%';
        content.style.position = 'relative';
        content.style.background = 'radial-gradient(ellipse at 30% 40%, rgba(0, 212, 170, 0.04) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(59, 130, 246, 0.03) 0%, transparent 50%), #050c14';

        // ────── Legend Panel ──────
        const info = document.createElement('div');
        info.style.cssText = `
            position: absolute;
            top: 20px;
            left: 20px;
            z-index: 100;
            background: rgba(5, 12, 20, 0.92);
            padding: 18px 22px;
            border: 1px solid rgba(0, 212, 170, 0.35);
            border-radius: 14px;
            pointer-events: none;
            backdrop-filter: blur(16px);
            box-shadow: 0 12px 48px rgba(0,0,0,0.7), 0 0 40px rgba(0,212,170,0.06);
        `;
        info.innerHTML = `
            <div style="color: #00d4aa; font-weight: 900; font-size: 15px; letter-spacing: 3px; margin-bottom: 2px;">VISHWAGURU STRATEGIC CORE</div>
            <div style="color: rgba(255,255,255,0.45); font-size: 9px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px;">India Ontology Node Analysis v3.0 — Deep Intelligence Map</div>
            <div style="width: 40px; height: 2px; background: linear-gradient(90deg, #00d4aa, transparent); margin: 14px 0;"></div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px;">
                ${this.legendItem('#00d4aa', 'National Interest')}
                ${this.legendItem('#3b82f6', 'Tech Breakthrough')}
                ${this.legendItem('#ef4444', 'Defence Asset')}
                ${this.legendItem('#f97316', 'Economic Power')}
                ${this.legendItem('#a855f7', 'Global Diplomacy')}
                ${this.legendItem('#06b6d4', 'Strategic Infra')}
                ${this.legendItem('#10b981', 'Green Energy')}
                ${this.legendItem('#eab308', 'Human Capital')}
            </div>
        `;
        content.appendChild(info);

        // ────── Stats Badge (top-right) ──────
        const stats = document.createElement('div');
        stats.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 100;
            background: rgba(5, 12, 20, 0.92);
            padding: 14px 20px;
            border: 1px solid rgba(0, 212, 170, 0.25);
            border-radius: 12px;
            pointer-events: none;
            backdrop-filter: blur(16px);
            display: flex;
            gap: 24px;
        `;
        const nodesCount = this.getIndiaMockData().filter(e => e.data.id && !e.data.source).length;
        const edgesCount = this.getIndiaMockData().filter(e => e.data.source).length;
        stats.innerHTML = `
            <div style="text-align: center;">
                <div style="color: #00d4aa; font-size: 22px; font-weight: 900; line-height: 1;">${nodesCount}</div>
                <div style="color: rgba(255,255,255,0.4); font-size: 8px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-top: 2px;">NODES</div>
            </div>
            <div style="width: 1px; background: rgba(0,212,170,0.2);"></div>
            <div style="text-align: center;">
                <div style="color: #3b82f6; font-size: 22px; font-weight: 900; line-height: 1;">${edgesCount}</div>
                <div style="color: rgba(255,255,255,0.4); font-size: 8px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-top: 2px;">LINKS</div>
            </div>
            <div style="width: 1px; background: rgba(0,212,170,0.2);"></div>
            <div style="text-align: center;">
                <div style="color: #a855f7; font-size: 22px; font-weight: 900; line-height: 1;">8</div>
                <div style="color: rgba(255,255,255,0.4); font-size: 8px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-top: 2px;">DOMAINS</div>
            </div>
        `;
        content.appendChild(stats);

        // ────── Node Detail Tooltip ──────
        const tooltip = document.createElement('div');
        tooltip.id = 'goe-kg-tooltip';
        tooltip.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 20px;
            z-index: 100;
            background: rgba(5, 12, 20, 0.95);
            padding: 16px 22px;
            border: 1px solid rgba(0, 212, 170, 0.35);
            border-radius: 12px;
            backdrop-filter: blur(16px);
            box-shadow: 0 10px 40px rgba(0,0,0,0.6);
            max-width: 380px;
            display: none;
            transition: opacity 0.2s;
        `;
        content.appendChild(tooltip);

        const cyContainer = document.createElement('div');
        cyContainer.style.width = '100%';
        cyContainer.style.height = '100%';
        content.appendChild(cyContainer);

        // Initialize Cytoscape
        this.cy = cytoscape({
            container: cyContainer,
            elements: this.getIndiaMockData(),
            style: ([
                {
                    selector: 'node',
                    style: {
                        'background-color': 'data(color)',
                        'background-opacity': 0.85,
                        'label': 'data(label)',
                        'color': '#fff',
                        'font-family': 'Inter, Roboto, sans-serif',
                        'font-size': '12px',
                        'font-weight': 'bold',
                        'text-valign': 'center',
                        'text-halign': 'center',
                        'width': 'data(size)',
                        'height': 'data(size)',
                        'border-width': 2,
                        'border-color': 'rgba(255,255,255,0.12)',
                        'text-outline-width': 3,
                        'text-outline-color': 'rgba(5, 12, 20, 0.95)',
                        'overlay-color': '#00d4aa',
                        'overlay-opacity': 0.08,
                        'text-wrap': 'wrap',
                        'text-max-width': '120px',
                        'shadow-blur': 20,
                        'shadow-color': 'data(color)',
                        'shadow-opacity': 0.35,
                    }
                },
                {
                    selector: 'node[tier="core"]',
                    style: {
                        'font-size': '16px',
                        'font-weight': 'bold',
                        'border-width': 4,
                        'border-color': 'rgba(0, 212, 170, 0.5)',
                        'text-outline-width': 4,
                        'shadow-blur': 40,
                        'shadow-opacity': 0.5,
                    }
                },
                {
                    selector: 'node[tier="domain"]',
                    style: {
                        'font-size': '13px',
                        'border-width': 3,
                        'border-color': 'rgba(255,255,255,0.15)',
                        'shadow-blur': 28,
                        'shadow-opacity': 0.4,
                    }
                },
                {
                    selector: 'node[tier="leaf"]',
                    style: {
                        'font-size': '10px',
                        'border-width': 1.5,
                        'text-max-width': '100px',
                        'shadow-blur': 14,
                        'shadow-opacity': 0.25,
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 1.5,
                        'line-color': 'rgba(0, 212, 170, 0.18)',
                        'target-arrow-color': 'rgba(0, 212, 170, 0.4)',
                        'target-arrow-shape': 'chevron',
                        'arrow-scale': 0.8,
                        'curve-style': 'bezier',
                        'label': 'data(label)',
                        'font-size': '8px',
                        'color': 'rgba(255,255,255,0.3)',
                        'text-rotation': 'autorotate',
                        'text-margin-y': -10,
                        'font-weight': 'bold',
                        'text-outline-width': 2,
                        'text-outline-color': 'rgba(5, 12, 20, 0.8)',
                    }
                },
                {
                    selector: 'edge[type="synergy"]',
                    style: {
                        'line-style': 'dashed',
                        'line-dash-pattern': [6, 4],
                        'line-color': 'rgba(168, 85, 247, 0.2)',
                        'target-arrow-color': 'rgba(168, 85, 247, 0.35)',
                        'width': 1,
                    }
                },
                {
                    selector: ':selected',
                    style: {
                        'border-width': 5,
                        'border-color': '#00d4aa',
                        'line-color': '#00d4aa',
                        'target-arrow-color': '#00d4aa',
                        'shadow-blur': 50,
                        'shadow-opacity': 0.7,
                    }
                }
            ] as any),
            layout: {
                name: 'fcose',
                animate: true,
                animationDuration: 1200,
                randomize: true,
                fit: true,
                padding: 60,
                nodeRepulsion: 9000,
                idealEdgeLength: 180,
                edgeElasticity: 0.35,
                nestingFactor: 0.15,
                gravity: 0.3,
                numIter: 3000,
                nodeSeparation: 80,
            } as any,
            minZoom: 0.3,
            maxZoom: 3,
            wheelSensitivity: 0.3,
        });

        // ────── Node hover tooltip ──────
        this.cy.on('mouseover', 'node', (evt) => {
            const node = evt.target;
            const desc = node.data('desc') || 'Strategic intelligence node';
            const tier = node.data('tier') || 'asset';
            const label = node.data('label');
            const color = node.data('color');
            tooltip.style.display = 'block';
            tooltip.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                    <div style="width: 12px; height: 12px; border-radius: 50%; background: ${color}; box-shadow: 0 0 12px ${color};"></div>
                    <span style="color: #fff; font-weight: 800; font-size: 14px; letter-spacing: 1px;">${label}</span>
                </div>
                <div style="color: rgba(255,255,255,0.55); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px;">TIER: ${tier.toUpperCase()}</div>
                <div style="color: rgba(255,255,255,0.7); font-size: 12px; line-height: 1.5;">${desc}</div>
                <div style="margin-top: 10px; display: flex; gap: 12px;">
                    <span style="color: rgba(0,212,170,0.7); font-size: 10px; font-weight: 700;">CONNECTIONS: ${node.connectedEdges().length}</span>
                    <span style="color: rgba(59,130,246,0.7); font-size: 10px; font-weight: 700;">NEIGHBORS: ${node.neighborhood('node').length}</span>
                </div>
            `;
        });

        this.cy.on('mouseout', 'node', () => {
            tooltip.style.display = 'none';
        });

        this.cy.on('tap', 'node', (evt) => {
            const node = evt.target;
            console.log('[GOE-KG] Selected Node:', node.data('label'));
        });
    }

    private legendItem(color: string, label: string): string {
        return `
            <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 9px; height: 9px; border-radius: 50%; background: ${color}; box-shadow: 0 0 10px ${color}; flex-shrink: 0;"></div>
                <span style="font-size: 10px; color: rgba(255,255,255,0.75); font-weight: 600;">${label}</span>
            </div>
        `;
    }

    private getIndiaMockData(): any[] {
        return [
            // ═══════════════════════════════════════════════
            //  CORE NODE
            // ═══════════════════════════════════════════════
            {
                data: {
                    id: 'india', label: 'BHARAT', color: '#00d4aa', size: 160, tier: 'core',
                    desc: 'Republic of India — 1.4B population, 5th largest economy, nuclear state, civilizational power driving global transformation.'
                }
            },

            // ═══════════════════════════════════════════════
            //  DOMAIN NODES (Tier 1)
            // ═══════════════════════════════════════════════
            {
                data: {
                    id: 'dpi', label: 'DIGITAL PUBLIC INFRA', color: '#3b82f6', size: 105, tier: 'domain',
                    desc: 'India Stack: Aadhaar, UPI, DigiLocker, ONDC — serving as global model for digital governance.'
                }
            },
            {
                data: {
                    id: 'defence', label: 'SELF-RELIANT DEFENCE', color: '#ef4444', size: 105, tier: 'domain',
                    desc: 'Indigenous defence ecosystem: Tejas, INS Vikrant, BrahMos — $75B+ defence capability modernization.'
                }
            },
            {
                data: {
                    id: 'semi', label: 'SEMICONDUCTOR HUB', color: '#3b82f6', size: 100, tier: 'domain',
                    desc: 'India Semiconductor Mission: $10B investment, TATA-PSMC, Micron, CG Power fabs driving chip sovereignty.'
                }
            },
            {
                data: {
                    id: 'economy', label: '$5T ECONOMY DRIVE', color: '#f97316', size: 105, tier: 'domain',
                    desc: 'World\'s fastest-growing large economy. PLI schemes across 14 sectors, manufacturing renaissance.'
                }
            },
            {
                data: {
                    id: 'space', label: 'SPACE POWER', color: '#06b6d4', size: 100, tier: 'domain',
                    desc: 'ISRO / IN-SPACe: Moon landing, Mars orbiter, Gaganyaan crewed mission, 400+ satellites launched.'
                }
            },
            {
                data: {
                    id: 'diplomacy', label: 'GLOBAL LEADERSHIP', color: '#a855f7', size: 105, tier: 'domain',
                    desc: 'Voice of Global South, G20 Presidency, QUAD, SCO, BRICS+ — multi-alignment strategic autonomy.'
                }
            },
            {
                data: {
                    id: 'green', label: 'GREEN TRANSITION', color: '#10b981', size: 100, tier: 'domain',
                    desc: '500 GW renewable target by 2030, National Green Hydrogen Mission, world\'s largest solar program.'
                }
            },
            {
                data: {
                    id: 'talent', label: 'HUMAN CAPITAL', color: '#eab308', size: 100, tier: 'domain',
                    desc: 'World\'s youngest workforce, IIT/AIIMS ecosystem, NEP 2020 — skilling 400M+ by 2030.'
                }
            },

            // ═══════════════════════════════════════════════
            //  LEAF NODES — Digital Public Infrastructure
            // ═══════════════════════════════════════════════
            {
                data: {
                    id: 'upi', label: 'UPI GLOBAL', color: '#3b82f6', size: 65, tier: 'leaf',
                    desc: 'Unified Payments Interface: 14B+ monthly transactions, adopted in 30+ countries. Real-time payment revolution.'
                }
            },
            {
                data: {
                    id: 'ocen', label: 'OCEN / ONDC', color: '#3b82f6', size: 60, tier: 'leaf',
                    desc: 'Open Credit & Commerce Networks — democratizing lending and e-commerce via open protocols.'
                }
            },
            {
                data: {
                    id: 'aadhaar', label: 'AADHAAR (1.4B)', color: '#3b82f6', size: 60, tier: 'leaf',
                    desc: 'World\'s largest biometric identity system — 1.4 billion enrolled, backbone of digital governance.'
                }
            },
            {
                data: {
                    id: 'digilocker', label: 'DIGILOCKER', color: '#3b82f6', size: 50, tier: 'leaf',
                    desc: 'Cloud-based document storage linked to Aadhaar — 200M+ users, paperless governance.'
                }
            },

            // ═══════════════════════════════════════════════
            //  LEAF NODES — Defence
            // ═══════════════════════════════════════════════
            {
                data: {
                    id: 'brahmos', label: 'BRAHMOS', color: '#ef4444', size: 65, tier: 'leaf',
                    desc: 'World\'s fastest cruise missile (Mach 3.5). Export success to Philippines, Indonesia. Strategic deterrent.'
                }
            },
            {
                data: {
                    id: 'vikrant', label: 'INS VIKRANT', color: '#ef4444', size: 65, tier: 'leaf',
                    desc: 'India\'s first indigenous aircraft carrier — 45,000 tonnes, STOBAR configuration, blue water capability.'
                }
            },
            {
                data: {
                    id: 'tejas', label: 'TEJAS MK2', color: '#ef4444', size: 60, tier: 'leaf',
                    desc: '4.5 gen indigenous light combat aircraft. 200+ orders including international interest.'
                }
            },
            {
                data: {
                    id: 'agni', label: 'AGNI-V ICBM', color: '#ef4444', size: 55, tier: 'leaf',
                    desc: 'Intercontinental ballistic missile with MIRV capability — 5,000+ km range, nuclear triad pillar.'
                }
            },
            {
                data: {
                    id: 'arihant', label: 'INS ARIHANT', color: '#ef4444', size: 55, tier: 'leaf',
                    desc: 'Nuclear-powered ballistic missile submarine — completes India\'s nuclear triad.'
                }
            },

            // ═══════════════════════════════════════════════
            //  LEAF NODES — Semiconductor
            // ═══════════════════════════════════════════════
            {
                data: {
                    id: 'tata-semi', label: 'TATA-PSMC FAB', color: '#3b82f6', size: 60, tier: 'leaf',
                    desc: 'TATA-PSMC semiconductor fab in Dholera, Gujarat. 28nm chip fabrication facility, $11B investment.'
                }
            },
            {
                data: {
                    id: 'micron', label: 'MICRON GUJARAT', color: '#3b82f6', size: 60, tier: 'leaf',
                    desc: 'Micron Technology ATMP unit in Sanand — $2.75B investment for assembly, testing, and packaging.'
                }
            },
            {
                data: {
                    id: 'cg-semi', label: 'CG POWER FAB', color: '#3b82f6', size: 55, tier: 'leaf',
                    desc: 'CG Power semiconductor OSAT facility — power electronics and analog chip packaging.'
                }
            },

            // ═══════════════════════════════════════════════
            //  LEAF NODES — Economy
            // ═══════════════════════════════════════════════
            {
                data: {
                    id: 'invest', label: 'PLI SCHEMES', color: '#f97316', size: 65, tier: 'leaf',
                    desc: 'Production Linked Incentive across 14 sectors — $26B+ allocated, attracting global manufacturing.'
                }
            },
            {
                data: {
                    id: 'shakti', label: 'GATI SHAKTI', color: '#f97316', size: 60, tier: 'leaf',
                    desc: 'PM Gati Shakti — unified national master plan for multi-modal $1.3T infrastructure connectivity.'
                }
            },
            {
                data: {
                    id: 'startup', label: 'STARTUP INDIA', color: '#f97316', size: 60, tier: 'leaf',
                    desc: '3rd largest startup ecosystem globally. 100+ unicorns, deep-tech innovation hubs.'
                }
            },
            {
                data: {
                    id: 'make-india', label: 'MAKE IN INDIA', color: '#f97316', size: 55, tier: 'leaf',
                    desc: 'Manufacturing push across defense, electronics, automotive. 25+ sectors opened for FDI.'
                }
            },
            {
                data: {
                    id: 'corridor', label: 'INDUSTRIAL CORRIDORS', color: '#06b6d4', size: 55, tier: 'leaf',
                    desc: 'DMIC, CBIC, AKIC — mega industrial corridors integrating ports, highways, and smart cities.'
                }
            },

            // ═══════════════════════════════════════════════
            //  LEAF NODES — Space
            // ═══════════════════════════════════════════════
            {
                data: {
                    id: 'chandrayaan', label: 'CHANDRAYAAN 4', color: '#06b6d4', size: 65, tier: 'leaf',
                    desc: 'Lunar sample return mission. India — 4th country to soft-land on the Moon (South Pole).'
                }
            },
            {
                data: {
                    id: 'gaganyaan', label: 'GAGANYAAN', color: '#06b6d4', size: 65, tier: 'leaf',
                    desc: 'India\'s first crewed spaceflight program — astronaut training with international partnerships.'
                }
            },
            {
                data: {
                    id: 'aditya', label: 'ADITYA-L1', color: '#06b6d4', size: 55, tier: 'leaf',
                    desc: 'India\'s first solar observatory at Sun-Earth L1 point — studying solar corona and space weather.'
                }
            },
            {
                data: {
                    id: 'inspace', label: 'IN-SPACe', color: '#06b6d4', size: 50, tier: 'leaf',
                    desc: 'Privatized space sector — 200+ space startups, rocket launches by Agnikul, Skyroot.'
                }
            },

            // ═══════════════════════════════════════════════
            //  LEAF NODES — Diplomacy
            // ═══════════════════════════════════════════════
            {
                data: {
                    id: 'quad', label: 'QUAD ALLIANCE', color: '#a855f7', size: 65, tier: 'leaf',
                    desc: 'India-US-Japan-Australia strategic partnership: Indo-Pacific maritime security, tech, health, climate.'
                }
            },
            {
                data: {
                    id: 'imEC', label: 'IMEC CORRIDOR', color: '#a855f7', size: 60, tier: 'leaf',
                    desc: 'India-Middle East-Europe Economic Corridor — G20 landmark, countering BRI with democratic infrastructure.'
                }
            },
            {
                data: {
                    id: 'g20', label: 'G20 PRESIDENCY', color: '#a855f7', size: 60, tier: 'leaf',
                    desc: 'Landmark 2023 presidency: African Union inclusion, Digital Public Infrastructure as global model.'
                }
            },
            {
                data: {
                    id: 'brics', label: 'BRICS+ VOICE', color: '#a855f7', size: 55, tier: 'leaf',
                    desc: 'Founding BRICS member, driving multipolar world order alongside strategic autonomy.'
                }
            },
            {
                data: {
                    id: 'unsc', label: 'UNSC REFORM', color: '#a855f7', size: 50, tier: 'leaf',
                    desc: 'Campaign for permanent UN Security Council seat — backed by US, France, UK.'
                }
            },

            // ═══════════════════════════════════════════════
            //  LEAF NODES — Green Transition
            // ═══════════════════════════════════════════════
            {
                data: {
                    id: 'solar', label: 'SOLAR MISSION', color: '#10b981', size: 60, tier: 'leaf',
                    desc: 'World\'s largest solar park (Bhadla 2.25 GW). National Solar Mission targeting 280 GW by 2030.'
                }
            },
            {
                data: {
                    id: 'hydrogen', label: 'GREEN HYDROGEN', color: '#10b981', size: 60, tier: 'leaf',
                    desc: 'National Green Hydrogen Mission — $2.3B investment, 5 MMT production target by 2030.'
                }
            },
            {
                data: {
                    id: 'ev-push', label: 'EV REVOLUTION', color: '#10b981', size: 55, tier: 'leaf',
                    desc: 'FAME subsidies, 30% EV target by 2030, OLA/TATA/Ather scaling EV manufacturing.'
                }
            },
            {
                data: {
                    id: 'ethanol', label: 'ETHANOL BLENDING', color: '#10b981', size: 50, tier: 'leaf',
                    desc: '20% ethanol blending target achieved ahead of schedule — reducing fossil fuel dependence.'
                }
            },

            // ═══════════════════════════════════════════════
            //  LEAF NODES — Human Capital
            // ═══════════════════════════════════════════════
            {
                data: {
                    id: 'nep', label: 'NEP 2020', color: '#eab308', size: 60, tier: 'leaf',
                    desc: 'National Education Policy — multilingual, multi-disciplinary, global campus approach. 50% GER target.'
                }
            },
            {
                data: {
                    id: 'iit-sys', label: 'IIT SYSTEM', color: '#eab308', size: 55, tier: 'leaf',
                    desc: '23 IITs producing world-class engineers. IIT alumni lead global tech companies.'
                }
            },
            {
                data: {
                    id: 'skill-india', label: 'SKILL INDIA', color: '#eab308', size: 55, tier: 'leaf',
                    desc: 'Skill India Mission — training 400M youth in emerging tech, healthcare, green jobs by 2030.'
                }
            },
            {
                data: {
                    id: 'aiims', label: 'AIIMS NETWORK', color: '#eab308', size: 50, tier: 'leaf',
                    desc: '22 AIIMS institutions nationwide — healthcare excellence and medical tourism hub.'
                }
            },

            // ═══════════════════════════════════════════════
            //  PRIMARY EDGES — Core to Domains
            // ═══════════════════════════════════════════════
            { data: { source: 'india', target: 'dpi', label: 'DIGITAL SPINE' } },
            { data: { source: 'india', target: 'defence', label: 'SOVEREIGNTY' } },
            { data: { source: 'india', target: 'semi', label: 'CHIP AMBITION' } },
            { data: { source: 'india', target: 'economy', label: 'GROWTH ENGINE' } },
            { data: { source: 'india', target: 'space', label: 'FRONTIER' } },
            { data: { source: 'india', target: 'diplomacy', label: 'VISHWAGURU' } },
            { data: { source: 'india', target: 'green', label: 'NET ZERO PATH' } },
            { data: { source: 'india', target: 'talent', label: 'DEMOGRAPHIC DIVIDEND' } },

            // ═══════════════════════════════════════════════
            //  SECONDARY EDGES — Domain to Leaves
            // ═══════════════════════════════════════════════
            { data: { source: 'dpi', target: 'upi', label: 'PAYMENT RAIL' } },
            { data: { source: 'dpi', target: 'ocen', label: 'CREDIT DEMOC.' } },
            { data: { source: 'dpi', target: 'aadhaar', label: 'IDENTITY LAYER' } },
            { data: { source: 'dpi', target: 'digilocker', label: 'DOC VAULT' } },

            { data: { source: 'defence', target: 'brahmos', label: 'CRUISE STRIKE' } },
            { data: { source: 'defence', target: 'vikrant', label: 'CARRIER OPS' } },
            { data: { source: 'defence', target: 'tejas', label: 'AIR POWER' } },
            { data: { source: 'defence', target: 'agni', label: 'NUCLEAR TRIAD' } },
            { data: { source: 'defence', target: 'arihant', label: 'SUB FORCE' } },

            { data: { source: 'semi', target: 'tata-semi', label: 'DHOLERA FAB' } },
            { data: { source: 'semi', target: 'micron', label: 'ATMP UNIT' } },
            { data: { source: 'semi', target: 'cg-semi', label: 'OSAT' } },

            { data: { source: 'economy', target: 'invest', label: 'INCENTIVE PUSH' } },
            { data: { source: 'economy', target: 'shakti', label: 'INFRA RAIL' } },
            { data: { source: 'economy', target: 'startup', label: 'INNOVATION' } },
            { data: { source: 'economy', target: 'make-india', label: 'MFG DRIVE' } },
            { data: { source: 'economy', target: 'corridor', label: 'LOGISTICS' } },

            { data: { source: 'space', target: 'chandrayaan', label: 'LUNAR MISSION' } },
            { data: { source: 'space', target: 'gaganyaan', label: 'HUMAN FLIGHT' } },
            { data: { source: 'space', target: 'aditya', label: 'SOLAR STUDY' } },
            { data: { source: 'space', target: 'inspace', label: 'PRIVATE SPACE' } },

            { data: { source: 'diplomacy', target: 'quad', label: 'INDO-PACIFIC' } },
            { data: { source: 'diplomacy', target: 'imEC', label: 'TRADE BRIDGE' } },
            { data: { source: 'diplomacy', target: 'g20', label: 'PRESIDENCY' } },
            { data: { source: 'diplomacy', target: 'brics', label: 'MULTIPOLAR' } },
            { data: { source: 'diplomacy', target: 'unsc', label: 'REFORM PUSH' } },

            { data: { source: 'green', target: 'solar', label: 'SOLAR SCALE' } },
            { data: { source: 'green', target: 'hydrogen', label: 'H2 ECONOMY' } },
            { data: { source: 'green', target: 'ev-push', label: 'EV ADOPTION' } },
            { data: { source: 'green', target: 'ethanol', label: 'BIO FUEL' } },

            { data: { source: 'talent', target: 'nep', label: 'EDU REFORM' } },
            { data: { source: 'talent', target: 'iit-sys', label: 'EXCELLENCE' } },
            { data: { source: 'talent', target: 'skill-india', label: 'UPSKILLING' } },
            { data: { source: 'talent', target: 'aiims', label: 'HEALTH INFRA' } },

            // ═══════════════════════════════════════════════
            //  CROSS-DOMAIN SYNERGY EDGES (dashed)
            // ═══════════════════════════════════════════════
            { data: { source: 'upi', target: 'economy', label: 'FORMALIZATION', type: 'synergy' } },
            { data: { source: 'semi', target: 'defence', label: 'CRITICAL TECH', type: 'synergy' } },
            { data: { source: 'dpi', target: 'economy', label: 'FIN INCLUSION', type: 'synergy' } },
            { data: { source: 'talent', target: 'dpi', label: 'TECH TALENT', type: 'synergy' } },
            { data: { source: 'green', target: 'economy', label: 'GREEN GROWTH', type: 'synergy' } },
            { data: { source: 'startup', target: 'inspace', label: 'DEEP TECH', type: 'synergy' } },
            { data: { source: 'iit-sys', target: 'semi', label: 'CHIP DESIGN', type: 'synergy' } },
            { data: { source: 'hydrogen', target: 'corridor', label: 'H2 LOGISTICS', type: 'synergy' } },
            { data: { source: 'imEC', target: 'corridor', label: 'TRADE INFRA', type: 'synergy' } },
            { data: { source: 'quad', target: 'defence', label: 'JOINT OPS', type: 'synergy' } },
            { data: { source: 'ev-push', target: 'semi', label: 'POWER IC', type: 'synergy' } },
            { data: { source: 'aadhaar', target: 'skill-india', label: 'ID VERIFY', type: 'synergy' } },
        ];
    }

    public async refresh(): Promise<void> {
        if (!this.cy) {
            this.showLoading();
            setTimeout(() => {
                const content = this.getElement().querySelector('.panel-content') as HTMLElement;
                if (content) {
                    content.innerHTML = '';
                    this.renderContent(content);
                }
            }, 100);
        } else {
            this.cy.layout({
                name: 'fcose',
                animate: true,
                animationDuration: 1200,
                fit: true,
                padding: 60,
                nodeRepulsion: 9000,
                idealEdgeLength: 180,
            } as any).run();
        }
    }
}
