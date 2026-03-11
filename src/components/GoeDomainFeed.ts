import { Panel } from './Panel';

interface GoeFeedItem {
    title: string;
    source: string;
    publishedAt: number;
    link: string;
    goeDomain: string;
    impact: 'critical' | 'high' | 'normal';
}

/**
 * GoeDomainFeed Panel
 * REWRITTEN: 100% India Centric Strategic Intelligence Feed.
 */
export class GoeDomainFeed extends Panel {
    private allItems: GoeFeedItem[] = [];

    constructor() {
        super({ id: 'goe_domain_feed', title: 'LIVE INDIA INTEL FEED' });
    }

    protected renderContent(content: HTMLElement): void {
        content.id = 'goe-feed-mount';
        this.renderFeed();
    }

    private renderFeed(): void {
        const mount = document.getElementById('goe-feed-mount');
        if (!mount) return;

        mount.innerHTML = '';
        mount.style.padding = '10px';

        if (this.allItems.length === 0) {
            mount.innerHTML = '<div style="padding: 30px; color: var(--text-dim); text-align: center; font-size: 11px; letter-spacing: 1px;">AGGREGATING NATIONAL INTEL...</div>';
            return;
        }

        const list = document.createElement('div');
        list.style.display = 'flex';
        list.style.flexDirection = 'column';
        list.style.gap = '15px';

        this.allItems.forEach(item => {
            const card = document.createElement('div');
            card.style.cssText = `
                padding: 16px;
                background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
                border-left: 4px solid ${this.getDomainColor(item.goeDomain)};
                border-radius: 8px;
                position: relative;
                overflow: hidden;
            `;

            if (item.impact === 'critical') {
                card.style.boxShadow = `inset 0 0 15px ${this.getDomainColor(item.goeDomain)}22`;
            }

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px; align-items: center;">
                    <span style="color: ${this.getDomainColor(item.goeDomain)}; font-size: 10px; font-weight: 800; letter-spacing: 1.5px;">${item.goeDomain.toUpperCase()}</span>
                    <span style="color: var(--text-dim); font-size: 10px; font-family: monospace;">${this.timeAgo(item.publishedAt)}</span>
                </div>
                <div style="color: #e8e8e8; font-size: 14px; font-weight: 700; line-height: 1.5; margin-bottom: 12px; letter-spacing: 0.2px;">${item.title}</div>
                <div style="display:flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 10px;">
                    <span style="color: var(--text-muted); font-size: 11px; font-weight: 500;">${item.source}</span>
                    <a href="${item.link}" target="_blank" style="color: #00d4aa; font-size: 10px; text-decoration: none; font-weight: 800; display:flex; align-items:center; gap:4px;">ANALYZE DATA →</a>
                </div>
                ${item.impact === 'critical' ? '<div style="position: absolute; top: 10px; right: -25px; background: #ef4444; color: #fff; font-size: 8px; font-weight: 900; padding: 2px 30px; transform: rotate(45deg); letter-spacing: 1px;">CRITICAL</div>' : ''}
            `;
            list.appendChild(card);
        });

        mount.appendChild(list);
    }

    private getDomainColor(domain: string): string {
        const colors: Record<string, string> = {
            geopolitics: '#a855f7',
            economics: '#f97316',
            defence: '#ef4444',
            technology: '#3b82f6',
            climate: '#22c55e',
            society: '#eab308'
        };
        return colors[domain] || '#00d4aa';
    }

    private timeAgo(timestamp: number): string {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        if (seconds < 60) return 'T-0m';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `T-${minutes}m`;
        return `T-${Math.floor(minutes / 60)}h`;
    }

    public async refresh(): Promise<void> {
        this.showLoading();
        // MOCK DATA - 100% India Strategic Focus
        this.allItems = [
            {
                title: "Ministry of External Affairs confirms UPI expansion to 4 GCC nations by Q3",
                source: "INDIA STRATEGIC HUB",
                publishedAt: Date.now() - 420000,
                impact: 'critical',
                link: "#",
                goeDomain: "geopolitics"
            },
            {
                title: "ISRO Gaganyaan: Second uncrewed mission payload testing completed at VSSC",
                source: "TECH MONITOR",
                publishedAt: Date.now() - 1800000,
                impact: 'high',
                link: "#",
                goeDomain: "technology"
            },
            {
                title: "Indigenous Tech: DRDO successfully flight-tests Long Range Land Attack Cruise Missile",
                source: "DEFENCE DESK",
                publishedAt: Date.now() - 3600000,
                impact: 'critical',
                link: "#",
                goeDomain: "defence"
            },
            {
                title: "Economic Surge: India's FX Reserves hit record high as Global Bonds inclusion begins",
                source: "FINANCE HUB",
                publishedAt: Date.now() - 7200000,
                impact: 'high',
                link: "#",
                goeDomain: "economics"
            },
            {
                title: "Semicon India: 3 New ATMP plants approved in Gujarat and Assam clusters",
                source: "INDUSTRIAL INTEL",
                publishedAt: Date.now() - 14400000,
                impact: 'normal',
                link: "#",
                goeDomain: "technology"
            },
            {
                title: "Energy Pivot: Reliance Green Hydrogen plant achieves 30% reduction in electrolyzer cost",
                source: "CLIMATE WATCH",
                publishedAt: Date.now() - 21600000,
                impact: 'normal',
                link: "#",
                goeDomain: "climate"
            },
            {
                title: "Naval Power: Third Aircraft Carrier proposal moves to CCS for final strategic nod",
                source: "MARITIME COMMAND",
                publishedAt: Date.now() - 28800000,
                impact: 'high',
                link: "#",
                goeDomain: "defence"
            }
        ];

        // Small delay to simulate real pulse
        setTimeout(() => {
            const content = this.getElement().querySelector('.panel-content') as HTMLElement;
            if (content) {
                content.innerHTML = '';
                this.renderContent(content);
            }
        }, 500);
    }
}
