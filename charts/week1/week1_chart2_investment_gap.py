import matplotlib.pyplot as plt
import numpy as np

COLORS = {
    'primary': '#3333B2', 'secondary': '#ADADE0', 'light': '#C1C1E8',
    'lighter': '#CCCCEB', 'lightest': '#D6D6EF', 'success': '#2CA02C',
    'warning': '#FF7F0E', 'danger': '#D62728', 'neutral': '#7F7F7F'
}

def generate_chart():
    try:
        plt.style.use('seaborn-v0_8')
        fig, ax = plt.subplots(figsize=(10, 6))

        categories = ['Renewable\nEnergy', 'Green\nBuildings', 'Sustainable\nTransport', 'Water &\nWaste', 'Agriculture']
        needed = np.array([850, 620, 480, 350, 290])
        current = np.array([520, 280, 210, 150, 90])

        x = np.arange(len(categories))
        width = 0.35

        bars1 = ax.bar(x - width/2, needed, width, label='Investment Needed',
                       color=COLORS['warning'], edgecolor='black', linewidth=0.7)
        bars2 = ax.bar(x + width/2, current, width, label='Current Investment',
                       color=COLORS['success'], edgecolor='black', linewidth=0.7)

        ax.set_xlabel('Sector', fontsize=12, fontweight='bold', fontfamily='sans-serif')
        ax.set_ylabel('Annual Investment (Billion USD)', fontsize=12, fontweight='bold', fontfamily='sans-serif')
        ax.set_title('Green Investment Gap by Sector\n(Billions USD Annual)',
                     fontsize=14, fontweight='bold', fontfamily='sans-serif', color=COLORS['primary'])
        ax.set_xticks(x)
        ax.set_xticklabels(categories, fontsize=9)
        ax.legend(fontsize=10)
        ax.grid(True, alpha=0.3, axis='y', linestyle='--', color=COLORS['neutral'])

        ax.set_facecolor('#FAFAFA')
        fig.patch.set_facecolor('white')

        output_path = 'charts/week1/week1_chart2_investment_gap.pdf'
        plt.tight_layout()
        plt.savefig(output_path, format='pdf', dpi=300, bbox_inches='tight',
                    facecolor='white', edgecolor='none')
        print(f"SUCCESS: Generated {output_path}")
        plt.close()
        return True
    except Exception as e:
        print(f"ERROR: {e}")
        return False

if __name__ == "__main__":
    exit(0 if generate_chart() else 1)
