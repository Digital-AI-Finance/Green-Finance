import matplotlib.pyplot as plt
import numpy as np

COLORS = {'primary': '#3333B2', 'success': '#2CA02C', 'neutral': '#7F7F7F'}

def generate_chart():
    try:
        plt.style.use('seaborn-v0_8')
        fig, ax = plt.subplots(figsize=(10, 6))

        instruments = ['Green\nBonds', 'Sustainability-\nLinked Bonds', 'Green\nLoans', 'Green\nEquity', 'Carbon\nMarkets']
        values = np.array([1600, 500, 300, 400, 200])

        bars = ax.bar(range(len(instruments)), values, color=COLORS['success'],
                     edgecolor='black', linewidth=0.7)

        ax.set_xticks(range(len(instruments)))
        ax.set_xticklabels(instruments, fontsize=9)
        ax.set_ylabel('Market Size (Billion USD)', fontsize=12, fontweight='bold')
        ax.set_title('Green Finance by Instrument\n2024 Market Size',
                     fontsize=14, fontweight='bold', color=COLORS['primary'])
        ax.grid(True, alpha=0.3, axis='y', linestyle='--', color=COLORS['neutral'])

        for bar, val in zip(bars, values):
            ax.text(bar.get_x() + bar.get_width()/2., bar.get_height() + 30,
                   f'${val}B', ha='center', fontsize=9, fontweight='bold')

        ax.set_facecolor('#FAFAFA')
        fig.patch.set_facecolor('white')

        plt.tight_layout()
        plt.savefig('charts/week1/week1_v2_goal2_chart3_instruments.pdf', format='pdf',
                    dpi=300, bbox_inches='tight', facecolor='white', edgecolor='none')
        print("SUCCESS: charts/week1/week1_v2_goal2_chart3_instruments.pdf")
        plt.close()
        return True
    except Exception as e:
        print(f"ERROR: {e}")
        return False

if __name__ == "__main__":
    exit(0 if generate_chart() else 1)
