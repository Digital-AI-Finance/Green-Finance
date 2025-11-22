import matplotlib.pyplot as plt
import numpy as np

COLORS = {'primary': '#3333B2', 'success': '#2CA02C', 'neutral': '#7F7F7F'}

def generate_chart():
    try:
        plt.style.use('seaborn-v0_8')
        fig, ax = plt.subplots(figsize=(10, 6))

        sectors = ['Energy', 'Buildings', 'Transport', 'Industry', 'Agriculture', 'Water']
        percentages = np.array([38, 24, 18, 12, 5, 3])

        bars = ax.bar(range(len(sectors)), percentages, color=COLORS['success'],
                     edgecolor='black', linewidth=0.7)

        ax.set_xticks(range(len(sectors)))
        ax.set_xticklabels(sectors, fontsize=10)
        ax.set_ylabel('Allocation (%)', fontsize=12, fontweight='bold')
        ax.set_title('Green Finance by Sector\n2024 Allocation (%)',
                     fontsize=14, fontweight='bold', color=COLORS['primary'])
        ax.grid(True, alpha=0.3, axis='y', linestyle='--', color=COLORS['neutral'])

        for bar, pct in zip(bars, percentages):
            ax.text(bar.get_x() + bar.get_width()/2., bar.get_height() + 0.5,
                   f'{pct}%', ha='center', fontsize=9, fontweight='bold')

        ax.set_facecolor('#FAFAFA')
        fig.patch.set_facecolor('white')

        plt.tight_layout()
        plt.savefig('charts/week1/week1_v2_goal2_chart4_sectors.pdf', format='pdf',
                    dpi=300, bbox_inches='tight', facecolor='white', edgecolor='none')
        print("SUCCESS: charts/week1/week1_v2_goal2_chart4_sectors.pdf")
        plt.close()
        return True
    except Exception as e:
        print(f"ERROR: {e}")
        return False

if __name__ == "__main__":
    exit(0 if generate_chart() else 1)
