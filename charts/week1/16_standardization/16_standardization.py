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

def generate_standardization_chart():
    """
    Standardization adoption showing GBP and other framework compliance over time.
    Demonstrates network effects and liquidity benefits of standardization.
    """
    plt.style.use('seaborn-v0_8')
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 6))

    # Left chart: Standards adoption over time
    years = np.array([2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024])

    gbp_aligned = np.array([42, 58, 68, 75, 81, 85, 88, 91, 93, 95])
    cbi_certified = np.array([8, 12, 18, 24, 28, 32, 36, 39, 42, 45])
    eu_taxonomy = np.array([0, 0, 0, 0, 0, 5, 12, 22, 35, 48])

    ax1.plot(years, gbp_aligned, marker='o', linewidth=2.5, label='GBP-Aligned',
             color=COLORS['primary'], markersize=8)
    ax1.plot(years, cbi_certified, marker='s', linewidth=2.5, label='CBI Certified',
             color=COLORS['success'], markersize=8)
    ax1.plot(years, eu_taxonomy, marker='^', linewidth=2.5, label='EU Taxonomy',
             color=COLORS['warning'], markersize=8)

    ax1.fill_between(years, gbp_aligned, alpha=0.1, color=COLORS['primary'])
    ax1.fill_between(years, cbi_certified, alpha=0.1, color=COLORS['success'])
    ax1.fill_between(years, eu_taxonomy, alpha=0.1, color=COLORS['warning'])

    ax1.set_xlabel('Year', fontsize=11, fontweight='bold', color=COLORS['primary'])
    ax1.set_ylabel('Market Share (%)', fontsize=11, fontweight='bold',
                   color=COLORS['primary'])
    ax1.set_title('Standards Adoption Over Time', fontsize=12, fontweight='bold',
                  color=COLORS['primary'])

    ax1.legend(loc='upper left', fontsize=9, framealpha=0.9)
    ax1.grid(True, alpha=0.3, linestyle='--', color=COLORS['neutral'])
    ax1.set_facecolor('#FAFAFA')
    ax1.set_ylim(0, 100)

    # Add milestone annotations
    ax1.annotate('GBP Launch', xy=(2014, 42), xytext=(2015.5, 20),
                arrowprops=dict(arrowstyle='->', color=COLORS['primary'], lw=1.5),
                fontsize=8, color=COLORS['primary'])
    ax1.annotate('EU GBS\nRegulation', xy=(2020, 5), xytext=(2018.5, 15),
                arrowprops=dict(arrowstyle='->', color=COLORS['warning'], lw=1.5),
                fontsize=8, color=COLORS['warning'])

    # Right chart: 2024 Framework distribution (stacked)
    frameworks = ['GBP-Aligned\nOnly', 'CBI Certified\n(with GBP)', 'EU Taxonomy\n(with GBP)',
                  'Multiple\nFrameworks', 'No Standard\nFramework']
    percentages = [45, 25, 18, 8, 4]

    colors_bar = [COLORS['primary'], COLORS['success'], COLORS['warning'],
                  COLORS['secondary'], COLORS['neutral']]

    bars = ax2.barh(frameworks, percentages, color=colors_bar, edgecolor='white', linewidth=2)

    # Add value labels
    for i, (bar, pct) in enumerate(zip(bars, percentages)):
        width = bar.get_width()
        ax2.text(width + 1, bar.get_y() + bar.get_height()/2,
                f'{pct}%', ha='left', va='center', fontsize=10,
                color=COLORS['primary'], fontweight='bold')

    ax2.set_xlabel('Market Share (%)', fontsize=11, fontweight='bold',
                   color=COLORS['primary'])
    ax2.set_title('Framework Distribution (2024)', fontsize=12, fontweight='bold',
                  color=COLORS['primary'])

    ax2.grid(True, alpha=0.3, linestyle='--', axis='x', color=COLORS['neutral'])
    ax2.set_facecolor('#FAFAFA')
    ax2.set_xlim(0, 55)

    fig.patch.set_facecolor('white')
    fig.suptitle('Standardization in Green Bond Market\nNetwork Effects and Liquidity Benefits',
                 fontsize=14, fontweight='bold', color=COLORS['primary'], y=1.00)

    # Add summary box
    standardized_pct = sum(percentages[:4])
    ax2.text(0.98, 0.02, f'Standardized: {standardized_pct}%\nLiquidity premium from standards',
             transform=ax2.transAxes, fontsize=9, fontweight='bold',
             ha='right', va='bottom', color=COLORS['primary'],
             bbox=dict(boxstyle='round', facecolor='white', alpha=0.9,
                      edgecolor=COLORS['success'], linewidth=2))

    plt.tight_layout()

    # Save as PDF
    output_path = 'charts/week1/16_standardization/16_standardization.pdf'
    plt.savefig(output_path, format='pdf', dpi=300, bbox_inches='tight', facecolor='white')
    print(f"Chart saved: {output_path}")
    plt.close()

if __name__ == "__main__":
    generate_standardization_chart()
