import matplotlib.pyplot as plt
import numpy as np

COLORS = {'primary': '#3333B2', 'secondary': '#ADADE0', 'light': '#C1C1E8'}

def generate_chart():
    try:
        plt.style.use('seaborn-v0_8')
        fig, ax = plt.subplots(figsize=(10, 6))

        # Duration range (years)
        durations = np.array([1, 3, 5, 7, 10, 15, 20, 30])

        # Price premium for different greenium levels (as % of face value)
        # Formula: ΔP ≈ D × g (simplified)
        greenium_3bp = durations * 0.0003 * 100  # 3 bps
        greenium_5bp = durations * 0.0005 * 100  # 5 bps
        greenium_7bp = durations * 0.0007 * 100  # 7 bps

        ax.plot(durations, greenium_3bp, color=COLORS['light'], linewidth=2.5,
               marker='o', markersize=7, label='3 bps greenium')
        ax.plot(durations, greenium_5bp, color=COLORS['secondary'], linewidth=2.5,
               marker='s', markersize=7, label='5 bps greenium')
        ax.plot(durations, greenium_7bp, color=COLORS['primary'], linewidth=2.5,
               marker='^', markersize=7, label='7 bps greenium')

        ax.set_xlabel('Duration (Years)', fontsize=12, fontweight='bold')
        ax.set_ylabel('Price Premium (% of Face Value)', fontsize=12, fontweight='bold')
        ax.set_title('Green Premium vs Duration\nFor Different Greenium Levels',
                     fontsize=14, fontweight='bold', color=COLORS['primary'])
        ax.legend(fontsize=10, loc='upper left')
        ax.grid(True, alpha=0.3, linestyle='--', color='#7F7F7F')

        ax.set_facecolor('#FAFAFA')
        fig.patch.set_facecolor('white')

        plt.tight_layout()
        plt.savefig('charts/week1/week1_v2_goal3_chart2_duration.pdf', format='pdf',
                    dpi=300, bbox_inches='tight', facecolor='white', edgecolor='none')
        print("SUCCESS: charts/week1/week1_v2_goal3_chart2_duration.pdf")
        plt.close()
        return True
    except Exception as e:
        print(f"ERROR: {e}")
        return False

if __name__ == "__main__":
    exit(0 if generate_chart() else 1)
