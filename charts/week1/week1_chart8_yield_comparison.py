import matplotlib.pyplot as plt
import numpy as np

COLORS = {'primary': '#3333B2', 'success': '#2CA02C', 'neutral': '#7F7F7F'}

def generate_chart():
    try:
        plt.style.use('seaborn-v0_8')
        fig, ax = plt.subplots(figsize=(10, 6))

        years = np.array([2019, 2020, 2021, 2022, 2023, 2024])
        green_yields = np.array([2.8, 1.9, 2.1, 3.5, 3.9, 3.6])
        conv_yields = np.array([3.0, 2.1, 2.3, 3.7, 4.1, 3.8])

        ax.plot(years, green_yields, color=COLORS['success'], linewidth=2.5,
               marker='o', markersize=8, label='Green Bonds')
        ax.plot(years, conv_yields, color=COLORS['neutral'], linewidth=2.5,
               marker='s', markersize=8, label='Conventional Bonds')

        ax.set_xlabel('Year', fontsize=12, fontweight='bold', fontfamily='sans-serif')
        ax.set_ylabel('Yield (%)', fontsize=12, fontweight='bold', fontfamily='sans-serif')
        ax.set_title('Investment-Grade Bond Yields\nGreen vs Conventional (2019-2024)',
                     fontsize=14, fontweight='bold', fontfamily='sans-serif', color=COLORS['primary'])
        ax.legend(fontsize=10)
        ax.grid(True, alpha=0.3, linestyle='--', color=COLORS['neutral'])

        ax.set_facecolor('#FAFAFA')
        fig.patch.set_facecolor('white')

        output_path = 'charts/week1/week1_chart8_yield_comparison.pdf'
        plt.tight_layout()
        plt.savefig(output_path, format='pdf', dpi=300, bbox_inches='tight', facecolor='white', edgecolor='none')
        print(f"SUCCESS: Generated {output_path}")
        plt.close()
        return True
    except Exception as e:
        print(f"ERROR: {e}")
        return False

if __name__ == "__main__":
    exit(0 if generate_chart() else 1)
