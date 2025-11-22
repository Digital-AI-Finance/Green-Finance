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

def generate_verification_stats_chart():
    """
    Verification statistics showing adoption of external review over time.
    Demonstrates signaling theory in practice - verification as credible signal.
    """
    plt.style.use('seaborn-v0_8')
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 6))

    # Left chart: Time series of external review adoption
    years = np.array([2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024])
    verification_rate = np.array([72, 78, 82, 85, 88, 91, 93, 94, 95, 96])

    ax1.plot(years, verification_rate, marker='o', linewidth=2.5,
             color=COLORS['primary'], markersize=8, markerfacecolor=COLORS['secondary'],
             markeredgewidth=2, markeredgecolor=COLORS['primary'])

    ax1.fill_between(years, verification_rate, alpha=0.2, color=COLORS['primary'])

    ax1.axhline(y=90, color=COLORS['success'], linestyle='--', linewidth=1.5, alpha=0.7)
    ax1.text(2015.3, 91, '90% threshold', fontsize=9, color=COLORS['success'])

    ax1.set_xlabel('Year', fontsize=11, fontweight='bold', color=COLORS['primary'])
    ax1.set_ylabel('External Review Rate (%)', fontsize=11, fontweight='bold',
                   color=COLORS['primary'])
    ax1.set_title('Verification Adoption Over Time', fontsize=12, fontweight='bold',
                  color=COLORS['primary'])

    ax1.grid(True, alpha=0.3, linestyle='--', color=COLORS['neutral'])
    ax1.set_facecolor('#FAFAFA')
    ax1.set_ylim(65, 100)

    # Right chart: Verification types breakdown (2024)
    verification_types = ['Second Party\nOpinion', 'Certification', 'Green Bond\nRating',
                          'Verification\nReport', 'No External\nReview']
    percentages = [68, 18, 6, 4, 4]

    colors_pie = [COLORS['primary'], COLORS['secondary'], COLORS['success'],
                  COLORS['warning'], COLORS['neutral']]

    wedges, texts, autotexts = ax2.pie(percentages, labels=verification_types,
                                        autopct='%1.0f%%', startangle=90,
                                        colors=colors_pie, explode=(0.05, 0, 0, 0, 0.05))

    for text in texts:
        text.set_fontsize(9)
        text.set_color(COLORS['primary'])
        text.set_fontweight('bold')

    for autotext in autotexts:
        autotext.set_color('white')
        autotext.set_fontsize(10)
        autotext.set_fontweight('bold')

    ax2.set_title('Verification Types (2024)', fontsize=12, fontweight='bold',
                  color=COLORS['primary'])

    fig.patch.set_facecolor('white')
    fig.suptitle('External Verification in Green Bond Market\nEvidence of Signaling Theory',
                 fontsize=14, fontweight='bold', color=COLORS['primary'], y=1.00)

    plt.tight_layout()

    # Save as PDF
    output_path = 'charts/week1/12_verification_stats/12_verification_stats.pdf'
    plt.savefig(output_path, format='pdf', dpi=300, bbox_inches='tight', facecolor='white')
    print(f"Chart saved: {output_path}")
    plt.close()

if __name__ == "__main__":
    generate_verification_stats_chart()
