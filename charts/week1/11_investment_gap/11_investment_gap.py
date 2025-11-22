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

def generate_investment_gap_chart():
    """
    Investment gap analysis showing current green finance vs required for climate goals.
    Demonstrates the massive funding gap that needs to be closed.
    """
    plt.style.use('seaborn-v0_8')
    fig, ax = plt.subplots(figsize=(10, 6))

    # Data: Annual investment required vs current (USD billions)
    categories = ['Energy\nTransition', 'Buildings\nEfficiency', 'Sustainable\nTransport',
                  'Nature-based\nSolutions', 'Water\nInfrastructure']
    required = [1200, 680, 520, 340, 280]  # What's needed annually
    current = [410, 210, 180, 85, 95]      # Current annual investment

    x = np.arange(len(categories))
    width = 0.35

    # Create bars
    bars1 = ax.bar(x - width/2, required, width, label='Required Investment',
                   color=COLORS['warning'], alpha=0.8, edgecolor='white', linewidth=1.5)
    bars2 = ax.bar(x + width/2, current, width, label='Current Investment',
                   color=COLORS['primary'], alpha=0.8, edgecolor='white', linewidth=1.5)

    # Add gap annotations
    for i in range(len(categories)):
        gap = required[i] - current[i]
        gap_pct = (gap / required[i]) * 100
        ax.text(i, required[i] + 50, f'Gap: ${gap}B\n({gap_pct:.0f}%)',
                ha='center', va='bottom', fontsize=9, color=COLORS['neutral'],
                fontweight='bold')

    # Styling
    ax.set_xlabel('Sector', fontsize=12, fontweight='bold', color=COLORS['primary'])
    ax.set_ylabel('Annual Investment (USD Billions)', fontsize=12, fontweight='bold',
                  color=COLORS['primary'])
    ax.set_title('Green Finance Investment Gap by Sector\nAnnual Investment Required vs Current (2024)',
                 fontsize=14, fontweight='bold', color=COLORS['primary'], pad=20)

    ax.set_xticks(x)
    ax.set_xticklabels(categories, fontsize=10)
    ax.legend(loc='upper right', fontsize=10, framealpha=0.9)

    # Grid and background
    ax.grid(True, alpha=0.3, linestyle='--', axis='y', color=COLORS['neutral'])
    ax.set_facecolor('#FAFAFA')
    fig.patch.set_facecolor('white')

    # Set y-axis limit
    ax.set_ylim(0, 1400)

    # Add total gap text
    total_required = sum(required)
    total_current = sum(current)
    total_gap = total_required - total_current
    gap_pct = (total_gap / total_required) * 100

    ax.text(0.02, 0.98, f'Total Gap: ${total_gap}B/year ({gap_pct:.1f}%)',
            transform=ax.transAxes, fontsize=11, fontweight='bold',
            va='top', ha='left', color=COLORS['warning'],
            bbox=dict(boxstyle='round', facecolor='white', alpha=0.8, edgecolor=COLORS['warning']))

    plt.tight_layout()

    # Save as PDF
    output_path = 'charts/week1/11_investment_gap/11_investment_gap.pdf'
    plt.savefig(output_path, format='pdf', dpi=300, bbox_inches='tight', facecolor='white')
    print(f"Chart saved: {output_path}")
    plt.close()

if __name__ == "__main__":
    generate_investment_gap_chart()
