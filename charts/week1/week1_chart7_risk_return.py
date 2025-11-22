import matplotlib.pyplot as plt
import numpy as np

COLORS = {'primary': '#3333B2', 'success': '#2CA02C', 'neutral': '#7F7F7F', 'secondary': '#ADADE0'}

def generate_chart():
    try:
        plt.style.use('seaborn-v0_8')
        fig, ax = plt.subplots(figsize=(10, 6))

        np.random.seed(42)
        n = 25

        # Green assets cluster
        green_risk = np.random.normal(8.5, 1.5, n)
        green_return = np.random.normal(7.2, 1.2, n)

        # Conventional assets cluster
        conv_risk = np.random.normal(10.2, 1.8, n)
        conv_return = np.random.normal(7.0, 1.3, n)

        ax.scatter(green_risk, green_return, c=COLORS['success'], alpha=0.6, s=80,
                  edgecolors='white', linewidth=0.5, label='Green Assets')
        ax.scatter(conv_risk, conv_return, c=COLORS['neutral'], alpha=0.6, s=80,
                  edgecolors='white', linewidth=0.5, label='Conventional Assets')

        ax.set_xlabel('Risk (Volatility %)', fontsize=12, fontweight='bold', fontfamily='sans-serif')
        ax.set_ylabel('Return (% p.a.)', fontsize=12, fontweight='bold', fontfamily='sans-serif')
        ax.set_title('Risk-Return Analysis\nGreen vs Conventional Assets',
                     fontsize=14, fontweight='bold', fontfamily='sans-serif', color=COLORS['primary'])
        ax.legend(fontsize=10, loc='upper left')
        ax.grid(True, alpha=0.3, linestyle='--', color=COLORS['neutral'])

        ax.set_facecolor('#FAFAFA')
        fig.patch.set_facecolor('white')

        output_path = 'charts/week1/week1_chart7_risk_return.pdf'
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
