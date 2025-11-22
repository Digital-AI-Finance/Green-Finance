import matplotlib.pyplot as plt
import numpy as np

COLORS = {'primary': '#3333B2', 'success': '#2CA02C', 'neutral': '#7F7F7F'}

def generate_chart():
    try:
        plt.style.use('seaborn-v0_8')
        fig, ax = plt.subplots(figsize=(10, 6))

        categories = ['Energy', 'Buildings', 'Transport', 'Industry', 'Agriculture', 'Water']
        values = np.array([38, 24, 18, 12, 5, 3])

        bars = ax.bar(range(len(categories)), values, color=COLORS['success'], edgecolor='black', linewidth=0.7)
        ax.set_xticks(range(len(categories)))
        ax.set_xticklabels(categories, fontsize=10)
        ax.set_ylabel('Allocation (%)', fontsize=12, fontweight='bold', fontfamily='sans-serif')
        ax.set_title('Green Finance by Economic Sector\n2024 Allocation',
                     fontsize=14, fontweight='bold', fontfamily='sans-serif', color=COLORS['primary'])
        ax.grid(True, alpha=0.3, axis='y', linestyle='--', color=COLORS['neutral'])

        for bar, val in zip(bars, values):
            height = bar.get_height()
            ax.text(bar.get_x() + bar.get_width()/2., height + 0.5,
                   f'{val}%', ha='center', va='bottom', fontsize=9, fontweight='bold')

        ax.set_facecolor('#FAFAFA')
        fig.patch.set_facecolor('white')

        output_path = 'charts/week1/week1_chart9_sector_allocation.pdf'
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
