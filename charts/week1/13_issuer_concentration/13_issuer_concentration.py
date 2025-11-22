import matplotlib.pyplot as plt
import numpy as np

# CRITICAL: Template colors
COLORS = {
    'primary': '#3333B2',    # mlpurple
    'secondary': '#ADADE0',  # mllavender
    'success': '#2CA02C',    # mlgreen
    'warning': '#FF7F0E',    # mlorange
    'neutral': '#7F7F7F'     # mlgray
}

def generate_issuer_concentration_chart():
    """
    Top issuers by green bond volume showing market concentration.
    Demonstrates repeat issuer behavior and reputation effects.
    """
    plt.style.use('seaborn-v0_8')
    fig, ax = plt.subplots(figsize=(10, 6))

    # Data: Top 15 issuers (USD billions, cumulative 2015-2024)
    issuers = [
        'European Investment Bank',
        'Republic of France',
        'Federal Republic of Germany',
        'Kingdom of Netherlands',
        'World Bank (IBRD)',
        'Fannie Mae',
        'Bank of China',
        'Industrial & Commercial Bank',
        'Kingdom of Sweden',
        'European Bank for Reconstruction',
        'Nordic Investment Bank',
        'KfW Development Bank',
        'Apple Inc.',
        'Agence France Tresor',
        'Others (1,185 issuers)'
    ]
    volumes = [85, 72, 68, 52, 48, 42, 38, 35, 32, 28, 26, 24, 22, 20, 980]

    # Create gradient colors
    colors = []
    for i in range(len(volumes)):
        if i < 10:
            # Gradient from primary to secondary for top 10
            intensity = 1 - (i / 15)
            colors.append(plt.cm.Blues(0.5 + intensity * 0.5))
        elif i < 14:
            colors.append(COLORS['secondary'])
        else:
            colors.append(COLORS['neutral'])

    # Create horizontal bar chart
    y_pos = np.arange(len(issuers))
    bars = ax.barh(y_pos, volumes, color=colors, edgecolor='white', linewidth=1.5)

    # Highlight top 10
    for i in range(10):
        bars[i].set_edgecolor(COLORS['primary'])
        bars[i].set_linewidth(2)

    # Add value labels
    for i, (volume, issuer) in enumerate(zip(volumes, issuers)):
        if i < 14:
            ax.text(volume + 5, i, f'${volume}B', va='center', fontsize=9,
                    color=COLORS['primary'], fontweight='bold')
        else:
            ax.text(volume + 15, i, f'${volume}B', va='center', fontsize=9,
                    color=COLORS['neutral'], fontweight='bold')

    # Styling
    ax.set_yticks(y_pos)
    ax.set_yticklabels(issuers, fontsize=9)
    ax.invert_yaxis()
    ax.set_xlabel('Cumulative Green Bond Issuance (USD Billions)', fontsize=12,
                  fontweight='bold', color=COLORS['primary'])
    ax.set_title('Top Green Bond Issuers 2015-2024\nMarket Concentration and Repeat Issuers',
                 fontsize=14, fontweight='bold', color=COLORS['primary'], pad=20)

    # Grid and background
    ax.grid(True, alpha=0.3, linestyle='--', axis='x', color=COLORS['neutral'])
    ax.set_facecolor('#FAFAFA')
    fig.patch.set_facecolor('white')

    # Add concentration metrics
    top_10_pct = (sum(volumes[:10]) / sum(volumes)) * 100
    top_50_pct = (sum(volumes[:14]) / sum(volumes)) * 100

    ax.text(0.98, 0.98, f'Top 10: {top_10_pct:.1f}% of market\nTop 50: {top_50_pct:.1f}% of market',
            transform=ax.transAxes, fontsize=10, fontweight='bold',
            va='top', ha='right', color=COLORS['primary'],
            bbox=dict(boxstyle='round', facecolor='white', alpha=0.9,
                     edgecolor=COLORS['primary'], linewidth=2))

    plt.tight_layout()

    # Save as PDF
    output_path = 'charts/week1/13_issuer_concentration/13_issuer_concentration.pdf'
    plt.savefig(output_path, format='pdf', dpi=300, bbox_inches='tight', facecolor='white')
    print(f"Chart saved: {output_path}")
    plt.close()

if __name__ == "__main__":
    generate_issuer_concentration_chart()
