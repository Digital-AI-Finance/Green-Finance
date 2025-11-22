import matplotlib.pyplot as plt
import numpy as np

COLORS = {'primary': '#3333B2', 'success': '#2CA02C', 'neutral': '#7F7F7F', 'secondary': '#ADADE0'}

def generate_chart():
    try:
        plt.style.use('seaborn-v0_8')
        fig, ax = plt.subplots(figsize=(10, 6))

        np.random.seed(42)
        n = 30

        # Green assets: Lower risk, comparable return
        green_risk = np.random.normal(8.2, 1.3, n)
        green_return = np.random.normal(7.3, 1.1, n)

        # Conventional assets: Higher risk, similar return
        conv_risk = np.random.normal(10.5, 1.7, n)
        conv_return = np.random.normal(7.1, 1.4, n)

        # Scatter plots
        ax.scatter(green_risk, green_return, c=COLORS['success'], alpha=0.6, s=90,
                  edgecolors='white', linewidth=0.5, label='Green Assets', zorder=3)
        ax.scatter(conv_risk, conv_return, c=COLORS['neutral'], alpha=0.6, s=90,
                  edgecolors='white', linewidth=0.5, label='Conventional Assets', zorder=2)

        # Add trend lines
        z_green = np.polyfit(green_risk, green_return, 1)
        p_green = np.poly1d(z_green)
        x_range_green = np.linspace(green_risk.min(), green_risk.max(), 100)
        ax.plot(x_range_green, p_green(x_range_green), color=COLORS['success'],
               linewidth=2, linestyle='--', alpha=0.7, zorder=1)

        z_conv = np.polyfit(conv_risk, conv_return, 1)
        p_conv = np.poly1d(z_conv)
        x_range_conv = np.linspace(conv_risk.min(), conv_risk.max(), 100)
        ax.plot(x_range_conv, p_conv(x_range_conv), color=COLORS['neutral'],
               linewidth=2, linestyle='--', alpha=0.7, zorder=1)

        ax.set_xlabel('Risk (Volatility %)', fontsize=12, fontweight='bold')
        ax.set_ylabel('Return (% p.a.)', fontsize=12, fontweight='bold')
        ax.set_title('Risk-Return Analysis\nGreen vs Conventional Assets',
                     fontsize=14, fontweight='bold', color=COLORS['primary'])
        ax.legend(fontsize=10, loc='upper left')
        ax.grid(True, alpha=0.3, linestyle='--', color='#7F7F7F')

        ax.set_facecolor('#FAFAFA')
        fig.patch.set_facecolor('white')

        plt.tight_layout()
        plt.savefig('charts/week1/week1_v2_goal3_chart3_risk_return.pdf', format='pdf',
                    dpi=300, bbox_inches='tight', facecolor='white', edgecolor='none')
        print("SUCCESS: charts/week1/week1_v2_goal3_chart3_risk_return.pdf")
        plt.close()
        return True
    except Exception as e:
        print(f"ERROR: {e}")
        return False

if __name__ == "__main__":
    exit(0 if generate_chart() else 1)
