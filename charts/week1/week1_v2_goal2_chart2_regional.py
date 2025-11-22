import matplotlib.pyplot as plt
import numpy as np

COLORS = {'primary': '#3333B2', 'neutral': '#7F7F7F'}

def generate_chart():
    try:
        plt.style.use('seaborn-v0_8')
        fig, ax = plt.subplots(figsize=(10, 6))

        # CORRECTED: Based on ICE/LSEG 2024 data - Europe 52%, APAC 27%, Americas 13%, Other 8%
        regions = ['Europe\n(EMEA)', 'Asia-\nPacific', 'Americas', 'Middle East,\nAfrica,\nOther']
        issuance = np.array([1508, 783, 377, 232])  # Based on $2.9T total market
        percentages = (issuance / issuance.sum() * 100).round(1)  # Should be: 52, 27, 13, 8

        bars = ax.bar(range(len(regions)), issuance, color=COLORS['primary'],
                     edgecolor='black', linewidth=0.7)

        ax.set_xticks(range(len(regions)))
        ax.set_xticklabels(regions, fontsize=9)
        ax.set_ylabel('Annual Issuance (Billion USD)', fontsize=12, fontweight='bold')
        ax.set_title('Green Finance by Region\n2024 Issuance (USD Billions)',
                     fontsize=14, fontweight='bold', color=COLORS['primary'])
        ax.grid(True, alpha=0.3, axis='y', linestyle='--', color=COLORS['neutral'])

        # Add labels with percentages
        for bar, val, pct in zip(bars, issuance, percentages):
            height = bar.get_height()
            ax.text(bar.get_x() + bar.get_width()/2., height + 15,
                   f'${val}B\n({pct}%)', ha='center', va='bottom', fontsize=8, fontweight='bold')

        ax.set_facecolor('#FAFAFA')
        fig.patch.set_facecolor('white')

        plt.tight_layout()
        plt.savefig('charts/week1/week1_v2_goal2_chart2_regional.pdf', format='pdf',
                    dpi=300, bbox_inches='tight', facecolor='white', edgecolor='none')
        print("SUCCESS: charts/week1/week1_v2_goal2_chart2_regional.pdf")
        plt.close()
        return True
    except Exception as e:
        print(f"ERROR: {e}")
        return False

if __name__ == "__main__":
    exit(0 if generate_chart() else 1)
