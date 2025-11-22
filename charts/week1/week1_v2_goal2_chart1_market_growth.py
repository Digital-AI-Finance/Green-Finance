import matplotlib.pyplot as plt
import numpy as np

COLORS = {
    'primary': '#3333B2', 'secondary': '#ADADE0', 'success': '#2CA02C',
    'warning': '#FF7F0E', 'neutral': '#7F7F7F'
}

def generate_chart():
    """Goal 2: Market growth quantification"""
    try:
        plt.style.use('seaborn-v0_8')
        fig, ax = plt.subplots(figsize=(10, 6))

        # Data: Market size 2015-2024
        years = np.array([2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024])
        market_size = np.array([300, 420, 580, 850, 1150, 1300, 1650, 1450, 1750, 2100])

        # Plot with fill
        ax.plot(years, market_size, color=COLORS['primary'], linewidth=2.5,
                marker='o', markersize=8, label='Total Green Finance')
        ax.fill_between(years, market_size, alpha=0.3, color=COLORS['primary'])

        # Add CAGR annotation
        ax.text(2019.5, 1900, 'CAGR: 24.9%', fontsize=11, fontweight='bold',
                bbox=dict(boxstyle='round', facecolor=COLORS['secondary'], alpha=0.8))

        # Styling
        ax.set_xlabel('Year', fontsize=12, fontweight='bold', fontfamily='sans-serif')
        ax.set_ylabel('Market Size (Billion USD)', fontsize=12, fontweight='bold', fontfamily='sans-serif')
        ax.set_title('Global Green Finance Market\n2015-2024 (USD Billions)',
                     fontsize=14, fontweight='bold', color=COLORS['primary'])
        ax.grid(True, alpha=0.3, linestyle='--', color=COLORS['neutral'])
        ax.legend(fontsize=10)

        # Add value labels on key points
        for year, val in zip([2015, 2020, 2024], [300, 1300, 2100]):
            idx = np.where(years == year)[0][0]
            ax.text(year, val + 80, f'${val}B', ha='center', fontsize=9, fontweight='bold')

        ax.set_facecolor('#FAFAFA')
        fig.patch.set_facecolor('white')

        output_path = 'charts/week1/week1_v2_goal2_chart1_market_growth.pdf'
        plt.tight_layout()
        plt.savefig(output_path, format='pdf', dpi=300, bbox_inches='tight',
                    facecolor='white', edgecolor='none')
        print(f"SUCCESS: {output_path}")
        plt.close()
        return True
    except Exception as e:
        print(f"ERROR: {e}")
        return False

if __name__ == "__main__":
    exit(0 if generate_chart() else 1)
