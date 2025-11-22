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

def generate_esg_fund_flows_chart():
    """
    ESG fund inflows showing investor demand trends.
    Demonstrates market segmentation and dedicated ESG investor base.
    """
    plt.style.use('seaborn-v0_8')
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 8), height_ratios=[2, 1])

    # Top chart: Quarterly ESG fund inflows
    quarters = ['Q1\n2019', 'Q2', 'Q3', 'Q4', 'Q1\n2020', 'Q2', 'Q3', 'Q4',
                'Q1\n2021', 'Q2', 'Q3', 'Q4', 'Q1\n2022', 'Q2', 'Q3', 'Q4',
                'Q1\n2023', 'Q2', 'Q3', 'Q4', 'Q1\n2024', 'Q2', 'Q3', 'Q4']

    inflows = np.array([12, 15, 18, 22, 28, 45, 52, 61, 72, 85, 92, 105,
                        78, 65, 58, 62, 68, 75, 82, 95, 102, 110, 118, 125])

    x = np.arange(len(quarters))

    # Create bar chart with color gradient
    bars = ax1.bar(x, inflows, color=COLORS['primary'], alpha=0.7,
                   edgecolor=COLORS['primary'], linewidth=1.5)

    # Highlight 2024 quarters
    for i in range(20, 24):
        bars[i].set_color(COLORS['success'])
        bars[i].set_alpha(0.8)

    # Add trend line
    z = np.polyfit(x, inflows, 2)
    p = np.poly1d(z)
    ax1.plot(x, p(x), linestyle='--', linewidth=2.5, color=COLORS['warning'],
             label='Trend (Polynomial Fit)', alpha=0.9)

    # Add 2020 covid marker
    ax1.axvline(x=4, color=COLORS['neutral'], linestyle=':', linewidth=2, alpha=0.5)
    ax1.text(4.5, 120, 'COVID-19 ESG Surge', fontsize=9, color=COLORS['neutral'],
             rotation=0, va='top')

    ax1.set_ylabel('Net Inflows (USD Billions)', fontsize=11, fontweight='bold',
                   color=COLORS['primary'])
    ax1.set_title('ESG Fund Net Inflows 2019-2024\nQuarterly Data Showing Strong Investor Demand',
                  fontsize=13, fontweight='bold', color=COLORS['primary'], pad=15)

    ax1.set_xticks(x[::2])
    ax1.set_xticklabels(quarters[::2], fontsize=9)
    ax1.legend(loc='upper left', fontsize=9)
    ax1.grid(True, alpha=0.3, linestyle='--', axis='y', color=COLORS['neutral'])
    ax1.set_facecolor('#FAFAFA')

    # Bottom chart: Assets under management growth
    years = np.array([2019, 2020, 2021, 2022, 2023, 2024])
    aum = np.array([1.2, 1.8, 2.7, 2.5, 2.9, 3.5])  # Trillions USD

    ax2.plot(years, aum, marker='o', linewidth=3, color=COLORS['primary'],
             markersize=10, markerfacecolor=COLORS['secondary'],
             markeredgewidth=2, markeredgecolor=COLORS['primary'])

    ax2.fill_between(years, aum, alpha=0.2, color=COLORS['primary'])

    # Add value labels
    for year, value in zip(years, aum):
        ax2.text(year, value + 0.1, f'${value:.1f}T', ha='center', va='bottom',
                fontsize=9, fontweight='bold', color=COLORS['primary'])

    ax2.set_xlabel('Year', fontsize=11, fontweight='bold', color=COLORS['primary'])
    ax2.set_ylabel('Assets Under Management\n(USD Trillions)', fontsize=11,
                   fontweight='bold', color=COLORS['primary'])
    ax2.set_title('ESG Fund Assets Under Management', fontsize=12, fontweight='bold',
                  color=COLORS['primary'])

    ax2.grid(True, alpha=0.3, linestyle='--', color=COLORS['neutral'])
    ax2.set_facecolor('#FAFAFA')
    ax2.set_ylim(0, 4)

    fig.patch.set_facecolor('white')

    # Add summary statistics box
    total_inflows = sum(inflows)
    cagr = ((aum[-1] / aum[0]) ** (1/5) - 1) * 100

    fig.text(0.98, 0.52, f'Total Inflows (2019-2024): ${total_inflows:.0f}B\n' +
                          f'AUM CAGR (5-year): {cagr:.1f}%\n' +
                          f'Current AUM: ${aum[-1]:.1f} Trillion',
             fontsize=10, fontweight='bold', ha='right', va='top',
             color=COLORS['primary'],
             bbox=dict(boxstyle='round', facecolor='white', alpha=0.9,
                      edgecolor=COLORS['success'], linewidth=2))

    plt.tight_layout()

    # Save as PDF
    output_path = 'charts/week1/15_esg_fund_flows/15_esg_fund_flows.pdf'
    plt.savefig(output_path, format='pdf', dpi=300, bbox_inches='tight', facecolor='white')
    print(f"Chart saved: {output_path}")
    plt.close()

if __name__ == "__main__":
    generate_esg_fund_flows_chart()
