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

def generate_credit_ratings_chart():
    """
    Credit rating distribution comparison: green bonds vs conventional bonds.
    Shows green bonds have similar or slightly better credit quality.
    """
    plt.style.use('seaborn-v0_8')
    fig, ax = plt.subplots(figsize=(10, 6))

    # Data: Credit rating distribution (percentage)
    ratings = ['AAA', 'AA+', 'AA', 'AA-', 'A+', 'A', 'A-', 'BBB+', 'BBB', 'BBB-', 'Below\nBBB-']
    green_bonds = [28, 12, 15, 8, 10, 9, 7, 5, 4, 2, 0]
    conventional_bonds = [18, 10, 12, 9, 11, 12, 10, 8, 6, 3, 1]

    x = np.arange(len(ratings))
    width = 0.35

    # Create grouped bars
    bars1 = ax.bar(x - width/2, green_bonds, width, label='Green Bonds',
                   color=COLORS['primary'], alpha=0.8, edgecolor='white', linewidth=1.5)
    bars2 = ax.bar(x + width/2, conventional_bonds, width, label='Conventional Bonds',
                   color=COLORS['neutral'], alpha=0.6, edgecolor='white', linewidth=1.5)

    # Add value labels on bars
    for bars in [bars1, bars2]:
        for bar in bars:
            height = bar.get_height()
            if height > 0:
                ax.text(bar.get_x() + bar.get_width()/2., height + 0.5,
                       f'{height:.0f}%', ha='center', va='bottom', fontsize=8,
                       color=COLORS['primary'], fontweight='bold')

    # Add investment grade line
    ax.axvline(x=9.5, color=COLORS['warning'], linestyle='--', linewidth=2, alpha=0.7)
    ax.text(9.5, 30, 'Investment Grade Cutoff', rotation=90, va='bottom', ha='right',
            fontsize=9, color=COLORS['warning'], fontweight='bold')

    # Styling
    ax.set_xlabel('Credit Rating', fontsize=12, fontweight='bold', color=COLORS['primary'])
    ax.set_ylabel('Market Share (%)', fontsize=12, fontweight='bold', color=COLORS['primary'])
    ax.set_title('Credit Rating Distribution: Green vs Conventional Bonds\n' +
                 'Green Bonds Show Higher Quality Profile',
                 fontsize=14, fontweight='bold', color=COLORS['primary'], pad=20)

    ax.set_xticks(x)
    ax.set_xticklabels(ratings, fontsize=10)
    ax.legend(loc='upper right', fontsize=11, framealpha=0.9)

    # Grid and background
    ax.grid(True, alpha=0.3, linestyle='--', axis='y', color=COLORS['neutral'])
    ax.set_facecolor('#FAFAFA')
    fig.patch.set_facecolor('white')

    ax.set_ylim(0, 32)

    # Add summary statistics
    green_ig = sum(green_bonds[:10])  # Investment grade
    conv_ig = sum(conventional_bonds[:10])

    ax.text(0.02, 0.98,
            f'Investment Grade:\nGreen: {green_ig}%\nConventional: {conv_ig}%',
            transform=ax.transAxes, fontsize=10, fontweight='bold',
            va='top', ha='left', color=COLORS['primary'],
            bbox=dict(boxstyle='round', facecolor='white', alpha=0.9,
                     edgecolor=COLORS['success'], linewidth=2))

    plt.tight_layout()

    # Save as PDF
    output_path = 'charts/week1/14_credit_ratings/14_credit_ratings.pdf'
    plt.savefig(output_path, format='pdf', dpi=300, bbox_inches='tight', facecolor='white')
    print(f"Chart saved: {output_path}")
    plt.close()

if __name__ == "__main__":
    generate_credit_ratings_chart()
