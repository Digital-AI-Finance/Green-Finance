import matplotlib.pyplot as plt
import numpy as np

# Template colors (CRITICAL: Must match beamer theme)
COLORS = {
    'primary': '#3333B2',     # mlpurple
    'secondary': '#ADADE0',   # mllavender
    'light': '#C1C1E8',
    'lighter': '#CCCCEB',
    'lightest': '#D6D6EF',
    'success': '#2CA02C',
    'warning': '#FF7F0E',
    'danger': '#D62728',
    'neutral': '#7F7F7F'
}

def generate_chart():
    """
    Chart: Global Green Finance Market Growth 2015-2024
    Week: 1
    Type: line
    """
    try:
        # Set style
        plt.style.use('seaborn-v0_8')

        # Create figure (16:9 aspect ratio for beamer)
        fig, ax = plt.subplots(figsize=(10, 6))

        # Data
        years = np.array([2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024])
        values = np.array([300, 420, 580, 850, 1150, 1300, 1650, 1450, 1750, 2100])

        # Create visualization
        ax.plot(years, values, color=COLORS['primary'], linewidth=2.5,
                marker='o', markersize=8, label='Total Green Finance Volume')
        ax.fill_between(years, values, alpha=0.3, color=COLORS['primary'])

        # Styling
        ax.set_xlabel('Year', fontsize=12, fontweight='bold', fontfamily='sans-serif')
        ax.set_ylabel('Volume (Billion USD)', fontsize=12, fontweight='bold', fontfamily='sans-serif')
        ax.set_title('Global Green Finance Market Growth\n2015-2024',
                     fontsize=14, fontweight='bold', fontfamily='sans-serif',
                     color=COLORS['primary'])
        ax.grid(True, alpha=0.3, linestyle='--', color=COLORS['neutral'])

        # Add value labels on points
        for year, val in zip(years, values):
            ax.text(year, val + 50, f'${val}B', ha='center', fontsize=9)

        # Background
        ax.set_facecolor('#FAFAFA')
        fig.patch.set_facecolor('white')

        # Save
        output_path = 'charts/week1/week1_chart1_market_growth.pdf'
        plt.tight_layout()
        plt.savefig(output_path, format='pdf', dpi=300, bbox_inches='tight',
                    facecolor='white', edgecolor='none')
        print(f"SUCCESS: Generated {output_path}")
        plt.close()
        return True

    except Exception as e:
        print(f"ERROR: Failed to generate chart: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = generate_chart()
    exit(0 if success else 1)
